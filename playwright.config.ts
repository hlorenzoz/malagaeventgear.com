import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	// The prod-only asset-caching spec needs a real `vite build` output (hashed asset
	// URLs, immutable Cache-Control headers), which this dev-server config cannot produce.
	// See playwright.prod.config.ts / tests/asset-caching.prod.spec.ts.
	testIgnore: /\.prod\.spec\.ts$/,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'line',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: 'bun run dev',
		port: 5173,
		reuseExistingServer: !process.env.CI
	}
});
