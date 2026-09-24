<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { siteConfig } from '$lib/data/site';
	import { LOCALE_META } from '$lib/i18n/locales';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	// Este grafo NO redefine la empresa ni el sitio: los referencia por @id.
	// Antes emitía un segundo nodo #organization con su propia dirección
	// ('Avenida de Barcelona, 34', distinta al NAP de site.ts), su propio teléfono
	// y su propio priceRange ('290€ - 650€' vs el '€€' de schema.ts) — dos verdades
	// para una sola entidad. Misma convención que buildServiceSchema (schema.ts).
	let aboutSchema = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'AboutPage',
				'@id': `${i18n.absolute('/about-us/')}#webpage`,
				'url': i18n.absolute('/about-us/'),
				'inLanguage': LOCALE_META[i18n.lang].htmlLang,
				'name': copy.seo.title,
				'description': copy.seo.description,
				'about': { '@id': `${siteConfig.url}/#organization` },
				'isPartOf': { '@id': `${siteConfig.url}/#website` }
			}
		]
	});
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/about-us/"
	jsonLdSchema={aboutSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-container-max mx-auto">
	<!-- Hero Section -->
	<div class="text-center mb-16 reveal">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{copy.hero.badge}
		</span>
		<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 text-on-background">
			{copy.hero.title}
		</h1>
		<p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
			{copy.hero.intro}
		</p>
	</div>

	<!-- Main Story Bento -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch mb-24">
		<div class="lg:col-span-7 flex">
			<div class="glass-panel rounded-xl p-8 md:p-12 w-full flex flex-col justify-between relative overflow-hidden">
				<div class="absolute -top-24 -left-24 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"></div>
				<div>
					<h2 class="font-headline-md text-headline-md mb-6 text-on-surface">
						{copy.story.title}
					</h2>
					<p class="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
						{copy.story.p1}
					</p>
					<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
						{copy.story.p2}
					</p>
				</div>
			</div>
		</div>

		<div class="lg:col-span-5 flex flex-col gap-6">
			<!-- Experience Card -->
			<div class="glass-panel rounded-xl p-8 flex-1 flex flex-col justify-center text-center">
				<span class="text-display-md font-bold text-electric-blue mb-2">27+</span>
				<h3 class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
					{copy.stats.experienceTitle}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant mt-2">
					{copy.stats.experienceBody}
				</p>
			</div>

			<!-- Satisfied Clients Card -->
			<div class="glass-panel rounded-xl p-8 flex-1 flex flex-col justify-center text-center">
				<span class="text-display-md font-bold text-electric-blue mb-2">1,000+</span>
				<h3 class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">
					{copy.stats.clientsTitle}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant mt-2">
					{copy.stats.clientsBody}
				</p>
			</div>
		</div>
	</div>

	<!-- What We Offer -->
	<div class="mb-24 reveal">
		<div class="text-center mb-16">
			<h2 class="font-headline-md text-headline-md mb-4 text-on-background">
				{copy.offer.title}
			</h2>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
				{copy.offer.intro}
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
			<!-- Sound Systems -->
			<div class="glass-panel rounded-xl p-8 flex flex-col gap-4">
				<div class="bg-surface-glass p-3 rounded-lg border border-border-glass text-electric-blue w-fit">
					<Icon name="volume_up" size="24" />
				</div>
				<h3 class="font-headline-sm text-headline-sm text-on-surface">
					{copy.offer.sound.title}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.offer.sound.body}
				</p>
			</div>

			<!-- Lighting -->
			<div class="glass-panel rounded-xl p-8 flex flex-col gap-4">
				<div class="bg-surface-glass p-3 rounded-lg border border-border-glass text-electric-blue w-fit">
					<Icon name="lightbulb" size="24" />
				</div>
				<h3 class="font-headline-sm text-headline-sm text-on-surface">
					{copy.offer.lighting.title}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.offer.lighting.body}
				</p>
			</div>

			<!-- Screens and Projectors -->
			<div class="glass-panel rounded-xl p-8 flex flex-col gap-4">
				<div class="bg-surface-glass p-3 rounded-lg border border-border-glass text-electric-blue w-fit">
					<Icon name="videocam" size="24" />
				</div>
				<h3 class="font-headline-sm text-headline-sm text-on-surface">
					{copy.offer.screens.title}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.offer.screens.body}
				</p>
			</div>

			<!-- Microphones -->
			<div class="glass-panel rounded-xl p-8 flex flex-col gap-4">
				<div class="bg-surface-glass p-3 rounded-lg border border-border-glass text-electric-blue w-fit">
					<Icon name="mic" size="24" />
				</div>
				<h3 class="font-headline-sm text-headline-sm text-on-surface">
					{copy.offer.microphones.title}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.offer.microphones.body}
				</p>
			</div>

			<!-- Event Technicians -->
			<div class="glass-panel rounded-xl p-8 flex flex-col gap-4">
				<div class="bg-surface-glass p-3 rounded-lg border border-border-glass text-electric-blue w-fit">
					<Icon name="engineering" size="24" />
				</div>
				<h3 class="font-headline-sm text-headline-sm text-on-surface">
					{copy.offer.technicians.title}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.offer.technicians.body}
				</p>
			</div>

			<!-- Special Effects -->
			<div class="glass-panel rounded-xl p-8 flex flex-col gap-4">
				<div class="bg-surface-glass p-3 rounded-lg border border-border-glass text-electric-blue w-fit">
					<Icon name="cyclone" size="24" />
				</div>
				<h3 class="font-headline-sm text-headline-sm text-on-surface">
					{copy.offer.effects.title}
				</h3>
				<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
					{copy.offer.effects.body}
				</p>
			</div>
		</div>
	</div>

	<!-- CTA Banner -->
	<div class="glass-panel rounded-xl p-8 md:p-12 text-center relative overflow-hidden reveal">
		<div class="absolute -bottom-24 -right-24 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"></div>
		<h2 class="font-headline-md text-headline-md mb-4 text-on-surface">
			{copy.cta.title}
		</h2>
		<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
			{copy.cta.body}
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href={i18n.href('/packages/')}
				class="px-8 py-3 rounded-full bg-electric-blue-strong text-white font-label-lg tracking-wider uppercase hover:shadow-[0_0_20px_rgba(77,140,255,0.4)] active:scale-95 transition-all duration-300"
			>
				{copy.cta.packages}
			</a>
			<a 
				href={i18n.href('/contact/')}
				class="px-8 py-3 rounded-full border border-border-glass bg-on-surface/5 hover:bg-on-surface/10 text-on-surface font-label-lg active:scale-95 transition-all"
			>
				{copy.cta.contact}
			</a>
		</div>
	</div>
</div>
