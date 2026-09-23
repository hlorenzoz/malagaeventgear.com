import { describe, it, expect } from 'vitest';
import { siteConfig } from './site';

/**
 * Guard: siteConfig.logoUrl alimenta `logo` e `image` del nodo #organization (JSON-LD). Llego
 * a apuntar a /logo.png sin que el archivo existiera, un 404 silencioso en el logo que Google
 * usa para el Knowledge Graph. Este test exige que el archivo exista en static/ y que cumpla
 * el minimo de Google para el logo de Organization: 112x112 px.
 *
 * Se lee con import.meta.glob (`?inline`, base64), nunca con node:fs, igual que el resto de
 * los guards de src/lib/data/.
 */
const staticPngs = import.meta.glob('../../../static/*.png', {
	eager: true,
	query: '?inline',
	import: 'default'
}) as Record<string, string>;

// Solo APIs web (atob, DataView): el proyecto no carga los tipos de Node a proposito.
function pngSize(dataUrl: string): { width: number; height: number } {
	const binary = atob(dataUrl.split(',')[1]);
	const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
	// Firma PNG (8 bytes) + longitud y tipo del chunk IHDR (8 bytes), luego ancho y alto.
	expect(String.fromCharCode(...bytes.subarray(12, 16))).toBe('IHDR');
	const view = new DataView(bytes.buffer);
	return { width: view.getUint32(16), height: view.getUint32(20) };
}

describe('siteConfig.logoUrl', () => {
	const path = new URL(siteConfig.logoUrl).pathname;
	const key = `../../../static${path}`;

	it('points to a PNG that exists in static/', () => {
		expect(path).toMatch(/\.png$/);
		expect(Object.keys(staticPngs), `${path} is missing from static/`).toContain(key);
	});

	it('meets the Google Organization logo minimum of 112x112 px', () => {
		const { width, height } = pngSize(staticPngs[key]);
		expect(width).toBeGreaterThanOrEqual(112);
		expect(height).toBeGreaterThanOrEqual(112);
	});
});
