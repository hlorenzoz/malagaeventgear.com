<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';
	import ImageMarquee from '$lib/components/home/ImageMarquee.svelte';
	import { galleryImages } from '$lib/data/gallery';
	import Testimonials from '$lib/components/testimonials/Testimonials.svelte';
	import { buildPersonSchema } from '$lib/utils/schema';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	// url points at /blog/author/hector-luis-lorenzo/, the page that OWNS this Person node
	// (buildPersonSchema derives the same @id there via url + "#person"). Pointing this page's
	// url anywhere else, or hand-writing a different @id here, is exactly the drift that left
	// this node unreachable at a dead /author/... URL before this fix.
	let personSchema = $derived(
		buildPersonSchema({
			name: 'Hector Luis Lorenzo',
			url: i18n.absolute('/blog/author/hector-luis-lorenzo/'),
			description: copy.hector.personDescription
		})
	);

	let teamSchema = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${i18n.absolute('/meet-the-team/')}#webpage`,
				'url': i18n.absolute('/meet-the-team/'),
				'inLanguage': LOCALE_META[i18n.lang].htmlLang,
				'name': copy.seo.title,
				'description': copy.seo.description
			},
			personSchema
		]
	});
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/meet-the-team/"
	image="https://cdn.malagaeventgear.com/team/hector-luis-lorenzo.webp"
	jsonLdSchema={teamSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-container-max mx-auto">
	<!-- Heading -->
	<div class="text-center mb-16 reveal">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{copy.hero.badge}
		</span>
		<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 text-on-background">
			{copy.hero.title}
		</h1>
		<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
			{copy.hero.intro}
		</p>
	</div>

	<!-- Team Cards Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch mb-24">
		<!-- Technical Personnel -->
		<div class="glass-panel rounded-xl p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group">
			<div class="absolute -top-24 -right-24 w-48 h-48 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
			<div class="flex flex-col items-center">
				<div class="w-24 h-24 rounded-full bg-surface-glass border border-border-glass flex items-center justify-center text-electric-blue mb-6">
					<Icon name="engineering" size="48" />
				</div>
				<h2 class="font-headline-sm text-headline-sm text-on-surface mb-2">
					{copy.technical.title}
				</h2>
				<p class="font-label-sm text-label-sm text-electric-blue uppercase tracking-widest mb-4">
					{copy.technical.subtitle}
				</p>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.technical.body}
				</p>
			</div>
		</div>

		<!-- Sales Personnel -->
		<div class="glass-panel rounded-xl p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group">
			<div class="absolute -top-24 -right-24 w-48 h-48 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
			<div class="flex flex-col items-center">
				<div class="w-24 h-24 rounded-full bg-surface-glass border border-border-glass flex items-center justify-center text-electric-blue mb-6">
					<Icon name="support_agent" size="48" />
				</div>
				<h2 class="font-headline-sm text-headline-sm text-on-surface mb-2">
					{copy.sales.title}
				</h2>
				<p class="font-label-sm text-label-sm text-electric-blue uppercase tracking-widest mb-4">
					{copy.sales.subtitle}
				</p>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.sales.body}
				</p>
			</div>
		</div>

		<!-- Hector Luis Lorenzo -->
		<div class="glass-panel rounded-xl p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group">
			<div class="absolute -top-24 -right-24 w-48 h-48 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
			<div class="flex flex-col items-center">
				<div class="w-24 h-24 rounded-full bg-surface-glass border border-border-glass flex items-center justify-center text-electric-blue mb-6 overflow-hidden">
					<img
						src="https://cdn.malagaeventgear.com/team/hector-luis-lorenzo.webp"
						alt="Hector Luis Lorenzo"
						class="w-full h-full object-cover"
						width="96"
						height="96"
						loading="lazy"
					/>
				</div>
				<h2 class="font-headline-sm text-headline-sm text-on-surface mb-2">
					Hector Luis Lorenzo
				</h2>
				<p class="font-label-sm text-label-sm text-electric-blue uppercase tracking-widest mb-4">
					{copy.hector.role}
				</p>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
					{copy.hector.bio}
				</p>
				<div class="flex items-center gap-3">
					<a
						href="https://www.linkedin.com/in/hlorenzoz/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-on-surface-variant hover:text-electric-blue transition-colors"
						aria-label={copy.hector.linkedinLabel}
					>
						<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
							<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Gallery Marquee Section -->
<section class="py-24 overflow-hidden relative">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-12">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{i18n.t.gallery.titleHome}
		</span>
	</div>

	<div class="space-y-4">
		<ImageMarquee images={galleryImages.slice(0, 15)} speed="normal" direction="left" />
		<ImageMarquee images={galleryImages.slice(15)} speed="normal" direction="right" />
	</div>
</section>

<!-- Testimonials Section (Google Reviews) -->
<Testimonials />
