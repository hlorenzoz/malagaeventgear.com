<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import LegalLanguageNotice from '$lib/components/i18n/LegalLanguageNotice.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { withPrices } from '$lib/data/packages';
	import { LOCALE_META } from '$lib/i18n/locales';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let termsSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${i18n.absolute('/terms-of-service/')}#webpage`,
		'url': i18n.absolute('/terms-of-service/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.seo.title,
		'description': copy.seo.description
	});
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/terms-of-service/"
	jsonLdSchema={termsSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-4xl mx-auto">
	<LegalLanguageNotice enPath="/terms-of-service/" />

	<div class="text-center mb-16 reveal">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{copy.hero.badge}
		</span>
		<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-on-background">
			{copy.hero.title}
		</h1>
		<p class="font-body-md text-body-md text-on-surface-variant">
			{copy.hero.effectiveDate}
		</p>
	</div>

	<div class="glass-panel rounded-xl p-8 md:p-12 space-y-8 text-on-surface-variant font-body-md leading-relaxed">
		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				1. {copy.intro.title}
			</h2>
			<p>
				{copy.intro.body}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				2. {copy.scope.title}
			</h2>
			<p class="mb-4">
				{copy.scope.p1}
			</p>
			<p>
				{copy.scope.p2}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				3. {copy.limits.title}
			</h2>
			<p class="mb-4">
				{withPrices(copy.limits.p1, i18n.lang)}
			</p>
			<p class="mb-4">
				{copy.limits.p2}
			</p>
			<p>
				{copy.limits.p3}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				4. {copy.booking.title}
			</h2>
			<p class="mb-4">
				{copy.booking.p1}
			</p>
			<p>
				{copy.booking.p2}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				5. {copy.obligations.title}
			</h2>
			<p>
				{copy.obligations.body}
			</p>
		</div>
	</div>
</div>
