<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';
	import { buildItemListSchema } from '$lib/utils/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let categories = $derived(data.categories);

	const canonicalUrl = 'https://malagaeventgear.com/blog/categories/';

	let collectionSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${i18n.absolute('/blog/categories/')}#webpage`,
		'url': i18n.absolute('/blog/categories/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.schemaName,
		'isPartOf': {
			'@type': 'WebSite',
			'@id': 'https://malagaeventgear.com/#website',
			'url': 'https://malagaeventgear.com/',
			'name': 'Malaga Event Gear'
		},
		'numberOfItems': categories.length
	});

	let itemListSchema = $derived(
		buildItemListSchema(
			categories.map((c) => ({ name: c.name, url: i18n.href(`/blog/category/${c.slug}/`) })),
			copy.itemListLabel
		)
	);

	function postCountLabel(count: number): string {
		return `${count} ${count === 1 ? copy.post.singular : copy.post.plural}`;
	}
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	{canonicalUrl}
	jsonLdSchema={[collectionSchema, itemListSchema]}
/>

<!-- Categories Heading -->
<section class="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
	<div class="mb-10">
		<a href={i18n.href('/blog/')} class="text-sm text-electric-blue hover:underline">
			← {copy.backLink}
		</a>
		<h1 class="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mt-4 leading-tight">
			{copy.heading}
		</h1>
		<p class="text-on-surface-variant font-body-md mt-2">
			{categories.length}
			{copy.categoriesLabel}
		</p>
	</div>

	<!-- Categories Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
		<a
			href={i18n.href('/blog/')}
			class="group bg-surface-container-low border border-border-glass rounded-[20px] p-6 flex items-center gap-4 hover:border-electric-blue/40 transition-colors duration-300"
		>
			<span class="text-electric-blue shrink-0">
				<Icon name="rss_feed" size="28" />
			</span>
			<span class="flex flex-col">
				<span class="font-headline-sm text-headline-sm text-on-surface group-hover:text-electric-blue transition-colors leading-tight">
					{copy.allPosts}
				</span>
				<span class="font-body-sm text-body-sm text-on-surface-variant mt-1">
					{postCountLabel(data.totalPosts)}
				</span>
			</span>
		</a>

		{#each categories as cat (cat.slug)}
			<a
				href={i18n.href(`/blog/category/${cat.slug}/`)}
				class="group bg-surface-container-low border border-border-glass rounded-[20px] p-6 flex items-center gap-4 hover:border-electric-blue/40 transition-colors duration-300"
			>
				<span class="text-electric-blue shrink-0">
					<Icon name="folder" size="28" />
				</span>
				<span class="flex flex-col">
					<span class="font-headline-sm text-headline-sm text-on-surface group-hover:text-electric-blue transition-colors leading-tight">
						{cat.name}
					</span>
					<span class="font-body-sm text-body-sm text-on-surface-variant mt-1">
						{postCountLabel(cat.count)}
					</span>
				</span>
			</a>
		{/each}
	</div>
</section>
