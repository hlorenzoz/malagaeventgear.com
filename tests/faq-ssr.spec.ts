import { test, expect } from '@playwright/test';

/**
 * FAQPage markup must describe content that is on the page. Accordions used to render an answer
 * only after a click (`{#if isOpen}`), so the served HTML had the questions and the JSON-LD but
 * not the answers, and Google never clicks. Every answer is now in the HTML, hidden until opened.
 */

const visibleText = (html: string) =>
	html
		.split('<body')[1]
		.replace(/<(script|style)[\s\S]*?<\/\1>/g, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ');

const CASES: [path: string, answerFragment: string][] = [
	['/', 'our services extend well beyond the city'],
	['/faq/', 'We operate under a delivery only model'],
	['/contact/', 'You can reach us by phone'],
	['/packages/', 'the listed prices do not include VAT']
];

for (const [path, fragment] of CASES) {
	test(`${path} serves its FAQ answers in the HTML`, async ({ request }) => {
		const html = await (await request.get(path)).text();
		expect(visibleText(html)).toContain(fragment);
	});
}

test('an answer stays hidden until its question is opened', async ({ page }) => {
	await page.goto('/faq/');
	await page.waitForLoadState('networkidle');
	const answer = page.getByText('We operate under a delivery only model');
	await expect(answer).toBeHidden();
	await page.getByRole('button', { name: /self pickup option/ }).click();
	await expect(answer).toBeVisible();
});
