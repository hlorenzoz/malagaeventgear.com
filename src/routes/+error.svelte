<script lang="ts">
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n.svelte';

	const status = $derived($page.status);
	const isNotFound = $derived(status === 404);

	const heading = $derived(isNotFound ? i18n.t.errorPage.notFoundHeading : i18n.t.errorPage.genericHeading);
	const body = $derived(isNotFound ? i18n.t.errorPage.notFoundBody : i18n.t.errorPage.genericBody);
</script>

<svelte:head>
	<title>{status} · {i18n.t.nav.brand}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="min-h-screen flex items-center justify-center bg-surface px-margin-mobile py-24 text-on-surface">
	<div class="glass-panel relative max-w-xl w-full overflow-hidden rounded-2xl p-8 md:p-12 text-center">
		<div class="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-electric-blue/10 blur-3xl"></div>

		<p class="font-headline-lg text-headline-lg text-electric-blue">{status}</p>
		<h1 class="font-headline-md text-headline-md mt-2 text-on-surface">{heading}</h1>
		<p class="font-body-md text-body-md mt-4 text-on-surface-variant">{body}</p>

		<div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
			<a
				href={i18n.href('/contact/')}
				class="rounded-full border border-border-glass bg-on-surface/5 px-6 py-3 font-label-lg text-on-surface transition-colors hover:bg-on-surface/10"
			>
				{i18n.t.errorPage.contactUs}
			</a>
			<a
				href={i18n.href('/')}
				class="rounded-full bg-electric-blue-strong px-6 py-3 font-label-lg uppercase tracking-wider text-white transition-all hover:shadow-[0_0_24px_rgba(77,140,255,0.45)] active:scale-95"
			>
				{i18n.t.errorPage.backHome}
			</a>
		</div>
	</div>
</main>
