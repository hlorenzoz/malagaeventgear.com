import { test, expect, type Page } from '@playwright/test';

// El atributo `sizes` le dice al navegador el ancho del slot ANTES del layout, y con eso elige
// la variante del srcset. Si sobrestima, baja una imagen mas grande de la necesaria (lo que
// PageSpeed marca en "Improve image delivery"). Si subestima, la imagen se ve borrosa. Este
// test resuelve el `sizes` de cada imagen con el propio navegador (matchMedia + un div con
// ese ancho) y lo compara con el ancho renderizado real, en varios viewports.
// Un post con galeria (varias imagenes en el cuerpo) y uno con una sola imagen suelta.
const GALLERY_POST = '/blog/news-malaga-event-gear-supplies-display-screens-for-exhibitor-stands-at-ecoc-2026-in-malaga/';
const SINGLE_IMAGE_POST = '/blog/audio-system-calibration/';
const VIEWPORTS = [360, 412, 768, 900, 1024, 1100, 1280, 1440];

// Margen aceptado: el slot puede quedar hasta 15% (u 8px) por encima del ancho real, nunca
// por debajo de 2px (subestimar produce imagenes borrosas).
const MAX_OVER = 1.15;
const OVER_SLACK_PX = 8;
const UNDER_SLACK_PX = 2;

type Measured = { label: string; rendered: number; slot: number };

async function measure(page: Page, selector: string, label: string): Promise<Measured[]> {
	return page.$$eval(
		selector,
		(imgs, label) =>
			imgs
				.filter((img) => img.getBoundingClientRect().width > 0)
				.map((img) => {
					const sizes = img.getAttribute('sizes') ?? '';
					const entries = sizes.split(/,(?![^(]*\))/).map((s) => s.trim());
					let length = '100vw';
					for (const entry of entries) {
						const m = entry.match(/^(\(.*\))\s+(.+)$/);
						if (!m) {
							length = entry;
							break;
						}
						if (window.matchMedia(m[1]).matches) {
							length = m[2];
							break;
						}
					}
					const probe = document.createElement('div');
					probe.style.cssText = `position:absolute;visibility:hidden;width:${length}`;
					document.body.appendChild(probe);
					const slot = probe.getBoundingClientRect().width;
					probe.remove();
					return { label, rendered: img.getBoundingClientRect().width, slot };
				}),
		label
	);
}

function check(items: Measured[], viewport: number) {
	for (const { label, rendered, slot } of items) {
		const ctx = `${label} @${viewport}px: sizes slot ${slot.toFixed(0)} vs rendered ${rendered.toFixed(0)}`;
		expect(slot, `${ctx} (sizes underestimates, image would be blurry)`).toBeGreaterThanOrEqual(rendered - UNDER_SLACK_PX);
		expect(slot, `${ctx} (sizes overestimates, downloads a bigger variant than needed)`).toBeLessThanOrEqual(
			rendered * MAX_OVER + OVER_SLACK_PX
		);
	}
}

test.describe('Blog post image `sizes` match the rendered width', () => {
	for (const width of VIEWPORTS) {
		test(`cover, gallery and package thumbs @${width}px`, async ({ page }) => {
			await page.setViewportSize({ width, height: 900 });
			await page.goto(GALLERY_POST);
			await page.waitForLoadState('load');

			const items = [
				...(await measure(page, 'article img[fetchpriority="high"]', 'cover')),
				...(await measure(page, '.img-gallery img', 'gallery')),
				...(await measure(page, 'img.packages-rail-img', 'rail thumb')),
				...(await measure(page, 'img.post-cta-img', 'cta thumb'))
			];
			expect(items.some((i) => i.label === 'gallery')).toBe(true);
			check(items, width);
		});

		test(`standalone body image @${width}px`, async ({ page }) => {
			await page.setViewportSize({ width, height: 900 });
			await page.goto(SINGLE_IMAGE_POST);
			await page.waitForLoadState('load');

			const items = await measure(page, '.prose img[srcset]:not(.post-cta-img):not(.packages-rail-img)', 'standalone');
			expect(items.length).toBeGreaterThan(0);
			check(items, width);
		});
	}

	test('package thumbs offer a small variant in srcset', async ({ page }) => {
		await page.goto(GALLERY_POST);
		for (const selector of ['img.packages-rail-img', 'img.post-cta-img']) {
			const srcset = await page.locator(selector).first().getAttribute('srcset');
			expect(srcset, `${selector} srcset`).toMatch(/ 96w/);
			expect(srcset, `${selector} srcset`).toMatch(/ 160w/);
		}
	});
});
