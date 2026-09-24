<script lang="ts">
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import LazyMount from '$lib/components/util/LazyMount.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { faqCopy, pkgCopy } from '$lib/i18n/data-copy.svelte';
	import { packages, getPriceRange, formatPrice } from '$lib/data/packages';
	import { getHomepageFaqs, buildFaqSchema } from '$lib/data/faq';
	import { getArticlePosts, getNewsPosts } from '$lib/data/blog';
	import LatestPostsRow from '$lib/components/home/LatestPostsRow.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import ImageMarquee from '$lib/components/home/ImageMarquee.svelte';
	import GoogleEmbedSection from '$lib/components/sections/GoogleEmbedSection.svelte';
	import { galleryImages } from '$lib/data/gallery';
	import coverThumbsRaw from '$lib/data/cover-thumbs.json';
	import { HERO_MOBILE, HERO_FULL, HERO_SRCSET } from '$lib/assets/hero';
	import { packageImageVariant } from '$lib/assets/package-images';
	import { afterLcp } from '$lib/utils/after-lcp';

	let { data } = $props();
	// Copy in the page language (./i18n/<locale>.ts, loaded by +page.ts)
	const copy = $derived(data.copy);

	const coverThumbs = coverThumbsRaw as Record<string, { thumb: string; srcset?: string }>;

	// Derived from the real layout tokens, not guessed:
	//   section padding  = margin-mobile 20px  (md+: margin-desktop 64px), both sides
	//   container        = max-w-container-max 1280px
	//   grid            = 1 column, 2 columns from lg (1024px), gap-gutter 32px
	const HERO_SIZES =
		'(min-width: 1280px) 624px, (min-width: 1024px) calc((100vw - 160px) / 2), (min-width: 768px) calc(100vw - 128px), calc(100vw - 40px)';

	// Split point for the two gallery marquee rows. Derived, not a hardcoded 15, so
	// adding shots to galleryImages keeps both rows balanced instead of piling every
	// new image into the second row.
	const galleryHalf = Math.ceil(galleryImages.length / 2);

	// Latest editorial content for the home rows (already sorted by publishDate desc).
	// Latest Posts excludes news to avoid overlapping with the Latest News row.
	const latestPosts = getArticlePosts().slice(0, 5);
	const latestNews = getNewsPosts().slice(0, 5);

	// Cheapest package price for the "What does it cost?" answer (derived, see CLAUDE.md §7)
	let minPrice = $derived(getPriceRange().min);

	// "At a Glance" Q&A block (answer-engine optimization). Question text rendered as <h2>.
	let overview = $derived([
		{ q: i18n.t.overview.sellQ, a: i18n.t.overview.sellA, icon: 'inventory_2' },
		{ q: i18n.t.overview.whoQ, a: i18n.t.overview.whoA, icon: 'groups' },
		{ q: i18n.t.overview.costQ, a: i18n.t.overview.costA, icon: 'sell', cost: true },
		{ q: i18n.t.overview.howQ, a: i18n.t.overview.howA, icon: 'route' }
	]);

	let openFaqIndex = $state<number | null>(null);

	// Top 5 conversion-oriented FAQs, sourced from the centralized FAQ store
	let faqs = $derived(
		getHomepageFaqs().map((item) => ({
			q: faqCopy(item).question,
			a: faqCopy(item).answer
		}))
	);

	let steps = $derived([
		{ num: '01', title: i18n.t.process.s1Title, desc: i18n.t.process.s1Desc, icon: 'package_2' },
		{ num: '02', title: i18n.t.process.s2Title, desc: i18n.t.process.s2Desc, icon: 'request_quote' },
		{ num: '03', title: i18n.t.process.s3Title, desc: i18n.t.process.s3Desc, icon: 'task_alt' },
		{ num: '04', title: i18n.t.process.s4Title, desc: i18n.t.process.s4Desc, icon: 'celebration' }
	]);

	// Per-package visual identity (icon + accent colors) for the showcase cards
	const packMeta: Record<string, { icon: string; iconBg: string; checkIconClass: string; gradient: string }> = {
		eco: { icon: 'eco', iconBg: 'bg-electric-blue/20 text-electric-blue', checkIconClass: 'text-electric-blue', gradient: 'from-electric-blue/35 via-electric-blue/10 to-surface-container' },
		wedding: { icon: 'favorite', iconBg: 'bg-secondary/20 text-secondary', checkIconClass: 'text-secondary', gradient: 'from-secondary/35 via-secondary/10 to-surface-container' },
		presentation: { icon: 'co_present', iconBg: 'bg-primary/20 text-primary', checkIconClass: 'text-primary', gradient: 'from-primary/35 via-primary/10 to-surface-container' },
		'mice-basic': { icon: 'groups', iconBg: 'bg-electric-blue/20 text-electric-blue', checkIconClass: 'text-electric-blue', gradient: 'from-electric-blue/35 via-electric-blue/10 to-surface-container' },
		'mice-full': { icon: 'business_center', iconBg: 'bg-primary/20 text-primary', checkIconClass: 'text-primary', gradient: 'from-primary/35 via-primary/10 to-surface-container' }
	};

	const fallbackMeta = { icon: 'inventory_2', iconBg: 'bg-primary/20 text-primary', checkIconClass: 'text-primary', gradient: 'from-primary/35 via-primary/10 to-surface-container' };

	// Localized featured packages (full catalog) for the unified pricing carousel
	let homepagePacks = $derived(
		packages.map((pkg) => {
			const meta = packMeta[pkg.id] ?? fallbackMeta;
			return {
				id: pkg.id,
				route: pkg.route,
				name: pkg.name,
				price: formatPrice(pkg.price, i18n.lang),
				desc: pkgCopy(pkg).desc,
				features: pkgCopy(pkg).includes.slice(0, 3), // select first 3 key specs
				icon: meta.icon,
				iconBg: meta.iconBg,
				checkIconClass: meta.checkIconClass,
				popular: pkg.popular,
				image: pkg.image,
				gradient: meta.gradient,
				borderClass: pkg.popular ? 'border border-primary/30' : ''
			};
		})
	);

	// Carousel state for the pricing showcase. Mirrors the Testimonials pattern:
	// native CSS scroll-snap with arrows that reflect overflow and disable at edges.
	let track = $state<HTMLDivElement | null>(null);
	let scrollable = $state(false);
	let atStart = $state(true);
	let atEnd = $state(false);

	// Start NON-scrollable and enable scrolling only once the browser has recorded the LCP
	// (see afterLcp). Flipping to overflow-x:auto makes the browser scroll-adjust the snap
	// container, and a scroll before the first LCP candidate stops LCP recording -> NO_LCP.
	// Mount time is NOT a safe proxy: it follows the JS clock, not the paint clock, and in
	// 3 of 40 measured runs it landed before FCP. The showcase is below the fold, and the
	// arrow buttons work meanwhile (scrollBy also scrolls an overflow:hidden container).
	let canScroll = $state(false);

	// Cached max scroll distance. scrollWidth/clientWidth only change on resize, so we
	// read them in `measure()` (ResizeObserver) and avoid touching layout on every scroll.
	let maxScroll = 0;

	function measure() {
		if (!track) return;
		maxScroll = track.scrollWidth - track.clientWidth;
		scrollable = maxScroll > 1;
		updateEdges();
	}

	// Scroll-time work: read only scrollLeft (cheap) and compare against the cached max.
	function updateEdges() {
		if (!track) return;
		atStart = track.scrollLeft <= 1;
		atEnd = track.scrollLeft >= maxScroll - 1;
	}

	function scrollByCard(direction: 1 | -1) {
		if (!track) return;
		const card = track.querySelector<HTMLElement>('[data-testid="package-card"]');
		const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
		track.scrollBy({ left: amount * direction, behavior: 'smooth' });
	}

	$effect(() => {
		if (!track) return;
		const cancelAfterLcp = afterLcp(() => {
			canScroll = true;
		});
		measure();
		const el = track;
		let raf = 0;
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				updateEdges();
			});
		};
		el.addEventListener('scroll', onScroll, { passive: true });
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => {
			cancelAfterLcp();
			el.removeEventListener('scroll', onScroll);
			ro.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<!-- SEO Head & JSON-LD Injection -->
<SeoHead
	title={copy.seo.title}
	description={copy.seo.description}
	canonicalUrl="https://malagaeventgear.com/"
	image={HERO_FULL}
	imageWidth={1024}
	imageHeight={768}
	jsonLdSchema={[buildFaqSchema(getHomepageFaqs().map(faqCopy))]}
/>

<!--
	Preload the hero <img> (the LCP element) so it starts loading before the markup is parsed.
	imagesrcset/imagesizes mirror the <img> below EXACTLY: if they drift, the preload fetches
	one variant and the <img> then fetches another, so the LCP image is downloaded twice.
-->
<svelte:head>
	<link
		rel="preload"
		as="image"
		imagesrcset={HERO_SRCSET}
		imagesizes={HERO_SIZES}
		fetchpriority="high"
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 overflow-hidden">
	<div class="absolute inset-0 z-0">
		<!--
			Decorative hero backdrop as a pure CSS gradient (no raster image). A full-viewport
			background-IMAGE was the LCP element, but PageSpeed's Chrome excludes full-viewport
			images from LCP while they still hold the "largest paint" slot, suppressing the real
			LCP (<h1>) -> NO_LCP. A gradient is not an image candidate, so the <h1> is the LCP.
		-->
		<div class="hero-bg absolute inset-0 transition-colors duration-300"></div>
		<div class="absolute inset-0 bg-gradient-to-b from-background/55 via-background/15 to-background transition-colors duration-300"></div>
	</div>
	
	<div class="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
		<div class="space-y-8 order-2 lg:order-1">
			<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-primary uppercase tracking-widest">
				{i18n.t.hero.span}
			</span>
			<h1 class="font-display-lg text-[40px] md:text-display-lg text-on-background leading-tight">
				{i18n.t.hero.titlePart1} <br />
				<!-- Solid brand color (not text-gradient) on purpose: background-clip:text with a
				     transparent fill is treated as non-contentful by Chrome and disqualifies the
				     whole <h1> as an LCP candidate, which caused NO_LCP. The gradient ran between
				     two near-identical blues, so the solid color is visually equivalent. -->
				<span class="text-electric-blue font-bold">{i18n.t.hero.titleGradient}</span> {i18n.t.hero.titlePart2}
			</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
				{i18n.t.hero.subtitle}
			</p>
			<div class="flex flex-wrap gap-4 pt-4">
				<a class="bg-electric-blue-strong text-white px-8 py-4 rounded-full font-label-lg hover:shadow-[0_0_30px_rgba(77,140,255,0.3)] hover:-translate-y-0.5 transition-all active:scale-95 duration-200" href={i18n.href('/packages/')}>
					{i18n.t.hero.viewPricing}
				</a>
				<a class="glass-panel text-on-surface px-8 py-4 rounded-full font-label-lg hover:bg-on-surface/10 hover:-translate-y-0.5 transition-all flex items-center gap-2 active:scale-95 duration-200" href={i18n.href('/contact/')}>
					{i18n.t.hero.contactUs} <Icon name="arrow_forward" size="20" />
				</a>
			</div>
		</div>

		<!--
			Hero photo as a real, bounded <img> (not a full-viewport background). This is the LCP
			element on purpose: PageSpeed's Chrome reliably picks a real, eager, above-the-fold
			image as the LCP (same pattern as the package cards on /packages/), whereas a
			full-viewport background image was excluded from LCP candidacy -> NO_LCP. `order-1`
			keeps it above the fold on mobile so it qualifies as the LCP there too.
		-->
		<div class="order-1 lg:order-2">
			<!--
				One <img> with srcset, not <picture> with art direction: the mobile and desktop
				files are the SAME photograph at different sizes (verified pixel by pixel), so
				there is nothing to art direct. A width descriptor set lets the browser pick by
				real viewport AND real device pixel ratio, which a media query cannot see.
			-->
			<img
				src={HERO_MOBILE}
				srcset={HERO_SRCSET}
				sizes={HERO_SIZES}
				alt={copy.hero.imageAlt}
				width="700"
				height="525"
				loading="eager"
				fetchpriority="high"
				decoding="async"
				class="w-full aspect-4/3 object-cover rounded-2xl ambient-shadow border border-border-glass"
			/>
		</div>
	</div>
</section>

<!-- At a Glance Section (answer-engine optimization: questions as h2) -->
<section class="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
	<div class="text-center mb-16">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{i18n.t.overview.badge}
		</span>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each overview as item}
			<div class="glass-card p-8 rounded-xl ambient-shadow hover:-translate-y-1 transition-transform duration-300">
				<div class="flex items-center gap-4 mb-4">
					<div class="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center shrink-0">
						<Icon name={item.icon} className="text-electric-blue" />
					</div>
					<h2 class="font-headline-md text-[22px] text-on-surface">{item.q}</h2>
				</div>
				<p class="font-body-md text-body-md text-on-surface-variant">
					{#if item.cost}
						<strong class="text-on-surface">{i18n.t.overview.costFrom} {formatPrice(minPrice, i18n.lang)} {i18n.t.pricing.plusVat}.</strong>
					{/if}
					{item.a}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- Impact in Numbers Section -->
<section class="py-24 px-margin-mobile md:px-margin-desktop relative border-y border-border-glass bg-surface-container-low transition-colors duration-300">
	<div class="max-w-container-max mx-auto text-center">
		<h2 class="font-headline-lg text-[32px] md:text-headline-lg mb-16 text-on-background">{i18n.t.impact.title}</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="glass-card p-8 rounded-xl relative overflow-hidden group reveal active is-revealed">
				<div class="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				<div class="font-display-lg text-display-lg text-gradient mb-2">27+</div>
				<div class="font-label-lg text-on-surface-variant tracking-widest uppercase">{i18n.t.impact.years}</div>
			</div>
			
			<div class="glass-card p-8 rounded-xl relative overflow-hidden group reveal active is-revealed">
				<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				<div class="font-display-lg text-display-lg text-gradient mb-2">2,500+</div>
				<div class="font-label-lg text-on-surface-variant tracking-widest uppercase">{i18n.t.impact.clients}</div>
			</div>
			
			<div class="glass-card p-8 rounded-xl relative overflow-hidden group reveal active is-revealed">
				<div class="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				<div class="font-display-lg text-display-lg text-gradient mb-2">+95%</div>
				<div class="font-label-lg text-on-surface-variant tracking-widest uppercase">{i18n.t.impact.satisfaction}</div>
			</div>
		</div>
	</div>
</section>

<!-- Gallery Marquee Section -->
<section class="py-24 overflow-hidden relative">
	<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-12">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{i18n.t.gallery.titleHome}
		</span>
	</div>

	<div class="space-y-4">
		<ImageMarquee images={galleryImages.slice(0, galleryHalf)} speed="normal" direction="left" />
		<ImageMarquee images={galleryImages.slice(galleryHalf)} speed="normal" direction="right" />
	</div>
</section>

<!-- Services Section (Bento Grid) -->
<section class="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
	<div class="text-center mb-20">
		<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
			{i18n.t.categories.badge}
		</span>
		<h2 class="font-headline-lg text-[32px] md:text-headline-lg text-on-background">{i18n.t.categories.title}</h2>
	</div>
	
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
		<!-- Sound System (Large) -->
		<div class="glass-panel rounded-2xl overflow-hidden relative group md:col-span-2 md:row-span-2 reveal active is-revealed">
			<div class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
			<img
				alt={copy.categories.soundImageAlt}
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" 
				src={coverThumbs['https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled.webp']?.thumb ?? 'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled.webp'}
				srcset={coverThumbs['https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled.webp']?.srcset}
				sizes="(max-width: 767px) 400px, 600px"
				loading="lazy"
				decoding="async"
				width="600"
				height="400"
			/>
			<div class="absolute bottom-0 left-0 p-8 z-20 w-full">
				<div class="w-12 h-12 rounded-full glass-panel flex items-center justify-center mb-4 backdrop-blur-md text-on-surface">
					<Icon name="speaker" />
				</div>
				<h3 class="font-headline-md text-headline-md text-on-surface mb-2">{i18n.t.categories.soundTitle}</h3>
				<p class="font-body-md text-on-surface-variant max-w-md">
					{i18n.t.categories.soundText}
				</p>
			</div>
		</div>

		<!-- Lighting -->
		<div class="glass-panel rounded-2xl overflow-hidden relative group reveal active is-revealed">
			<div class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
			<img
				alt={copy.categories.lightImageAlt}
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" 
				src={coverThumbs['https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled.webp']?.thumb ?? 'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled.webp'}
				srcset={coverThumbs['https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled.webp']?.srcset}
				sizes="(max-width: 767px) 400px, 600px"
				loading="lazy"
				decoding="async"
				width="600"
				height="400"
			/>
			<div class="absolute bottom-0 left-0 p-6 z-20 w-full">
				<div class="w-10 h-10 rounded-full glass-panel flex items-center justify-center mb-3 backdrop-blur-md text-on-surface">
					<Icon name="lightbulb" />
				</div>
				<h3 class="font-headline-md text-[24px] text-on-surface mb-1">{i18n.t.categories.lightTitle}</h3>
				<p class="font-body-md text-sm text-on-surface-variant">{i18n.t.categories.lightText}</p>
			</div>
		</div>

		<!-- Visuals/Projectors -->
		<div class="glass-panel rounded-2xl overflow-hidden relative group reveal active is-revealed">
			<div class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-background via-background/70 to-transparent z-10"></div>
			<img
				alt={copy.categories.visualImageAlt}
				class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" 
				src={coverThumbs['https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled.webp']?.thumb ?? 'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled.webp'}
				srcset={coverThumbs['https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled.webp']?.srcset}
				sizes="(max-width: 767px) 400px, 600px"
				loading="lazy"
				decoding="async"
				width="600"
				height="400"
			/>
			<div class="absolute bottom-0 left-0 p-6 z-20 w-full">
				<div class="w-10 h-10 rounded-full glass-panel flex items-center justify-center mb-3 backdrop-blur-md text-on-surface">
					<Icon name="videocam" />
				</div>
				<h3 class="font-headline-md text-[24px] text-on-surface mb-1">{i18n.t.categories.visualTitle}</h3>
				<p class="font-body-md text-sm text-on-surface-variant">{i18n.t.categories.visualText}</p>
			</div>
		</div>

		<!-- Special Effects -->
		<div class="glass-panel rounded-2xl overflow-hidden relative group md:col-span-3 h-[200px] flex items-center px-8 reveal active is-revealed">
			<div class="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-electric-blue/10 to-transparent opacity-50"></div>
			<div class="relative z-20 flex w-full justify-between items-center">
				<div>
					<h3 class="font-headline-md text-headline-md text-on-surface mb-2">{i18n.t.categories.fxTitle}</h3>
					<p class="font-body-md text-on-surface-variant max-w-lg">
						{i18n.t.categories.fxText}
					</p>
				</div>
				<a
					href={i18n.href('/equipment/')}
					class="hidden md:flex w-16 h-16 rounded-full border border-border-glass items-center justify-center hover:bg-on-surface/5 active:scale-90 transition-all duration-300 text-on-surface"
				>
					<Icon name="arrow_forward" size="32" className="group-hover:translate-x-1 transition-transform" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="py-24 px-margin-mobile md:px-margin-desktop relative border-y border-border-glass bg-surface-container-low transition-colors duration-300">
	<div class="max-w-container-max mx-auto">
		<div class="text-center mb-16">
			<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-primary uppercase tracking-widest mb-4">
				{i18n.t.process.badge}
			</span>
			<h2 class="font-headline-lg text-[32px] md:text-headline-lg text-on-background">{i18n.t.process.title}</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
			<div class="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border-glass to-transparent"></div>
			{#each steps as step, i}
				<div class="flex flex-col items-center text-center reveal active is-revealed" style="transition-delay: {i * 0.1}s">
					<div class="w-16 h-16 rounded-full glass-panel flex items-center justify-center mb-4 relative z-10 border border-border-glass">
						<Icon name={step.icon} className="text-electric-blue" />
					</div>
					<div class="font-bold text-[40px] text-gradient opacity-30 mb-2 leading-none">{step.num}</div>
					<h3 class="font-headline-sm text-[18px] text-on-surface mb-2">{step.title}</h3>
					<p class="font-body-md text-sm text-on-surface-variant">{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Pricing Preview Section -->
<section class="py-32 px-margin-mobile md:px-margin-desktop relative border-b border-border-glass bg-surface-container-low transition-colors duration-300">
	<div class="max-w-container-max mx-auto">
		<div class="text-center mb-16">
			<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-electric-blue uppercase tracking-widest mb-4">
				{i18n.t.pricingPreview.badge}
			</span>
			<h2 class="font-headline-lg text-[32px] md:text-headline-lg text-on-background mb-4">{i18n.t.pricingPreview.title}</h2>
			<p class="font-body-lg text-on-surface-variant max-w-lg mx-auto">{i18n.t.pricingPreview.subtitle}</p>
		</div>

		<div class="relative mb-12">
			<!-- snap-proximity (not mandatory): mandatory triggers a forced snap-scroll on initial
			     layout that suppressed Largest Contentful Paint on the home (NO_LCP). See LatestPostsRow. -->
			<div
				bind:this={track}
				data-testid="packages-carousel-track"
				class="flex gap-6 {canScroll ? 'overflow-x-auto' : 'overflow-x-hidden'} snap-x snap-proximity scroll-smooth pb-4 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden {scrollable ? '' : 'justify-center'}"
			>
				{#each homepagePacks as pack (pack.id)}
					<div
						data-testid="package-card"
						class="group/card snap-start shrink-0 w-[320px] sm:w-[360px] glass-card rounded-3xl ambient-shadow reveal active is-revealed flex flex-col relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 {pack.borderClass}"
					>
						<!-- Visual header with image and gradient -->
						<div class="relative h-40 overflow-hidden bg-linear-to-br {pack.gradient}">
							{#if pack.image}
								{@const mobileImage = packageImageVariant(pack.image, 'mobile')}
								{@const desktopImage = packageImageVariant(pack.image, 'desktop')}
								<picture class="absolute inset-0 w-full h-full">
									<source media="(max-width: 767px)" srcset={mobileImage} type="image/webp" />
									<source media="(min-width: 768px)" srcset={desktopImage} type="image/webp" />
									<img
										src={desktopImage}
										alt={pack.name}
										loading="lazy"
										class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:scale-105"
										width="800"
										height="380"
									/>
								</picture>
								<div class="absolute inset-0 bg-linear-to-t from-surface-container via-surface-container/30 to-transparent pointer-events-none"></div>
							{/if}

							<!-- Icon chip -->
							<div class="absolute bottom-3 left-6 w-11 h-11 rounded-xl glass-panel flex items-center justify-center {pack.iconBg} shadow-md">
								<Icon name={pack.icon} size="22" />
							</div>

							<!-- Most popular badge -->
							{#if pack.popular}
								<div class="absolute top-3 right-4 bg-electric-blue-strong text-white px-2.5 py-0.5 rounded-full font-label-sm text-[10px] tracking-wider uppercase shadow-md shadow-electric-blue/20">
									{i18n.t.pricing.mostPopular}
								</div>
							{/if}
						</div>

						<!-- Body Content with padding -->
						<div class="flex flex-col grow p-6">
							<h3 class="font-headline-md text-[22px] text-on-surface mb-1 hover:text-electric-blue transition-colors">
								<a href={i18n.href(pack.route)}>{pack.name}</a>
							</h3>
							<div class="text-[28px] font-bold mb-4 {pack.popular ? '' : 'text-on-surface'}">
								{#if pack.popular}
									<span class="text-gradient">{pack.price}</span>
								{:else}
									<span>{pack.price}</span>
								{/if}
								<span class="font-body-sm text-sm text-on-surface-variant">{i18n.t.pricing.plusVat}</span>
							</div>
							<p class="font-body-md text-on-surface-variant text-sm mb-6 line-clamp-2">{pack.desc}</p>
							<ul class="space-y-2 mb-8 flex-1">
								{#each pack.features as feature}
									<li class="flex items-center gap-2 text-sm text-on-surface-variant font-body-md">
										<Icon name="check" size="18" className={pack.checkIconClass} />
										{feature}
									</li>
								{/each}
							</ul>
							<a href={i18n.href(pack.route)} class="glass-panel text-on-surface px-6 py-3 rounded-full font-label-lg text-center hover:bg-on-surface/10 hover:-translate-y-0.5 transition-all active:scale-95 duration-200">
								{i18n.t.packages.enquire}
							</a>
						</div>
					</div>
				{/each}
			</div>

			<!-- Nav arrows only appear when the track actually overflows -->
			{#if scrollable}
				<div class="flex justify-center gap-3 mt-6">
					<button
						data-testid="packages-carousel-prev"
						type="button"
						aria-label={i18n.t.testimonials.prevAria}
						disabled={atStart}
						onclick={() => scrollByCard(-1)}
						class="w-11 h-11 rounded-full glass-panel border border-border-glass flex items-center justify-center text-on-surface hover:bg-on-surface/10 active:scale-90 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-electric-blue disabled:opacity-30 disabled:pointer-events-none"
					>
						<Icon name="chevron_left" />
					</button>
					<button
						data-testid="packages-carousel-next"
						type="button"
						aria-label={i18n.t.testimonials.nextAria}
						disabled={atEnd}
						onclick={() => scrollByCard(1)}
						class="w-11 h-11 rounded-full glass-panel border border-border-glass flex items-center justify-center text-on-surface hover:bg-on-surface/10 active:scale-90 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-electric-blue disabled:opacity-30 disabled:pointer-events-none"
					>
						<Icon name="chevron_right" />
					</button>
				</div>
			{/if}
		</div>

		<div class="text-center">
			<a href={i18n.href('/packages/')} class="inline-flex items-center gap-2 bg-electric-blue-strong text-white px-10 py-4 rounded-full font-label-lg hover:shadow-[0_0_30px_rgba(77,140,255,0.3)] hover:-translate-y-0.5 transition-all active:scale-95 duration-200">
				{i18n.t.pricingPreview.viewAll}
				<Icon name="arrow_forward" size="20" />
			</a>
		</div>
	</div>
</section>

<!-- Testimonials Section (Google Reviews).
     Below the fold: lazy-mounted + code-split (dynamic import) so its carousel JS and
     DOM stay out of the initial bundle and the critical render window. -->
<LazyMount minHeight="760px">
	{#await import('$lib/components/testimonials/Testimonials.svelte') then { default: Testimonials }}
		<Testimonials />
	{/await}
</LazyMount>

<!-- Google Location / Share Section -->
<GoogleEmbedSection />

<!-- FAQ Section -->
<section class="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low transition-colors duration-300">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-16">
			<span class="inline-block px-4 py-2 rounded-full glass-panel font-label-sm text-primary uppercase tracking-widest mb-4">
				{i18n.t.faq.badge}
			</span>
			<h2 class="font-headline-lg text-[32px] md:text-headline-lg text-on-background">{i18n.t.faq.title}</h2>
		</div>

		<div class="space-y-4">
			{#each faqs as faq, i}
				{@const isOpen = openFaqIndex === i}
				<div class="glass-panel rounded-xl overflow-hidden transition-colors duration-300">
					<button
						onclick={() => openFaqIndex = openFaqIndex === i ? null : i}
						class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors group"
						aria-expanded={isOpen}
					>
						<span class="font-body-lg text-body-lg font-semibold group-hover:text-electric-blue transition-colors text-on-surface">
							{faq.q}
						</span>
						<span class="text-on-surface-variant transition-transform duration-300 {isOpen ? 'rotate-180' : ''}">
							{#if isOpen}
								<Icon name="remove" />
							{:else}
								<Icon name="add" />
							{/if}
						</span>
					</button>
					{#if isOpen}
						<div class="px-6 pb-5 text-on-surface-variant font-body-md text-body-md border-t border-border-glass/30 pt-3">
							<p>{faq.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="text-center mt-12">
			<p class="text-on-surface-variant font-body-md mb-4">
				{copy.faqSection.moreQuestions}
			</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<a href={i18n.href('/faq/')} class="inline-flex items-center gap-2 bg-electric-blue-strong text-white px-8 py-3 rounded-full font-label-lg hover:shadow-[0_0_30px_rgba(77,140,255,0.3)] hover:-translate-y-0.5 transition-all active:scale-95 duration-200">
					{copy.faqSection.seeAllFaqs}
					<Icon name="arrow_forward" size="20" />
				</a>
				<a href={i18n.href('/contact/')} class="glass-panel text-on-surface px-8 py-3 rounded-full font-label-lg hover:bg-on-surface/10 hover:-translate-y-0.5 transition-all active:scale-95 duration-200">
					{i18n.t.contact.title}
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Post rows only where this language has posts: never English titles on a translated page -->
{#if i18n.postsPublished}
<!-- Latest Posts (non-news articles) -->
<LatestPostsRow
	title={copy.posts.latestTitle}
	posts={latestPosts}
	viewAllHref={i18n.href('/blog/')}
	viewAllLabel={copy.posts.latestViewAll}
/>

<!-- Latest News -->
<LatestPostsRow
	title={copy.posts.newsTitle}
	posts={latestNews}
	viewAllHref={i18n.href('/blog/category/news/')}
	viewAllLabel={copy.posts.newsViewAll}
/>
{/if}
