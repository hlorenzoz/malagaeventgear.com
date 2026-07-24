#!/usr/bin/env bun
/**
 * post-new.ts — Scaffold a new mdsvex blog post
 *
 * Usage:
 *   bun scripts/post-new.ts
 *   bun scripts/post-new.ts --title "Mi Nuevo Post" --category "Events" --author "Hector Luis Lorenzo"
 *
 * Prompts interactively for any arg not provided via flag.
 * Emits src/content/blog/<slug>.svx with draft: true frontmatter.
 *
 * Frontmatter produced is validated against BlogPostSchema (src/lib/types/blog.ts)
 * before writing to disk — fails loudly if validation fails.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { slugify } from '../src/lib/utils/slugify';
import { BlogPostSchema } from '../src/lib/types/blog';

// Vocabulario controlado de categorias en uso (ver AGENTS.md "Blog Content Authoring").
// El agente elige de esta lista; crear una nueva es una decision de taxonomia deliberada.
const CONTROLLED_CATEGORIES = [
	'Events',
	'Audio Visual Rental',
	'Weddings',
	'News',
	'Corporate & Enterprise',
	'Event Planning',
	'Gadgets'
];

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function getArg(flag: string): string | undefined {
	const idx = process.argv.indexOf(flag);
	if (idx !== -1 && process.argv[idx + 1]) {
		return process.argv[idx + 1];
	}
	return undefined;
}

// ---------------------------------------------------------------------------
// Interactive prompt helper (Bun built-in readline alternative)
// ---------------------------------------------------------------------------

async function prompt(question: string): Promise<string> {
	process.stdout.write(question);
	for await (const line of console) {
		return line.trim();
	}
	return '';
}

// Bun's console async iterator may not be available in all versions — fallback
async function ask(question: string): Promise<string> {
	return new Promise((resolve) => {
		process.stdout.write(question);
		let data = '';
		const handler = (chunk: Buffer) => {
			data += chunk.toString();
			const newline = data.indexOf('\n');
			if (newline !== -1) {
				process.stdin.removeListener('data', handler);
				process.stdin.pause();
				resolve(data.slice(0, newline).trim());
			}
		};
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', handler);
	});
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

function todayISO(): string {
	return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

// ---------------------------------------------------------------------------
// Frontmatter builder
// ---------------------------------------------------------------------------

function buildFrontmatter(fields: {
	title: string;
	description: string;
	author: string;
	publishDate: string;
	excerpt: string;
	coverImage: string;
	categories: string[];
	tags: string[];
	draft: boolean;
	keyword: string;
	siloRole: string;
	targetPage: string;
}): string {
	const lines: string[] = ['---'];

	lines.push(`title: "${fields.title.replace(/"/g, '\\"')}"`);
	lines.push(`description: "${fields.description.replace(/"/g, '\\"')}"`);
	lines.push(`author: "${fields.author.replace(/"/g, '\\"')}"`);
	lines.push(`publishDate: "${fields.publishDate}"`);
	lines.push(`excerpt: "${fields.excerpt.replace(/"/g, '\\"')}"`);
	lines.push(`coverImage: "${fields.coverImage}"`);

	if (fields.categories.length > 0) {
		lines.push('categories:');
		for (const cat of fields.categories) {
			lines.push(`  - "${cat}"`);
		}
	} else {
		lines.push('categories: []');
	}

	if (fields.tags.length > 0) {
		lines.push('tags:');
		for (const tag of fields.tags) {
			lines.push(`  - "${tag}"`);
		}
	} else {
		lines.push('tags: []');
	}

	lines.push(`draft: ${fields.draft}`);

	// Reverse silo metadata (ver AGENTS.md "Reverse Silo del Blog").
	lines.push(`keyword: "${fields.keyword.replace(/"/g, '\\"')}"`);
	lines.push(`siloRole: ${fields.siloRole}`);
	lines.push(`targetPage: "${fields.targetPage}"`);

	lines.push('---');

	return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
	console.log('\n[post-new] Scaffold de nuevo post de blog (.svx)\n');

	// Gather inputs — flags take priority, else prompt interactively
	const titleArg = getArg('--title');
	const categoryArg = getArg('--category');
	const authorArg = getArg('--author');

	const title = titleArg ?? (await ask('Título del post: '));
	if (!title) {
		console.error('[post-new] ERROR: El título es requerido.');
		process.exit(1);
	}

	const categoryRaw =
		categoryArg ??
		(await ask(
			`Categorías (una o varias, separadas por coma)\n  Vocabulario: ${CONTROLLED_CATEGORIES.join(', ')}\n  > `
		));

	// `??` no se puede mezclar con `||` sin parentesis (SyntaxError). El default aplica
	// tanto si el flag falta como si el prompt vuelve vacio.
	const author =
		authorArg ??
		((await ask('Autor (nombre completo, ej: Hector Luis Lorenzo) [Enter para "Hector Luis Lorenzo"]: ')) ||
			'Hector Luis Lorenzo');

	// Derive slug from title
	const slug = slugify(title);
	if (!slug) {
		console.error('[post-new] ERROR: No se pudo derivar un slug válido del título.');
		process.exit(1);
	}

	const publishDate = todayISO();

	// Multiples categorias separadas por coma. Avisa (no bloquea) ante una fuera del vocabulario.
	const categories: string[] = categoryRaw
		? categoryRaw
				.split(',')
				.map((c) => c.trim())
				.filter(Boolean)
		: [];

	for (const c of categories) {
		if (!CONTROLLED_CATEGORIES.includes(c)) {
			console.warn(
				`[post-new] AVISO: "${c}" no esta en el vocabulario controlado. ` +
					`Si es intencional, agregala a CONTROLLED_CATEGORIES y a AGENTS.md.`
			);
		}
	}

	const fields = {
		title,
		description: 'TODO: escribir una descripción de al menos 10 caracteres para SEO.',
		author,
		publishDate,
		excerpt:
			'TODO: escribir un excerpt de al menos 10 caracteres que aparecerá en la lista del blog.',
		coverImage: `https://cdn.malagaeventgear.com/blog-media/placeholder.webp`,
		categories,
		tags: [] as string[],
		draft: true,
		// Reverse silo: por defecto standalone. El autor/agente define pillar|supporting|both
		// y el targetPage segun la estructura. keyword arranca como el slug de-hyphenado.
		keyword: slug.replace(/-/g, ' '),
		siloRole: 'standalone',
		targetPage: '',
	};

	// Validate frontmatter against BlogPostSchema BEFORE writing
	const parseResult = BlogPostSchema.safeParse({
		...fields,
		slug,
	});

	if (!parseResult.success) {
		console.error('[post-new] ERROR: El frontmatter generado no es válido:');
		console.error(parseResult.error.format());
		process.exit(1);
	}

	// Build .svx content
	const frontmatter = buildFrontmatter(fields);
	const body = `\n<!-- Escribí el contenido del post aquí. El layout renderiza el título como <h1>, NO lo repitas. -->\n\nEscribí aquí la introducción del post.\n`;
	const svxContent = `${frontmatter}\n${body}`;

	// Write file
	const outputDir = join(process.cwd(), 'src', 'content', 'blog');
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	const outputPath = join(outputDir, `${slug}.svx`);

	if (existsSync(outputPath)) {
		console.error(`[post-new] ERROR: Ya existe un post con ese slug: ${outputPath}`);
		console.error('[post-new] Cambiá el título o eliminá el archivo existente.');
		process.exit(1);
	}

	writeFileSync(outputPath, svxContent, 'utf8');

	console.log(`\n[post-new] Post creado: ${outputPath}`);
	console.log(`  slug:        ${slug}`);
	console.log(`  author:      ${author}`);
	console.log(`  publishDate: ${publishDate}`);
	console.log(`  draft:       true`);
	console.log('\n  Próximos pasos:');
	console.log('  1. Editá description, excerpt y coverImage en el frontmatter.');
	console.log('  2. Definí la metadata de silo: keyword, siloRole (pillar|supporting|both)');
	console.log('     y targetPage. Dejalo en standalone solo si NO pertenece a ningún silo.');
	console.log('  3. Escribí el contenido del post.');
	console.log('  4. Cuando esté listo, cambiá "draft: true" a "draft: false".');
	console.log('  5. El mapa del sitio se ve en /map (deriva en vivo); la suite valida la');
	console.log('     metadata de silo (src/lib/data/site-map.test.ts).');
	console.log(
		`  6. Para actualizar la fecha de modificación: bun scripts/post-touch.ts ${slug}\n`
	);
}

main().catch((err) => {
	console.error('[post-new] Error fatal:', err);
	process.exit(1);
});
