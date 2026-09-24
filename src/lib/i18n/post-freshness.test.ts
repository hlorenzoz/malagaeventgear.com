import { describe, expect, it } from 'vitest';
import { auditTranslations } from '$lib/data/translation-audit';
import { englishGlob, translationGlob } from '$lib/data/blog-files.testutil';
import { CONTENT_MAPS } from './content-map/all';

/**
 * Guard (Fase 4): every translated post (`src/content/blog/<locale>/<en-slug>.svx`) is valid,
 * has its English post and its content map entry, and a PUBLISHED translation is never older
 * than its English post (CLAUDE.md, "Reglas mandatorias de idioma", rule 2: an English edit
 * reaches the other 12 languages in the same change). The fix is to update the translation
 * and its `sourceUpdated`, never to widen an allowlist here.
 */
describe('translated posts', () => {
	it('are valid, mapped and not older than their English post', () => {
		expect(auditTranslations(englishGlob, translationGlob, CONTENT_MAPS)).toEqual([]);
	});

	it('reads the translation folders only, never an English root post', () => {
		for (const path of Object.keys(translationGlob)) expect(path).toMatch(/\/content\/blog\/[^/]+\/[^/]+\.svx$/);
		expect(Object.keys(englishGlob).length).toBeGreaterThan(0);
	});
});
