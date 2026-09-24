<script lang="ts">
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n.svelte';
	import { LOCALE_META } from '$lib/i18n/locales';
	import { encodePath } from '$lib/i18n/locale-path';
	import type { Alternate } from '$lib/i18n/router';
	import Icon from './Icon.svelte';

	// Plain links to the published versions of THIS page (Google: let users switch, never
	// redirect automatically). Language names in their own language, no flags. These links are
	// also how the prerender crawler discovers every localized page.
	//
	// `menu`: compact dropdown for the navbar. `list`: every language visible as links, for the
	// footer. Both render nothing while the page exists in a single language.
	let { variant = 'menu' }: { variant?: 'menu' | 'list' } = $props();

	const alternates = $derived((page.data?.alternates ?? []) as Alternate[]);
	const current = $derived(LOCALE_META[i18n.lang]);

	let menu = $state<HTMLDetailsElement>();
</script>

{#if alternates.length > 1}
	{#if variant === 'menu'}
		<details bind:this={menu} class="relative group">
			<summary
				class="list-none [&::-webkit-details-marker]:hidden flex items-center justify-center gap-1.5 px-3 py-1.5 h-10 rounded-full glass-panel hover:bg-white/10 text-on-surface font-label-sm text-sm hover:text-electric-blue transition-colors duration-300 cursor-pointer select-none"
				aria-label="{i18n.t.nav.language}: {current.nativeName}"
			>
				<Icon name="website" size="16" className="shrink-0" />
				<span lang={current.htmlLang}>{current.short}</span>
			</summary>
			<ul
				class="absolute right-0 mt-2 min-w-48 max-h-[70vh] overflow-y-auto rounded-2xl border border-border-glass bg-background/95 backdrop-blur-2xl shadow-2xl py-2 z-50"
			>
				{#each alternates as alt (alt.locale)}
					{@const meta = LOCALE_META[alt.locale]}
					{@const active = alt.locale === i18n.lang}
					<li>
						<a
							href={encodePath(alt.path)}
							hreflang={meta.htmlLang}
							lang={meta.htmlLang}
							aria-current={active ? 'page' : undefined}
							onclick={() => menu && (menu.open = false)}
							class="flex items-center justify-between gap-3 px-4 py-2.5 min-h-11 text-sm transition-colors {active
								? 'text-electric-blue font-bold'
								: 'text-on-surface hover:bg-white/5 hover:text-electric-blue'}"
						>
							{meta.nativeName}
							{#if active}<Icon name="check" size="16" className="shrink-0" />{/if}
						</a>
					</li>
				{/each}
			</ul>
		</details>
	{:else}
		<nav aria-label={i18n.t.nav.language} data-testid="footer-language-switcher">
			<ul class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
				<li aria-hidden="true"><Icon name="website" size="16" className="text-electric-blue" /></li>
				{#each alternates as alt (alt.locale)}
					{@const meta = LOCALE_META[alt.locale]}
					{@const active = alt.locale === i18n.lang}
					<li>
						<a
							href={encodePath(alt.path)}
							hreflang={meta.htmlLang}
							lang={meta.htmlLang}
							aria-current={active ? 'page' : undefined}
							class="inline-flex items-center min-h-11 transition-colors {active
								? 'text-electric-blue font-bold'
								: 'text-on-surface-variant hover:text-electric-blue'}"
						>
							{meta.nativeName}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
{/if}
