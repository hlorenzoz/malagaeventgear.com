<script lang="ts">
	import { getContext } from 'svelte';
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { faqCopy, pkgCopy } from '$lib/i18n/data-copy.svelte';
	import { faqs, buildFaqSchema } from '$lib/data/faq';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	const reveal = getContext<{ scan: () => void }>('reveal');

	// FAQPage JSON-LD generated from the same source as the rendered content,
	// so the structured data always matches every visible question.
	let faqSchema = $derived(buildFaqSchema(faqs.map(faqCopy)));

	let activeCategory = $state('all');
	let openIndex = $state<number | null>(null);

	$effect(() => {
		if (filteredFaqs && reveal) {
			reveal.scan();
		}
	});

	let faqList = $derived(
		faqs.map((item) => ({
			category: item.category,
			q: faqCopy(item).question,
			a: faqCopy(item).answer
		}))
	);

	let filteredFaqs = $derived(
		activeCategory === 'all'
			? faqList
			: faqList.filter(item => item.category === activeCategory)
	);

	function toggleFaq(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/faq/"
	jsonLdSchema={faqSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-4xl mx-auto">
	<!-- Heading -->
	<div class="text-center mb-12 reveal">
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

	<!-- Category Filters -->
	<div class="flex flex-wrap justify-center gap-3 mb-12 reveal">
		<button
			onclick={() => { activeCategory = 'all'; openIndex = null; }}
			class="px-6 py-2.5 rounded-full font-label-md text-sm border border-border-glass transition-all duration-300 focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none {activeCategory === 'all' ? 'bg-electric-blue-strong text-white shadow-[0_0_15px_rgba(77,140,255,0.3)]' : 'bg-surface-glass text-on-surface hover:bg-on-surface/5 active:scale-95'}"
		>
			{copy.filters.all}
		</button>
		<button
			onclick={() => { activeCategory = 'services'; openIndex = null; }}
			class="px-6 py-2.5 rounded-full font-label-md text-sm border border-border-glass transition-all duration-300 focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none {activeCategory === 'services' ? 'bg-electric-blue-strong text-white shadow-[0_0_15px_rgba(77,140,255,0.3)]' : 'bg-surface-glass text-on-surface hover:bg-on-surface/5 active:scale-95'}"
		>
			{copy.filters.services}
		</button>
		<button
			onclick={() => { activeCategory = 'logistics'; openIndex = null; }}
			class="px-6 py-2.5 rounded-full font-label-md text-sm border border-border-glass transition-all duration-300 focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none {activeCategory === 'logistics' ? 'bg-electric-blue-strong text-white shadow-[0_0_15px_rgba(77,140,255,0.3)]' : 'bg-surface-glass text-on-surface hover:bg-on-surface/5 active:scale-95'}"
		>
			{copy.filters.logistics}
		</button>
		<button
			onclick={() => { activeCategory = 'booking'; openIndex = null; }}
			class="px-6 py-2.5 rounded-full font-label-md text-sm border border-border-glass transition-all duration-300 focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none {activeCategory === 'booking' ? 'bg-electric-blue-strong text-white shadow-[0_0_15px_rgba(77,140,255,0.3)]' : 'bg-surface-glass text-on-surface hover:bg-on-surface/5 active:scale-95'}"
		>
			{copy.filters.booking}
		</button>
		<button
			onclick={() => { activeCategory = 'contact'; openIndex = null; }}
			class="px-6 py-2.5 rounded-full font-label-md text-sm border border-border-glass transition-all duration-300 focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none {activeCategory === 'contact' ? 'bg-electric-blue-strong text-white shadow-[0_0_15px_rgba(77,140,255,0.3)]' : 'bg-surface-glass text-on-surface hover:bg-on-surface/5 active:scale-95'}"
		>
			{copy.filters.contact}
		</button>
	</div>

	<!-- Accordion List -->
	<div class="space-y-4">
		{#each filteredFaqs as faq, i (faq.q)}
			{@const isOpen = openIndex === i}
			<div class="glass-panel rounded-xl overflow-hidden transition-colors duration-300 reveal">
				<button
					onclick={() => toggleFaq(i)}
					class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none group"
					aria-expanded={isOpen}
				>
					<span class="font-body-lg text-body-lg font-semibold group-hover:text-electric-blue transition-colors text-on-surface">
						{faq.q}
					</span>
					<Icon name={isOpen ? 'remove' : 'add'} className="text-on-surface-variant transition-transform duration-300 {isOpen ? 'rotate-180' : ''}" />
				</button>

				<!-- Always in the HTML, hidden until opened: the FAQPage JSON-LD must describe content that is on the page. -->
				<div
					hidden={!isOpen}
					class="px-6 pb-6 text-on-surface-variant font-body-md text-body-md border-t border-border-glass/30 pt-4"
				>
					<p>{faq.a}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
