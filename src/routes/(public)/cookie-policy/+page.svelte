<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import LegalLanguageNotice from '$lib/components/i18n/LegalLanguageNotice.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let cookiesSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${i18n.absolute('/cookie-policy/')}#webpage`,
		'url': i18n.absolute('/cookie-policy/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.seo.title,
		'description': copy.seo.description
	});
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/cookie-policy/"
	jsonLdSchema={cookiesSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-4xl mx-auto">
	<LegalLanguageNotice enPath="/cookie-policy/" />

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
				{copy.whatAreCookies.title}
			</h2>
			<p>
				{copy.whatAreCookies.body}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.categories.title}
			</h2>
			<div class="space-y-4">
				{#each copy.categories.items as item, index}
					<div>
						<h3 class="font-headline-xs text-headline-xs text-on-surface mb-2">
							{index + 1}. {item.title}
						</h3>
						<p>
							{item.body}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.managing.title}
			</h2>
			<p>
				{copy.managing.body}
			</p>
		</div>
	</div>
</div>
