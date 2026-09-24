<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';
	import { packages, formatPrice } from '$lib/data/packages';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	// Nombres y precios derivados del catálogo (CLAUDE.md §7). Estas dos listas
	// hardcodeaban los 5 packs con su precio, duplicados en el bloque EN y en el ES:
	// diez sitios donde un cambio de tarifa se olvidaba.
	let packageLinks = $derived(
		packages.map((pkg) => ({
			href: i18n.href(pkg.route),
			icon: pkg.navIcon,
			label: `${pkg.name} (${formatPrice(pkg.price, i18n.lang)})`
		}))
	);

	let sitemapSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${i18n.absolute('/sitemap/')}#webpage`,
		'url': i18n.absolute('/sitemap/'),
		'inLanguage': LOCALE_META[i18n.lang].htmlLang,
		'name': copy.seo.title,
		'description': copy.seo.description
	});
</script>

<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/sitemap/"
	jsonLdSchema={sitemapSchema}
/>

<div class="relative w-full py-20 px-margin-mobile md:px-margin-desktop z-10 max-w-container-max mx-auto animate-fade-in">
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

	<!-- Site Directory -->
	<section class="mb-24">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Primary Portals -->
			<div class="glass-panel rounded-xl p-6 flex flex-col gap-4">
				<h2 class="font-headline-sm text-headline-sm text-electric-blue flex items-center gap-2">
					<Icon name="explore" size="22" />
					{copy.portals.heading}
				</h2>
				<nav class="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
					<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/')}>
						<Icon name="home" size="18" />
						{copy.portals.home}
					</a>
					<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/packages/')}>
						<Icon name="payments" size="18" />
						{copy.portals.pricing}
					</a>
					<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/equipment/')}>
						<Icon name="grid_view" size="18" />
						{copy.portals.equipment}
					</a>
					<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/contact/')}>
						<Icon name="mail" size="18" />
						{copy.portals.contact}
					</a>
				</nav>
			</div>

			<!-- Event Packs -->
			<div class="glass-panel rounded-xl p-6 flex flex-col gap-4">
				<h2 class="font-headline-sm text-headline-sm text-electric-blue flex items-center gap-2">
					<Icon name="inventory_2" size="22" />
					{copy.packages.heading}
				</h2>
				<nav class="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
					{#each packageLinks as link (link.href)}
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={link.href}>
							<Icon name={link.icon} size="18" />
							{link.label}
						</a>
					{/each}
				</nav>
			</div>

			<!-- Legal & About Us -->
			<div class="glass-panel rounded-xl p-6 flex flex-col gap-4 md:col-span-2">
				<h2 class="font-headline-sm text-headline-sm text-electric-blue flex items-center gap-2">
					<Icon name="gavel" size="22" />
					{copy.legal.heading}
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<nav class="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/about-us/')}>
							<Icon name="info" size="18" />
							{copy.legal.about}
						</a>
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/meet-the-team/')}>
							<Icon name="groups" size="18" />
							{copy.legal.team}
						</a>
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/faq/')}>
							<Icon name="help" size="18" />
							{copy.legal.faq}
						</a>
					</nav>
					<nav class="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant">
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/terms-of-service/')}>
							<Icon name="policy" size="18" />
							{copy.legal.terms}
						</a>
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/privacy-policy/')}>
							<Icon name="shield" size="18" />
							{copy.legal.privacy}
						</a>
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/cookie-policy/')}>
							<Icon name="cookie" size="18" />
							{copy.legal.cookies}
						</a>
						<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/gdpr/')}>
							<Icon name="verified_user" size="18" />
							{copy.legal.gdpr}
						</a>
					</nav>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Blog Section ──────────────────────────────────────────────────────── -->
	<section class="mb-24">
		<div class="flex items-center gap-3 border-b border-border-glass pb-4 mb-8">
			<Icon name="article" size="32" className="text-electric-blue" />
			<h2 class="font-headline-md text-headline-md text-on-surface">{copy.blog.heading}</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Categories -->
			<div class="glass-panel rounded-xl p-6 flex flex-col gap-4">
				<h3 class="font-headline-sm text-headline-sm text-electric-blue flex items-center gap-2">
					<Icon name="label" size="22" />
					<a href={i18n.href('/blog/categories/')} class="hover:underline">
						{copy.blog.categoriesHeading}
					</a>
				</h3>
				<nav class="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
					<a class="hover:text-electric-blue transition-colors flex items-center gap-2" href={i18n.href('/blog/')}>
						<Icon name="rss_feed" size="18" />
						{copy.blog.allPosts}
					</a>
					{#each data.categories as cat (cat.slug)}
						<a
							class="hover:text-electric-blue transition-colors flex items-center gap-2"
							href={i18n.href(`/blog/category/${cat.slug}/`)}
						>
							<Icon name="folder" size="18" />
							{cat.name}
							<span class="text-xs opacity-60">({cat.count})</span>
						</a>
					{/each}
				</nav>
			</div>

			<!-- Authors -->
			<div class="glass-panel rounded-xl p-6 flex flex-col gap-4">
				<h3 class="font-headline-sm text-headline-sm text-electric-blue flex items-center gap-2">
					<Icon name="person" size="22" />
					{copy.blog.authorsHeading}
				</h3>
				<nav class="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
					{#each data.authors as author (author.slug)}
						<a
							class="hover:text-electric-blue transition-colors flex items-center gap-2"
							href={i18n.href(`/blog/author/${author.slug}/`)}
						>
							<Icon name="account_circle" size="18" />
							{author.name}
							<span class="text-xs opacity-60">({author.count})</span>
						</a>
					{/each}
				</nav>
			</div>

			<!-- Recent Posts -->
			<div class="glass-panel rounded-xl p-6 flex flex-col gap-4">
				<h3 class="font-headline-sm text-headline-sm text-electric-blue flex items-center gap-2">
					<Icon name="history" size="22" />
					{copy.blog.recentHeading}
				</h3>
				<nav class="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
					{#each data.posts as post (post.slug)}
						<a
							class="hover:text-electric-blue transition-colors text-sm leading-snug"
							href={i18n.href(`/blog/${post.slug}/`)}
						>
							{post.title}
						</a>
					{/each}
					<a
						class="hover:text-electric-blue transition-colors flex items-center gap-1 text-sm font-semibold mt-2"
						href={i18n.href('/blog/')}
					>
						{copy.blog.viewAll}
					</a>
				</nav>
			</div>
		</div>
	</section>
</div>
