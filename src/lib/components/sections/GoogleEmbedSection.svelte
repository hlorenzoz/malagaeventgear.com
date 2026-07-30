<script lang="ts">
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { siteConfig } from '$lib/data/site';

	const googleShareUrl = 'https://share.google/VclWknaPevh6mN3VF';
	const googleEmbedMapUrl =
		'https://maps.google.com/maps?q=Malaga+Event+Gear,+Av.+de+Barcelona,+34,+Distrito+Centro,+29009+M%C3%A1laga&t=&z=15&ie=UTF8&iwloc=&output=embed';
</script>

<section id="google-location-section" class="py-20 px-margin-mobile md:px-margin-desktop relative">
	<div class="max-w-container-max mx-auto text-center">
		<div class="mb-10">
			<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
				{i18n.t.googleMap.badge}
			</span>
			<h2 class="font-headline-lg text-[32px] md:text-headline-lg text-on-background mb-4">
				{i18n.t.googleMap.title}
			</h2>
			<p class="font-body-lg text-on-surface-variant max-w-xl mx-auto">
				{i18n.t.googleMap.subtitle}
			</p>
		</div>

		<div class="glass-card p-3 md:p-6 rounded-2xl ambient-shadow border border-border-glass max-w-5xl mx-auto overflow-hidden">
			<div class="relative w-full overflow-hidden rounded-xl bg-surface-container-low">
				<iframe
					src={googleEmbedMapUrl}
					title="Malaga Event Gear - Google Business Profile"
					class="w-full h-[400px] md:h-[500px] rounded-xl border-0 shadow-inner"
					loading="lazy"
					allowfullscreen
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>

			<div class="mt-6 flex flex-wrap items-center justify-center gap-4">
				<a
					href={googleShareUrl}
					target="_blank"
					rel="noopener noreferrer"
					id="google-share-external-link"
					class="inline-flex items-center gap-2 bg-electric-blue-strong text-white px-8 py-3.5 rounded-full font-label-lg hover:shadow-[0_0_25px_rgba(77,140,255,0.35)] hover:-translate-y-0.5 transition-all active:scale-95 duration-200"
				>
					<Icon name="location_on" size="20" />
					{i18n.t.googleMap.viewOnGoogle}
					<Icon name="open_in_new" size="18" />
				</a>
			</div>
		</div>
	</div>
</section>
