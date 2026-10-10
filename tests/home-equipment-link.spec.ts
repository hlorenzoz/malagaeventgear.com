import { test, expect, type Page } from '@playwright/test';
import en from '../src/lib/i18n/messages/en';
import fr from '../src/lib/i18n/messages/fr';
import it from '../src/lib/i18n/messages/it';
import de from '../src/lib/i18n/messages/de';
import nl from '../src/lib/i18n/messages/nl';
import ptPt from '../src/lib/i18n/messages/pt-pt';
import ptBr from '../src/lib/i18n/messages/pt-br';
import sv from '../src/lib/i18n/messages/sv';
import da from '../src/lib/i18n/messages/da';
import nb from '../src/lib/i18n/messages/nb';
import zhHans from '../src/lib/i18n/messages/zh-hans';
import zhTw from '../src/lib/i18n/messages/zh-tw';
import zhHk from '../src/lib/i18n/messages/zh-hk';

// Two round arrow links hold only an icon (task #T0103): the one in the "Available Categories"
// block of the home, to the equipment page, and its twin on the equipment page, to the packages.
// A link with no text has no accessible name and no anchor text. Each now carries its label as
// real text (visually hidden) and as `title`, in the language of the page.
const HOME_LINK = '[data-testid="categories-equipment-link"]';
const EQUIPMENT_LINK = '[data-testid="equipment-packages-link"]';

// The home of each locale and its dictionary. The expected names are read from the
// dictionaries, so rewording a label never breaks this test.
const HOMES = [
	{ path: '/', t: en },
	{ path: '/fr/', t: fr },
	{ path: '/it/', t: it },
	{ path: '/de/', t: de },
	{ path: '/nl/', t: nl },
	{ path: '/pt-pt/', t: ptPt },
	{ path: '/pt-br/', t: ptBr },
	{ path: '/sv/', t: sv },
	{ path: '/da/', t: da },
	{ path: '/nb/', t: nb },
	{ path: '/zh-hans/', t: zhHans },
	{ path: '/zh-tw/', t: zhTw },
	{ path: '/zh-hk/', t: zhHk }
];

/**
 * Every link of the main content that is rendered at this viewport has an accessible name, as
 * the browser computes it. A link inside a `display: none` block (the desktop or the mobile
 * variant of the same button) is not exposed to anyone at this width, so it is skipped here and
 * checked at the other viewport.
 */
async function expectNamedLinks(page: Page) {
	const links = page.locator('main a[href]');
	const count = await links.count();
	let checked = 0;
	for (let i = 0; i < count; i++) {
		const link = links.nth(i);
		if (!(await link.isVisible())) continue;
		checked++;
		await expect(link, `link to ${await link.getAttribute('href')}`).toHaveAccessibleName(/\S/);
	}
	expect(checked).toBeGreaterThan(0);
}

test.describe('Icon only links to the equipment and packages pages', () => {
	test.use({ viewport: { width: 1280, height: 900 } });

	for (const { path, t } of HOMES) {
		test(`home link to the equipment page is named on ${path}`, async ({ page }) => {
			await page.goto(path);
			const link = page.locator(HOME_LINK);
			await expect(link).toHaveCount(1);
			await expect(link).toHaveAccessibleName(t.categories.viewEquipment);
			// Anchor text: the label is text inside the link, and `title` is the fallback Google reads.
			await expect(link).toHaveText(t.categories.viewEquipment);
			await expect(link).toHaveAttribute('title', t.categories.viewEquipment);
		});
	}

	test('equipment page link to the packages is named', async ({ page }) => {
		await page.goto('/equipment/');
		const link = page.locator(EQUIPMENT_LINK);
		await expect(link).toHaveCount(1);
		await expect(link).toHaveAccessibleName(en.categories.bookEquipment);
		await expect(link).toHaveText(en.categories.bookEquipment);
		await expect(link).toHaveAttribute('title', en.categories.bookEquipment);
	});

	test('no link in the main content of the home is left without an accessible name', async ({
		page
	}) => {
		await page.goto('/');
		await expectNamedLinks(page);
	});

	test('no link in the main content of the equipment page is left without an accessible name', async ({
		page
	}) => {
		await page.goto('/equipment/');
		await expectNamedLinks(page);
	});

	test.describe('at a phone width', () => {
		test.use({ viewport: { width: 390, height: 844 } });

		for (const path of ['/', '/equipment/']) {
			test(`no link in the main content of ${path} is left without an accessible name`, async ({
				page
			}) => {
				await page.goto(path);
				await expectNamedLinks(page);
			});
		}
	});
});
