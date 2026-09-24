<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import Testimonials from '$lib/components/testimonials/Testimonials.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';
	import { slugify } from '$lib/utils/slugify';
	import type { PageData } from './$types';

	// Icons for the decorative thematic clusters, zipped with copy.clusters (same order).
	const clusterIcons = ['favorite', 'business', 'speaker', 'highlight', 'videocam', 'celebration'];

	let { data }: { data: PageData } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let posts = $derived(data.posts);

	let clusters = $derived(clusterIcons.map((icon, i) => ({ icon, label: copy.clusters[i] })));

	let blogSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${i18n.absolute('/blog/')}#webpage`,
		'url': i18n.absolute('/blog/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.schema.name,
		'isPartOf': {
			'@type': 'WebSite',
			'@id': 'https://malagaeventgear.com/#website',
			'url': 'https://malagaeventgear.com/',
			'name': 'Malaga Event Gear'
		},
		'description': copy.schema.description,
		'numberOfItems': posts.length
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
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/blog/"
	jsonLdSchema={blogSchema}
/>

<!-- Hero & Presentation Section -->
<section class="relative px-margin-mobile md:px-margin-desktop py-20 md:py-32 max-w-container-max mx-auto text-center flex flex-col items-center justify-center overflow-hidden">
	<!-- Dynamic Ambient Glow Backgrounds -->
	<div class="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-electric-blue rounded-full blur-[140px] opacity-15 pointer-events-none"></div>
	<div class="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-primary rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

	<span class="font-label-lg text-electric-blue uppercase tracking-[0.2em] mb-4 block reveal active is-revealed">
		{copy.hero.badge}
	</span>
	<h1 class="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 max-w-4xl mx-auto leading-tight reveal active is-revealed">
		{copy.hero.titlePrefix}{i18n.space}<span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-electric-blue">{copy.hero.titleHighlight}</span>
	</h1>
	<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 reveal active is-revealed" style="transition-delay: 100ms;">
		{copy.hero.intro}
	</p>
</section>

<!-- Posts Grid -->
<section class="px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto">
	{#if posts.length === 0}
		<p class="text-center text-on-surface-variant font-body-lg">
			{copy.empty}
		</p>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each posts as post, i}
				<!-- content-visibility:auto deja que el navegador SALTE render/layout/paint de las cards
				     fuera de viewport (sin sacarlas del DOM → SEO intacto). La primera card queda exenta:
				     está above-the-fold y es dueña de la imagen LCP (eager). contain-intrinsic-size con
				     `auto` recuerda el alto real una vez renderizada → CLS se mantiene en 0. -->
				<article
					data-testid="post-card"
					class="relative bg-surface-container-low border border-border-glass rounded-[20px] overflow-hidden hover:border-electric-blue/40 transition-colors duration-300 flex flex-col {i === 0 ? '' : '[content-visibility:auto] [contain-intrinsic-size:auto_420px]'}"
				>
					<!-- Cover Image -->
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
						<!-- Categories + News badge -->
						<div class="flex flex-wrap items-center gap-2 mb-3">
							{#if post.isNews}
								<span class="px-2 py-0.5 rounded-full text-xs font-label-sm bg-electric-blue-strong text-white uppercase tracking-wider">
									{copy.newsBadge}
								</span>
							{/if}
							{#each post.categories as category}
								<a
									href={i18n.href(`/blog/category/${slugify(category)}/`)}
									class="text-xs font-label-sm text-electric-blue uppercase tracking-wider hover:underline"
								>
									{i18n.categoryName(category)}
								</a>
							{/each}
						</div>

						<!-- Title -->
						<h2 class="font-headline-sm text-headline-sm text-on-surface mb-3 leading-tight">
							<a href={i18n.href(`/blog/${post.slug}/`)} class="hover:text-electric-blue transition-colors">
								{post.title}
							</a>
						</h2>

						<!-- Excerpt -->
						{#if post.excerpt}
							<p class="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1 line-clamp-3">
								{post.excerpt}
							</p>
						{/if}

						<!-- Meta: date + read more -->
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
	{/if}
</section>

<!-- Core Clusters We Cover + CTAs -->
<section data-testid="blog-clusters" class="px-margin-mobile md:px-margin-desktop py-16 md:py-24 max-w-4xl mx-auto border-t border-border-glass">
	<div class="relative flex flex-col items-center text-center">
		<!-- Ambient glow -->
		<div class="absolute -inset-x-10 -top-10 h-64 bg-electric-blue rounded-full blur-[160px] opacity-10 pointer-events-none"></div>

		<h2 class="relative z-10 font-label-sm text-electric-blue uppercase tracking-widest mb-8">
			{copy.clustersHeading}
		</h2>

		<div class="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
			{#each clusters as cluster}
				<div class="p-6 rounded-2xl bg-surface-container-low border border-border-glass backdrop-blur-md flex flex-col items-center gap-3 hover:border-electric-blue/40 transition-colors duration-300">
					<Icon name={cluster.icon} size="28" className="text-on-surface" />
					<span class="font-label-sm text-on-surface">
						{cluster.label}
					</span>
				</div>
			{/each}
		</div>

		<div class="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-12 w-full justify-center">
			<a
				href={i18n.href('/contact/')}
				class="w-full sm:w-auto px-8 py-3 rounded-full bg-electric-blue-strong text-white font-label-lg uppercase tracking-wider hover:shadow-lg hover:shadow-electric-blue/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
			>
				{copy.cta.advice}
				<Icon name="arrow_forward" size="18" />
			</a>
			<a
				href={i18n.href('/packages/')}
				class="w-full sm:w-auto px-8 py-3 rounded-full border border-border-glass text-on-surface font-label-lg uppercase tracking-wider hover:bg-on-surface/5 active:scale-95 transition-all duration-300 flex items-center justify-center"
			>
				{copy.cta.packages}
			</a>
		</div>
	</div>
</section>

<!-- Google My Business reviews carousel (reused component) -->
<Testimonials />
