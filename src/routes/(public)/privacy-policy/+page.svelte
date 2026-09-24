<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import LegalLanguageNotice from '$lib/components/i18n/LegalLanguageNotice.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let privacySchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${i18n.absolute('/privacy-policy/')}#webpage`,
		'url': i18n.absolute('/privacy-policy/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.seo.title,
		'description': copy.seo.description
	});
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/privacy-policy/"
	jsonLdSchema={privacySchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-4xl mx-auto">
	<LegalLanguageNotice enPath="/privacy-policy/" />

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
				{copy.whoWeAre.title}
			</h2>
			<p>
				{copy.whoWeAre.body}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.infoCollected.title}
			</h2>
			<p class="mb-4">
				{copy.infoCollected.intro}
			</p>

			<div class="overflow-x-auto w-full border border-border-glass rounded-lg">
				<table class="w-full text-left border-collapse font-body-sm text-sm">
					<thead>
						<tr class="bg-on-surface/5 border-b border-border-glass">
							<th class="p-4 font-semibold text-on-surface">{copy.infoCollected.table.headers.category}</th>
							<th class="p-4 font-semibold text-on-surface">{copy.infoCollected.table.headers.purpose}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-glass">
						{#each copy.infoCollected.table.rows as row}
							<tr>
								<td class="p-4 font-semibold text-on-surface">{row.category}</td>
								<td class="p-4">{row.purpose}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.reviews.title}
			</h2>
			<p>
				{copy.reviews.body}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.retention.title}
			</h2>
			<p>
				{copy.retention.body}
			</p>
		</div>
	</div>
</div>
