/**
 * Tests para la lógica pura de post-touch.ts
 *
 * La función setUpdatedField es la única lógica pura exportada.
 * Los I/O (readFileSync, writeFileSync) no se testean aquí.
 */

import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, it, expect } from 'vitest';
import { setUpdatedField, translationsNeedingUpdate } from './post-touch';

// Frontmatter base de ejemplo con publishDate
const baseSvx = `---
title: "Mi Post"
description: "Una descripción de ejemplo para el post."
author: "Hector Luis Lorenzo"
publishDate: "2026-01-15"
excerpt: "Excerpt de ejemplo con más de diez caracteres aquí."
coverImage: "https://cdn.malagaeventgear.com/blog-media/placeholder.webp"
categories: []
tags: []
draft: true
---

Contenido del post aquí.
`;

describe('setUpdatedField', () => {
	it('inserts updated after publishDate when not present', () => {
		const result = setUpdatedField(baseSvx, '2026-06-07');
		expect(result).toContain('updatedDate: "2026-06-07"');
		// Should appear right after publishDate line
		const lines = result.split('\n');
		const pubIdx = lines.findIndex((l) => l.startsWith('publishDate:'));
		const updatedIdx = lines.findIndex((l) => l.startsWith('updatedDate:'));
		expect(pubIdx).toBeGreaterThan(-1);
		expect(updatedIdx).toBe(pubIdx + 1);
	});

	it('replaces an existing updated field', () => {
		const withUpdated = baseSvx.replace(
			'draft: true',
			'updatedDate: "2026-01-20"\ndraft: true'
		);
		const result = setUpdatedField(withUpdated, '2026-06-07');
		expect(result).toContain('updatedDate: "2026-06-07"');
		// Should not contain the old date
		expect(result).not.toContain('updatedDate: "2026-01-20"');
		// Should only appear once
		const occurrences = (result.match(/^updatedDate:/gm) ?? []).length;
		expect(occurrences).toBe(1);
	});

	it('preserves the body content unchanged', () => {
		const result = setUpdatedField(baseSvx, '2026-06-07');
		expect(result).toContain('Contenido del post aquí.');
	});

	it('does not duplicate content when called twice', () => {
		const first = setUpdatedField(baseSvx, '2026-06-07');
		const second = setUpdatedField(first, '2026-06-08');
		// Only one updated line
		const occurrences = (second.match(/^updatedDate:/gm) ?? []).length;
		expect(occurrences).toBe(1);
		expect(second).toContain('updatedDate: "2026-06-08"');
		expect(second).not.toContain('updatedDate: "2026-06-07"');
	});

	it('inserts updated before draft when no publishDate present', () => {
		const noPublishDate = `---
title: "Post sin publishDate"
description: "Descripción de ejemplo suficientemente larga aquí."
author: "Autor"
draft: false
---

Cuerpo.
`;
		const result = setUpdatedField(noPublishDate, '2026-06-07');
		expect(result).toContain('updatedDate: "2026-06-07"');
		const lines = result.split('\n');
		const updatedIdx = lines.findIndex((l) => l.startsWith('updatedDate:'));
		const draftIdx = lines.findIndex((l) => l.startsWith('draft:'));
		expect(updatedIdx).toBeLessThan(draftIdx);
	});

	it('throws when frontmatter is missing', () => {
		expect(() => setUpdatedField('Sin frontmatter', '2026-06-07')).toThrow();
	});

	it('throws when frontmatter closing --- is missing', () => {
		const malformed = `---
title: "Malformado"
`;
		expect(() => setUpdatedField(malformed, '2026-06-07')).toThrow();
	});
});

describe('translationsNeedingUpdate (Fase 4)', () => {
	const dir = mkdtempSync(join(tmpdir(), 'meg-touch-'));
	afterAll(() => rmSync(dir, { recursive: true, force: true }));
	const translation = (sourceUpdated: string) =>
		`---\ntitle: "T"\ndescription: "Long enough text."\nexcerpt: "Long enough text."\npublishDate: "2026-02-01"\nsourceUpdated: "${sourceUpdated}"\n---\nBody.\n`;
	for (const [locale, date] of [['de', '2026-01-15'], ['fr', '2026-09-24'], ['zh-hans', '2026-03-01']] as const) {
		mkdirSync(join(dir, locale), { recursive: true });
		writeFileSync(join(dir, locale, 'mi-post.svx'), translation(date));
	}
	mkdirSync(join(dir, 'it'), { recursive: true }); // a locale without this post

	it('lists the locales whose translation is older than the new English date, sorted', () => {
		expect(translationsNeedingUpdate('mi-post', '2026-09-24', dir)).toEqual(['de', 'zh-hans']);
	});

	it('is empty for a post without translations', () => {
		expect(translationsNeedingUpdate('otro-post', '2026-09-24', dir)).toEqual([]);
	});
});
