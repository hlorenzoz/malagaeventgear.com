import { error } from '@sveltejs/kit';
import { getPackageBySlug, packages } from '$lib/data/packages';
import { loadPageCopy } from '$lib/i18n/page-copy';
import type { Copy } from './i18n/en';
import type { EntryGenerator, PageLoad } from './$types';

// Statically generate one page per package slug (better SEO/perf for static content)
export const prerender = true;

export const entries: EntryGenerator = () => packages.map((pkg) => ({ slug: pkg.slug }));

export const load: PageLoad = async ({ params, parent }) => {
	const pkg = getPackageBySlug(params.slug);
	if (!pkg) {
		error(404, 'Package not found');
	}
	const copy = await loadPageCopy<Copy>(import.meta.glob('./i18n/*.ts'), (await parent()).locale);
	return { pkg, copy };
};
