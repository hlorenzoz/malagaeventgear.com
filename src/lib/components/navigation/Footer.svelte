<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { packages } from '$lib/data/packages';
	import { siteConfig } from '$lib/data/site';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import LanguageSwitcher from '$lib/components/navigation/LanguageSwitcher.svelte';
	import type { Category } from '$lib/types/blog';
	import { LOGO_LIGHT, LOGO_DARK } from '$lib/assets/logos';

	// Categorías del blog serializadas por (public)/+layout.server.ts — NO importar $lib/data/blog aquí.
	let { categories = [] }: { categories?: Category[] } = $props();
</script>

<!-- Footer Shared Component -->
<footer class="w-full py-16 px-margin-mobile md:px-margin-desktop border-t border-border-glass bg-surface-container-low transition-colors duration-300">
	<div class="max-w-container-max mx-auto">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-gutter mb-12">
			<!-- Col 1: Brand Info -->
			<div class="sm:col-span-2 lg:col-span-12 flex flex-col items-center gap-4 text-center mb-8 lg:mb-12">
				<!-- Brand logo (theme-aware via data-theme CSS swap) -->
				<img src={LOGO_LIGHT} alt={i18n.t.nav.brand} width="250" height="75" class="brand-logo brand-logo--light h-9 w-auto" />
				<img src={LOGO_DARK} alt={i18n.t.nav.brand} width="250" height="75" class="brand-logo brand-logo--dark h-9 w-auto" />
				<p class="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-2">
					{i18n.t.footer.brandSubtitle}
				</p>
			</div>

			<!-- Col 2: Navigation / Links -->
			<div class="lg:col-span-3 flex flex-col gap-4">
				<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
					{i18n.t.footer.usefulLinks}
				</span>
				<nav class="flex flex-col gap-2">
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/')}>
						{i18n.t.footer.home}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/packages/')}>
						{i18n.t.footer.packages}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/blog/')}>
						{i18n.t.footer.blog}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/blog/category/news/')}>
						{i18n.t.footer.news}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/blog/categories/')}>
						{i18n.t.footer.categories}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/about-us/')}>
						{i18n.t.footer.aboutUs}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/meet-the-team/')}>
						{i18n.t.footer.meetTheTeam}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/contact/')}>
						{i18n.t.footer.contactUs}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/terms-of-service/')}>
						{i18n.t.footer.termsOfService}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/privacy-policy/')}>
						{i18n.t.footer.privacyPolicy}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/cookie-policy/')}>
						{i18n.t.footer.cookiePolicy}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/gdpr/')}>
						{i18n.t.footer.gdpr}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/faq/')}>
						{i18n.t.footer.faq}
					</a>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href('/sitemap/')}>
						{i18n.t.footer.sitemap}
					</a>
				</nav>
			</div>

			<!-- Col 3: Service Packages -->
			<div class="lg:col-span-3 flex flex-col gap-4">
				<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
					{i18n.t.footer.servicePackages}
				</span>
				<nav class="flex flex-col gap-2">
					{#each packages as pkg (pkg.id)}
						<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href(pkg.route)}>
							{pkg.name}
						</a>
					{/each}
				</nav>
				<a href={i18n.href('/blog/categories/')} class="font-label-lg text-on-surface uppercase tracking-wider mb-2 mt-4 hover:text-electric-blue transition-colors duration-200">
					{i18n.t.footer.categories}
				</a>
				<nav class="flex flex-col gap-2">
					{#each categories as cat (cat.slug)}
						<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={i18n.href(`/blog/category/${cat.slug}/`)}>
							{cat.name}
						</a>
					{/each}
				</nav>
			</div>

			<!-- Col 4: Address / Listings / Online Presence -->
			<div class="lg:col-span-3 flex flex-col gap-8">
				<div class="flex flex-col gap-4">
					<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
						{i18n.t.footer.localAddress}
					</span>
					<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue transition-colors duration-200" href={siteConfig.googleBusinessProfile} target="_blank" rel="noopener noreferrer">
						{siteConfig.displayAddress}
					</a>
				</div>

				<div class="flex flex-col gap-4">
					<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
						{i18n.t.footer.listings}
					</span>
					<nav class="flex flex-col gap-2">
						<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={siteConfig.googleBusinessProfile} target="_blank" rel="noopener noreferrer">
							Google My Business
						</a>
						<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={siteConfig.listings.bingPlaces} target="_blank" rel="noopener noreferrer">
							Bing Places
						</a>
					</nav>
				</div>

				<div class="flex flex-col gap-4">
					<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
						{i18n.t.footer.onlinePresence}
					</span>
					<nav class="flex flex-col gap-2">
						<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={siteConfig.onlinePresence.medium} target="_blank" rel="noopener noreferrer">
							Medium
						</a>
						<a class="font-body-md text-body-md text-on-surface-variant hover:text-electric-blue hover:translate-x-1 transition-all duration-200" href={siteConfig.onlinePresence.pinterest} target="_blank" rel="noopener noreferrer">
							Pinterest
						</a>
					</nav>
				</div>
			</div>

			<!-- Col 5: More Information / Emails -->
			<div class="lg:col-span-3 flex flex-col gap-8">
				<div class="flex flex-col gap-4">
					<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
						{i18n.t.footer.moreInformation}
					</span>
					<p class="font-body-md text-body-md text-on-surface-variant">
						{i18n.t.footer.moreInfoText}
					</p>
					<p class="font-body-md text-body-md text-on-surface-variant">
						<span class="text-on-surface font-medium">{i18n.t.footer.tel}:</span>
						<a class="hover:text-electric-blue transition-colors duration-200" href={siteConfig.phoneCallUrl}>
							{siteConfig.contactPhone}
						</a>
					</p>
					<p class="font-body-md text-body-md text-on-surface-variant">
						<span class="text-on-surface font-medium">WhatsApp:</span>
						<a class="hover:text-electric-blue transition-colors duration-200" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
							{i18n.t.footer.clickToChat}
						</a>
					</p>
				</div>

				<div class="flex flex-col gap-4">
					<span class="font-label-lg text-on-surface uppercase tracking-wider mb-2">
						{i18n.t.footer.emails}
					</span>
					<div class="flex flex-col gap-3">
						<p class="font-body-md text-body-md text-on-surface-variant">
							<span class="text-on-surface font-medium">{i18n.t.footer.forHire}:</span><br />
							<a class="hover:text-electric-blue transition-colors duration-200 break-all" href="mailto:{siteConfig.emails.hire}">
								{siteConfig.emails.hire}
							</a>
						</p>
						<p class="font-body-md text-body-md text-on-surface-variant">
							<span class="text-on-surface font-medium">{i18n.t.footer.forContact}:</span><br />
							<a class="hover:text-electric-blue transition-colors duration-200 break-all" href="mailto:{siteConfig.emails.contact}">
								{siteConfig.emails.contact}
							</a>
						</p>
						<p class="font-body-md text-body-md text-on-surface-variant">
							<span class="text-on-surface font-medium">{i18n.t.footer.forLegal}:</span><br />
							<a class="hover:text-electric-blue transition-colors duration-200 break-all" href="mailto:{siteConfig.emails.legal}">
								{siteConfig.emails.legal}
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Row: Language Switcher, Copyright & Socials -->
		<div class="pt-8 border-t border-border-glass/50 flex flex-col gap-6">
			<LanguageSwitcher variant="list" />
			<div class="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
				<div class="flex flex-col items-center md:items-start gap-1">
					<span class="font-body-md text-body-md text-on-surface-variant text-sm">
						© {new Date().getFullYear()} {i18n.t.nav.brand}. {i18n.t.footer.allRightsReserved}
					</span>
					<span class="font-body-md text-body-md text-on-surface-variant text-sm">
						{i18n.t.footer.developedBy}
						<a
							class="text-on-surface underline underline-offset-4 hover:text-electric-blue transition-colors duration-200"
							href="https://hlorenzoz.com/"
							target="_blank"
							rel="noopener"
							title={i18n.t.footer.lorenzozTitle}
						>
							Lorenzoz Agency
						</a>
					</span>
				</div>
				<div class="flex items-center gap-4">
					<a
						class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary hover:text-electric-blue hover:bg-white/10 active:scale-95 transition-all duration-300"
						href="mailto:{siteConfig.emails.contact}"
						aria-label={i18n.t.footer.mailAriaLabel}
					>
						<Icon name="mail" size="20" />
					</a>
					<a
						class="flex items-center gap-1.5 px-3 py-1.5 h-10 rounded-full glass-panel hover:bg-white/10 text-on-surface hover:text-electric-blue transition-colors duration-300 font-label-sm text-xs sm:text-sm active:scale-95"
						href={siteConfig.phoneCallUrl}
						aria-label={i18n.t.footer.callAriaLabel.replace('{phone}', siteConfig.contactPhone)}
					>
						<Icon name="call" size="18" className="text-electric-blue shrink-0" />
						<span class="font-semibold whitespace-nowrap">{siteConfig.contactPhone}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	/* Default theme is dark → show the light (white) logo. */
	.brand-logo--dark {
		display: none;
	}
	:global([data-theme='light']) .brand-logo--light {
		display: none;
	}
	:global([data-theme='light']) .brand-logo--dark {
		display: block;
	}
</style>
