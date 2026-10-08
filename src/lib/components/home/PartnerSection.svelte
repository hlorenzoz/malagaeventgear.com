<script lang="ts">
	// Home page block about Top Group Express (TGE), MEG's partner for group hotel bookings
	// (task #T0076). Static on purpose: no scroll container, no lazy mount and no client only
	// rendering, so the text and the link are in the prerendered HTML.
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { TGE_APP_IMAGE } from '$lib/data/partners';
	import type { Copy } from '../../../routes/(public)/i18n/en';

	let { copy, href }: { copy: Copy['partner']; href: string } = $props();
</script>

<section data-testid="partner-tge" class="py-24 px-margin-mobile md:px-margin-desktop">
	<div
		class="max-w-container-max mx-auto glass-card rounded-2xl ambient-shadow border border-border-glass p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-colors duration-300"
	>
		<div>
			<span
				class="inline-block px-4 py-2 rounded-2xl sm:rounded-full glass-panel border border-electric-blue/40 font-label-sm text-on-surface-variant uppercase tracking-wide sm:tracking-widest mb-6"
			>
				{copy.badge}
			</span>
			<h2 class="font-headline-lg text-[32px] md:text-headline-lg text-on-background mb-6">
				{copy.title}
			</h2>
			<p class="font-body-lg text-body-lg text-on-surface-variant mb-6">{copy.body}</p>
			<ul class="space-y-3 mb-6">
				{#each copy.points as point}
					<li class="flex items-start gap-3 font-body-md text-body-md text-on-background">
						<Icon name="check" size="20" className="text-electric-blue mt-0.5" />
						<span>{point}</span>
					</li>
				{/each}
			</ul>
			<p class="font-body-md text-sm text-on-surface-variant mb-8">{copy.note}</p>
			<!-- Plain external link: TGE is a partner with no payment, so neither sponsored nor
			     nofollow. arrow_outward is the external link icon of the Icon catalog. -->
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center gap-2 min-h-11 bg-electric-blue-strong text-white px-8 py-3.5 rounded-full font-label-lg hover:shadow-lg hover:shadow-electric-blue/30 hover:-translate-y-0.5 transition-all active:scale-95 duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
			>
				{copy.cta}
				<Icon name="arrow_outward" size="18" />
			</a>
		</div>

		<!-- The screenshot has a transparent background: it sits straight on the card, with no
		     box behind it, so it reads the same on the dark and the light theme. -->
		<picture class="block w-full max-w-[560px] mx-auto">
			<source type="image/avif" srcset={TGE_APP_IMAGE.avifSrcset} sizes={TGE_APP_IMAGE.sizes}>
			<source type="image/webp" srcset={TGE_APP_IMAGE.webpSrcset} sizes={TGE_APP_IMAGE.sizes}>
			<img
				src={TGE_APP_IMAGE.src}
				width={TGE_APP_IMAGE.width}
				height={TGE_APP_IMAGE.height}
				alt={copy.imageAlt}
				loading="lazy"
				decoding="async"
				class="w-full h-auto"
			>
		</picture>
	</div>
</section>
