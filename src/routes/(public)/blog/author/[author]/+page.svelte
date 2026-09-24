<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';
	import { slugify } from '$lib/utils/slugify';
	import { buildPersonSchema } from '$lib/utils/schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let posts = $derived(data.posts);
	let authorSlug = $derived(data.author);
	// ADR-011: display name from authorMeta, not derived from slug
	let authorName = $derived(data.authorMeta?.name ?? authorSlug);

	let title = $derived(copy.titleTemplate.replace('{name}', authorName));
	let description = $derived(copy.descriptionTemplate.replace('{name}', authorName));

	let canonicalUrl = $derived(`https://malagaeventgear.com/blog/author/${authorSlug}/`);

	let collectionSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${i18n.absolute(`/blog/author/${authorSlug}/`)}#webpage`,
		'url': i18n.absolute(`/blog/author/${authorSlug}/`),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': title,
		'isPartOf': {
			'@type': 'WebSite',
			'@id': 'https://malagaeventgear.com/#website',
			'url': 'https://malagaeventgear.com/',
			'name': 'Malaga Event Gear'
		},
		'numberOfItems': posts.length
	});

	// This page IS the canonical Person node for the author (its own url is what every
	// BlogPosting.author reference points at via buildArticleSchema). Defining it here, once,
	// is what lets meet-the-team/ point at the SAME @id instead of a second, unlinked node.
	// '@context' added here (not inside buildPersonSchema) because THIS array item renders as
	// its own top-level <script> tag, unlike meet-the-team's usage nested inside one @graph.
	// The canonical URL stays the English literal derivation (SeoHead localizes the page,
	// but this Person node's identity is not locale-specific).
	let personSchema = $derived({
		'@context': 'https://schema.org',
		...buildPersonSchema({ name: authorName, url: canonicalUrl })
	});

	function formatDate(dateStr: string): string {
		try {
			return new Date(dateStr).toLocaleDateString(LOCALE_META[i18n.lang].intl, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}
</script>

<SeoHead
	{title}
	{description}
	{canonicalUrl}
	jsonLdSchema={[collectionSchema, personSchema]}
/>

<!-- Author Heading -->
<section class="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
	<div class="mb-10">
		<a href={i18n.href('/blog/')} class="text-sm text-electric-blue hover:underline">
			← {copy.backLink}
		</a>
		<h1 class="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mt-4 leading-tight">
			{copy.headingPrefix}
			<span class="text-electric-blue">{authorName}</span>
		</h1>
		<p class="text-on-surface-variant font-body-md mt-2">
			{posts.length}
			{posts.length === 1 ? copy.post.singular : copy.post.plural}
		</p>
	</div>

	<!-- Posts Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each posts as post, i}
			<article data-testid="post-card" class="relative bg-surface-container-low border border-border-glass rounded-[20px] overflow-hidden hover:border-electric-blue/40 transition-colors duration-300 flex flex-col">
				{#if post.coverImage}
					<a href={i18n.href(`/blog/${post.slug}/`)} class="block aspect-video overflow-hidden">
						<img
							src={post.coverImageThumb ?? post.coverImage}
							srcset={post.coverImageSrcset}
							sizes="(min-width: 1024px) 370px, (min-width: 768px) 45vw, calc(100vw - 2rem)"
							alt={post.title}
							width="370"
							height="208"
							class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							loading={i === 0 ? 'eager' : 'lazy'}
							fetchpriority={i === 0 ? 'high' : undefined}
						/>
					</a>
				{/if}

				<div class="p-6 flex flex-col flex-1">
					<div class="flex flex-wrap items-center gap-2 mb-3">
						{#if post.isNews}
							<span class="px-2 py-0.5 rounded-full text-xs font-label-sm bg-electric-blue text-white uppercase tracking-wider">
								{copy.newsBadge}
							</span>
						{/if}
						{#each post.categories as cat}
							<a
								href={i18n.href(`/blog/category/${slugify(cat)}/`)}
								class="text-xs font-label-sm text-electric-blue uppercase tracking-wider hover:underline"
							>
								{i18n.categoryName(cat)}
							</a>
						{/each}
					</div>

					<h2 class="font-headline-sm text-headline-sm text-on-surface mb-3 leading-tight">
						<a href={i18n.href(`/blog/${post.slug}/`)} class="hover:text-electric-blue transition-colors">
							{post.title}
						</a>
					</h2>

					{#if post.excerpt}
						<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1 line-clamp-3">
							{post.excerpt}
						</p>
					{/if}

					<div class="flex items-center justify-between mt-auto pt-4 border-t border-border-glass">
						<time datetime={post.publishDate} class="text-xs text-on-surface-variant">
							{formatDate(post.publishDate)}
						</time>
						<a
							href={i18n.href(`/blog/${post.slug}/`)}
							class="text-xs font-label-sm text-electric-blue hover:underline uppercase tracking-wider"
						>
							{copy.readMore}
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
