<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import { breadcrumbTrail } from '$lib/i18n/breadcrumbs';
	import Icon from '$lib/components/navigation/Icon.svelte';

	// Real title of the current post/package, when the route data provides one
	// (see +layout.svelte). Overrides the capitalized-slug fallback for the
	// last breadcrumb item so the visible trail matches the BreadcrumbList
	// JSON-LD leaf instead of diverging from it.
	let { leafName }: { leafName?: string } = $props();

	// Same trail as the JSON-LD (i18n/breadcrumbs.ts): built from the ENGLISH route path, named
	// from the current locale's dictionary and linked to the localized URLs.
	const items = $derived.by(() => {
		const enPath = page.data?.enPath as string | null | undefined;
		// No trail on the home page (protects its layout) nor on a 404 (no route).
		if (!enPath || enPath === '/') return [];
		return breadcrumbTrail(enPath, {
			names: i18n.t.crumbs as Record<string, string>,
			localize: (path) => i18n.href(path),
			leafName
		});
	});
</script>

{#if items.length > 0}
	<nav aria-label={i18n.t.nav.breadcrumbs} class="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 pb-2 relative z-20">
		<div class="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full border border-border-glass bg-surface-glass backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-on-surface-variant font-body-md text-xs sm:text-sm">
			{#each items as item, index}
				{#if index > 0}
					<Icon name="chevron_right" className="text-outline opacity-40 select-none" size="16" />
				{/if}
				{#if index === items.length - 1}
					<span class="font-semibold text-on-surface truncate max-w-[150px] sm:max-w-none" aria-current="page">
						{item.name}
					</span>
				{:else if item.navigable === false}
					<!-- Section segment without an index page (e.g. /blog/author/) — plain text, not a link -->
					<span class="select-none">{item.name}</span>
				{:else}
					<a
						href={item.path}
						class="hover:text-electric-blue hover:underline transition-colors duration-200"
					>
						{item.name}
					</a>
				{/if}
			{/each}
		</div>
	</nav>
{/if}
