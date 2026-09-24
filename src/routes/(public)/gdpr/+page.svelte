<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import LegalLanguageNotice from '$lib/components/i18n/LegalLanguageNotice.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { siteConfig } from '$lib/data/site';
	import { LOCALE_META } from '$lib/i18n/locales';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	let gdprSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${i18n.absolute('/gdpr/')}#webpage`,
		'url': i18n.absolute('/gdpr/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.seo.title,
		'description': copy.seo.description
	});

	let requestStatus = $state<string | null>(null);

	function triggerRightsRequest(action: keyof typeof copy.rightsPortal.actions) {
		requestStatus = `${copy.rightsPortal.status.prefix}${copy.rightsPortal.actions[action]}${copy.rightsPortal.status.middle}${siteConfig.contactEmail}${copy.rightsPortal.status.suffix}`;
	}
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/gdpr/"
	jsonLdSchema={gdprSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-4xl mx-auto">
	<LegalLanguageNotice enPath="/gdpr/" />

	<div class="text-center mb-16 reveal">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{copy.hero.badge}
		</span>
		<h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-on-background">
			{copy.hero.title}
		</h1>
		<p class="font-body-md text-body-md text-on-surface-variant">
			{copy.hero.effectiveDateLine}
		</p>
	</div>

	<div class="glass-panel rounded-xl p-8 md:p-12 space-y-8 text-on-surface-variant font-body-md leading-relaxed mb-12">
		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.commitment.title}
			</h2>
			<p>
				{copy.commitment.body}
			</p>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.processing.title}
			</h2>
			<div class="overflow-x-auto w-full border border-border-glass rounded-lg mb-4">
				<table class="w-full text-left border-collapse font-body-sm text-sm">
					<thead>
						<tr class="bg-on-surface/5 border-b border-border-glass">
							<th class="p-4 font-semibold text-on-surface">{copy.processing.headers.category}</th>
							<th class="p-4 font-semibold text-on-surface">{copy.processing.headers.legalBasis}</th>
							<th class="p-4 font-semibold text-on-surface">{copy.processing.headers.purpose}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-glass">
						{#each copy.processing.rows as row}
							<tr>
								<td class="p-4 font-semibold text-on-surface">{row.category}</td>
								<td class="p-4">{row.legalBasis}</td>
								<td class="p-4">{row.purpose}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div>
			<h2 class="font-headline-sm text-headline-sm text-on-surface mb-4">
				{copy.rights.title}
			</h2>
			<p class="mb-4">
				{copy.rights.intro}
			</p>
			<ul class="list-disc pl-6 space-y-2">
				{#each copy.rights.items as item}
					<li><strong>{item.label}</strong>{i18n.space}{item.body}</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Interactive Rights Portal -->
	<div class="glass-panel rounded-xl p-8 md:p-12 text-center relative overflow-hidden reveal">
		<div class="absolute -bottom-24 -right-24 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"></div>
		<h2 class="font-headline-md text-headline-md mb-4 text-on-surface">
			{copy.rightsPortal.title}
		</h2>
		<p class="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mb-8">
			{copy.rightsPortal.body}
		</p>

		{#if requestStatus}
			<div role="status" class="p-4 mb-8 rounded-lg bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-body-md animate-fade-in">
				{requestStatus}
			</div>
		{/if}

		<div class="flex flex-wrap justify-center gap-4">
			<button
				data-testid="gdpr-request-access"
				onclick={() => triggerRightsRequest('access')}
				class="px-6 py-3 rounded-full border border-border-glass bg-on-surface/5 hover:bg-on-surface/10 text-on-surface font-label-md active:scale-95 transition-all"
			>
				{copy.rightsPortal.buttons.access}
			</button>
			<button
				onclick={() => triggerRightsRequest('rectification')}
				class="px-6 py-3 rounded-full border border-border-glass bg-on-surface/5 hover:bg-on-surface/10 text-on-surface font-label-md active:scale-95 transition-all"
			>
				{copy.rightsPortal.buttons.rectification}
			</button>
			<button
				onclick={() => triggerRightsRequest('erasure')}
				class="px-6 py-3 rounded-full border border-error/20 bg-error/5 hover:bg-error/15 text-error font-label-md active:scale-95 transition-all"
			>
				{copy.rightsPortal.buttons.erasure}
			</button>
		</div>
	</div>
</div>
