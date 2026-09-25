import { page } from '$app/state';
import type { DataCopy } from './data-copy';

/**
 * Alt text of a gallery image (src/lib/data/gallery.ts) in the language of the current page.
 * English is the source. Other languages come from the `gallery` block of their data file,
 * loaded into `page.data.dataCopy` by `(public)/+layout.ts`, keyed by the image src. Kept apart
 * from data-copy.svelte.ts so the carousel does not pull the package and FAQ modules into every
 * page that shows it.
 */
export function galleryAlt(image: { src: string; alt: string }): string {
	const copy = page.data?.dataCopy as DataCopy | null | undefined;
	return copy?.gallery[image.src] ?? image.alt;
}
