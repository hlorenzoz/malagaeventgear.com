<script lang="ts">
	import { onMount } from 'svelte';
	import SeoHead from '$lib/components/seo/SeoHead.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { siteConfig } from '$lib/data/site';
	import { dateOnly } from '$lib/data/site-map';
	import { byGscTier } from '$lib/utils/map-gsc-sort';
	import { needsIndexNow as computeNeedsIndexNow } from '$lib/utils/map-indexnow-eligibility';

	// URL absoluta lista para pegar en cualquier lado.
	const abs = (path: string) => `${siteConfig.url}${path}`;

	let { data } = $props();
	const view = $derived(data.view);

	// --- Filtro en vivo sobre todos los nodos con enlace ---
	let query = $state('');
	let q = $derived(query.trim().toLowerCase());
	const match = (s: string) => !q || s.toLowerCase().includes(q);

	// --- Marca manual "copié esta URL para reenviarla a GSC" (localStorage, sin backend:
	// Google no tiene API aca, así que "enviado" solo puede ser una señal manual). Reordena
	// solo los kids de cada silo: arriba los actualizados-sin-marcar, luego los nunca
	// actualizados, al final los actualizados-y-ya-marcados.
	const GSC_STORAGE_KEY = 'meg-map-gsc-marked';
	let gscMarked = $state<Record<string, string>>({});
	function markGscHandled(url: string) {
		gscMarked = { ...gscMarked, [url]: new Date().toISOString() };
		try {
			localStorage.setItem(GSC_STORAGE_KEY, JSON.stringify(gscMarked));
		} catch {
			// private browsing / storage disabled — the reorder just won't persist
		}
	}

	let filteredSilos = $derived(
		view.silos.map((s) => ({
			...s,
			kids: s.kids.filter((k) => match(k.key)).sort(byGscTier(gscMarked))
		}))
	);
	let filteredNews = $derived(view.news.filter((p) => match(p.key)));
	let filteredStandalone = $derived(view.standalone.filter((p) => match(p.key)));
	let filteredPackages = $derived(view.packages.filter((p) => match(p.name)));
	let filteredCore = $derived(view.corePages.filter((p) => match(p.label)));
	let filteredLegal = $derived(view.legalPages.filter((p) => match(p.label)));
	let filteredCategories = $derived(view.categories.filter((c) => match(c.name)));
	let filteredAuthors = $derived(view.authors.filter((a) => match(a.name)));

	let shownCount = $derived(
		filteredSilos.reduce((n, s) => n + s.kids.length, 0) +
			filteredNews.length +
			filteredStandalone.length +
			filteredPackages.length +
			filteredCore.length +
			filteredLegal.length +
			view.utilityPages.filter((p) => match(p.label)).length +
			filteredCategories.length +
			filteredAuthors.length
	);

	// --- Mindmap Mermaid (carga diferida, sólo en esta ruta) ---
	let graphEl: HTMLDivElement;
	let graphState = $state<'loading' | 'ready' | 'error'>('loading');
	let renderSeq = 0;

	let copied = $state(false);
	async function copySource() {
		try {
			await navigator.clipboard.writeText(view.mermaid);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	}

	// --- Copiar una keyword al portapapeles (hover reveal) ---
	let copiedKey = $state<string | null>(null);
	let keyTimer: ReturnType<typeof setTimeout>;
	async function copyKey(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedKey = text;
			clearTimeout(keyTimer);
			keyTimer = setTimeout(() => (copiedKey = null), 1400);
		} catch {
			copiedKey = null;
		}
	}

	// --- Copiar la keyword del pilar + todas las de sus supporting posts ---
	// Usa view.silos (set COMPLETO), no el filtrado por búsqueda.
	let copiedSilo = $state<string | null>(null);
	let siloTimer: ReturnType<typeof setTimeout>;
	async function copyAllKeywords(url: string) {
		const silo = view.silos.find((s) => s.url === url);
		if (!silo) return;
		const text = [silo.key, ...silo.kids.map((k) => k.key)].join('\n');
		try {
			await navigator.clipboard.writeText(text);
			copiedSilo = url;
			clearTimeout(siloTimer);
			siloTimer = setTimeout(() => (copiedSilo = null), 1600);
		} catch {
			copiedSilo = null;
		}
	}

	// --- IndexNow (Bing/Yandex) — botón por nodo con `updated`, D1 vía /api/indexnow ---
	// url absoluta -> `contentUpdatedAt` de la última sumisión exitosa.
	let indexnowSubmissions = $state<Record<string, string>>({});
	function needsIndexNow(url: string, updated?: string): boolean {
		return computeNeedsIndexNow(new Date(), updated, indexnowSubmissions[abs(url)]);
	}

	let submitting = $state<string | null>(null);
	async function submitIndexNow(url: string, updated: string) {
		const key = abs(url);
		submitting = key;
		try {
			const res = await fetch('/api/indexnow', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: key })
			});
			if (res.ok) {
				indexnowSubmissions = { ...indexnowSubmissions, [key]: updated };
			}
		} catch {
			// network error — button stays visible, user can retry
		} finally {
			submitting = null;
		}
	}

	onMount(() => {
		let cancelled = false;

		try {
			const raw = localStorage.getItem(GSC_STORAGE_KEY);
			if (raw) gscMarked = JSON.parse(raw);
		} catch {
			// private browsing / storage disabled — no persisted marks to restore
		}

		type IndexNowGetResponse = {
			ok: boolean;
			submissions?: { url: string; submittedAt: string; contentUpdatedAt: string }[];
		};
		(async () => {
			const res = await fetch('/api/indexnow');
			if (!res.ok) return;
			const data = (await res.json()) as IndexNowGetResponse;
			if (!data.ok || !data.submissions) return;
			const map: Record<string, string> = {};
			for (const s of data.submissions) map[s.url] = s.contentUpdatedAt;
			indexnowSubmissions = map;
		})().catch(() => {
			// no submissions loaded — every eligible button just starts visible
		});

		async function render() {
			graphState = 'loading';
			try {
				const mermaid = (await import('mermaid')).default;
				const isLight = document.documentElement.getAttribute('data-theme') === 'light';
				mermaid.initialize({
					startOnLoad: false,
					theme: isLight ? 'default' : 'dark',
					securityLevel: 'strict',
					fontFamily: 'inherit'
				});
				const id = `site-mindmap-${++renderSeq}`;
				const { svg } = await mermaid.render(id, view.mermaid);
				if (cancelled || !graphEl) return;
				graphEl.innerHTML = svg;
				graphState = 'ready';
			} catch {
				if (!cancelled) graphState = 'error';
			}
		}

		render();

		// Re-render cuando el usuario cambia el tema (data-theme en <html>).
		const observer = new MutationObserver((muts) => {
			if (muts.some((m) => m.attributeName === 'data-theme')) render();
		});
		observer.observe(document.documentElement, { attributes: true });

		return () => {
			cancelled = true;
			observer.disconnect();
		};
	});

	const title =
		i18n.lang === 'es'
			? 'Mapa del Sitio (grafo) - Malaga Event Gear'
			: 'Site Map (graph) - Malaga Event Gear';
	const description =
		i18n.lang === 'es'
			? 'Mapa interno del sitio completo de Malaga Event Gear: páginas, paquetes y el reverse silo del blog como mindmap.'
			: 'Internal full site map of Malaga Event Gear: pages, packages and the blog reverse silo as a mindmap.';
</script>

<SeoHead {title} {description} canonicalUrl="https://malagaeventgear.com/map/" noindex={true} />

<div class="map">
	{#snippet copyBtn(value: string, variant: 'key' | 'url', onCopied?: () => void)}
		<button
			type="button"
			class="kcopy"
			class:done={copiedKey === value}
			title={variant === 'url' ? 'Copy post URL' : 'Copy keyword'}
			aria-label={variant === 'url' ? `Copy URL: ${value}` : `Copy keyword: ${value}`}
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				copyKey(value);
				onCopied?.();
			}}
		>
			{#if copiedKey === value}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
			{:else if variant === 'url'}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
			{/if}
		</button>
	{/snippet}

	{#snippet indexNowBtn(url: string, updated: string)}
		<button
			type="button"
			class="kcopy"
			class:done={submitting === abs(url)}
			disabled={submitting === abs(url)}
			title="Submit to IndexNow (Bing/Yandex)"
			aria-label={`Submit to IndexNow: ${abs(url)}`}
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				submitIndexNow(url, updated);
			}}
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></svg>
		</button>
	{/snippet}

	{#snippet keyActions(keyText: string, url: string, updated?: string, trackGsc?: boolean)}
		<span class="kactions">
			{@render copyBtn(keyText, 'key')}
			{@render copyBtn(abs(url), 'url', trackGsc ? () => markGscHandled(url) : undefined)}
			{#if needsIndexNow(url, updated)}
				{@render indexNowBtn(url, updated!)}
			{/if}
		</span>
	{/snippet}

	<header class="hero">
		<p class="eyebrow">Reverse silo · internal linking</p>
		<h1>Site map</h1>
		<p class="lede">
			The whole site as one graph — static pages, package catalogue and the blog reverse silo,
			derived live from content. Supporting posts funnel down to their pillar; each pillar links up
			to the homepage. Internal tool: excluded from sitemaps and set to <code>noindex</code>.
		</p>
	</header>

	<section class="stats" aria-label="Summary">
		<div class="stat"><span class="rail rl-blue"></span><div class="n">{view.counts.pages}</div><div class="l">Pages</div></div>
		<div class="stat"><span class="rail rl-blue"></span><div class="n">{view.counts.packages}</div><div class="l">Packages</div></div>
		<div class="stat"><span class="rail rl-support"></span><div class="n">{view.counts.posts}</div><div class="l">Posts</div></div>
		<div class="stat"><span class="rail rl-blue"></span><div class="n">{view.counts.pillars}</div><div class="l">Pillars</div></div>
		<div class="stat"><span class="rail rl-support"></span><div class="n">{view.counts.supporting}</div><div class="l">Supporting</div></div>
		<div class="stat"><span class="rail rl-news"></span><div class="n">{view.counts.news}</div><div class="l">News</div></div>
		<div class="stat"><span class="rail rl-standalone"></span><div class="n">{view.counts.standalone}</div><div class="l">Standalone</div></div>
		<div class="stat"><span class="rail rl-line"></span><div class="n">{view.counts.total}</div><div class="l">Total nodes</div></div>
	</section>

	<!-- El grafo: mindmap Mermaid -->
	<section class="graph-panel" aria-label="Site mindmap">
		<div class="graph-head">
			<span class="dot"></span><b>Full site mindmap</b>
			<span class="g-tag">mermaid · mindmap</span>
		</div>
		<div class="graph-scroll">
			{#if graphState === 'loading'}
				<p class="graph-msg">Rendering diagram…</p>
			{:else if graphState === 'error'}
				<p class="graph-msg">Couldn’t render the diagram — the source is available below.</p>
			{/if}
			<div class="mermaid-out" bind:this={graphEl} class:hidden={graphState !== 'ready'}></div>
		</div>
	</section>

	<div class="toolbar">
		<div class="search">
			<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
			<input type="search" placeholder="Filter every node by name…" bind:value={query} aria-label="Filter nodes" />
		</div>
		<span class="count-tag">{shownCount} shown</span>
	</div>

	<!-- Blog reverse silo -->
	<section class="silos">
		{#each filteredSilos as silo (silo.url)}
			<div class="silo">
				<div class="pillar-head">
					<div class="pillar-top">
						<span class="pillar-tag"><span class="dot"></span>Pillar · target page</span>
						<button
							type="button"
							class="copy-all"
							class:done={copiedSilo === silo.url}
							title="Copy the pillar keyword + every supporting post keyword"
							onclick={() => copyAllKeywords(silo.url)}
						>
							{#if copiedSilo === silo.url}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
								Copied
							{:else}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
								Copy all keywords
							{/if}
						</button>
					</div>
					<h2><a href={silo.url}>{silo.key}</a>{@render keyActions(silo.key, silo.url, silo.updated)}</h2>
					<div class="pillar-meta">
						<span class="up">↑ links to /</span> · <span class="mono">{silo.kids.length} shown</span>
						{#if silo.updated} · updated {dateOnly(silo.updated)}{/if}
					</div>
				</div>
				<ul class="kids">
					{#each silo.kids as kid (kid.url)}
						<li><a href={kid.url}><span class="k-dot support"></span><span class="k-key">{kid.key}</span>{#if kid.updated}<span class="k-date">{dateOnly(kid.updated)}</span>{:else}<span class="k-date stale">— never</span>{/if}</a>{@render keyActions(kid.key, kid.url, kid.updated, true)}</li>
					{/each}
					{#if silo.kids.length === 0}<li class="empty">No matches</li>{/if}
				</ul>
			</div>
		{/each}
	</section>

	<!-- Pages + Packages -->
	<div class="cols">
		<section class="card">
			<div class="card-head"><span class="dot blue"></span><h2>Site pages</h2></div>
			<ul class="flat">
				{#each filteredCore as p (p.url)}
					<li><a href={p.url}><span class="k-dot blue"></span><span class="k-key">{p.label}</span></a>{@render keyActions(p.label, p.url, p.updated)}</li>
				{/each}
			</ul>
			{#if filteredLegal.length}
				<div class="sub-head">Legal</div>
				<ul class="flat">
					{#each filteredLegal as p (p.url)}
						<li><a href={p.url}><span class="k-dot blue"></span><span class="k-key">{p.label}</span></a>{@render keyActions(p.label, p.url, p.updated)}</li>
					{/each}
				</ul>
			{/if}
		</section>

		<section class="card">
			<div class="card-head"><span class="dot blue"></span><h2>Packages</h2></div>
			<ul class="flat">
				{#each filteredPackages as pk (pk.url)}
					<li><a href={pk.url}><span class="k-dot blue"></span><span class="k-key">{pk.name}</span><span class="k-date">€{pk.price}</span></a>{@render keyActions(pk.name, pk.url, pk.updated)}</li>
				{/each}
			</ul>
		</section>
	</div>

	<!-- News + Standalone -->
	<div class="cols">
		<section class="card">
			<div class="card-head"><span class="dot news"></span><h2>News</h2><span class="sub">targets home</span></div>
			<ul class="flat">
				{#each filteredNews as p (p.url)}
					<li><a href={p.url}><span class="k-dot news"></span><span class="k-key">{p.key}</span></a>{@render keyActions(p.key, p.url, p.updated)}</li>
				{/each}
			</ul>
		</section>

		<section class="card">
			<div class="card-head"><span class="dot standalone"></span><h2>Standalone</h2><span class="sub">not in any silo</span></div>
			<ul class="flat">
				{#each filteredStandalone as p (p.url)}
					<li><a href={p.url}><span class="k-dot standalone"></span><span class="k-key">{p.key}</span></a>{@render keyActions(p.key, p.url, p.updated)}</li>
				{/each}
			</ul>
		</section>
	</div>

	<!-- Taxonomías -->
	<section class="card card-full">
		<div class="card-head"><span class="dot support"></span><h2>Taxonomies</h2></div>
		{#if filteredCategories.length}
			<div class="sub-head">Categories</div>
			<ul class="flat">
				{#each filteredCategories as c (c.url)}
					<li><a href={c.url}><span class="k-dot support"></span><span class="k-key">{c.name}</span><span class="k-date">{c.count}</span></a>{@render keyActions(c.name, c.url)}</li>
				{/each}
			</ul>
		{/if}
		{#if filteredAuthors.length}
			<div class="sub-head">Authors</div>
			<ul class="flat">
				{#each filteredAuthors as a (a.url)}
					<li><a href={a.url}><span class="k-dot support"></span><span class="k-key">{a.name}</span><span class="k-date">{a.count}</span></a>{@render keyActions(a.name, a.url)}</li>
				{/each}
			</ul>
		{/if}
	</section>

	<details class="source">
		<summary>Mermaid source <span class="g-tag">paste into mermaid.live</span> <span class="chev">›</span></summary>
		<div class="source-body">
			<button class="copy" onclick={copySource}>{copied ? 'Copied ✓' : 'Copy'}</button>
			<pre>{view.mermaid}</pre>
		</div>
	</details>

	<footer>Derived live from post frontmatter + the package catalogue · malagaeventgear.com</footer>
</div>

<style>
	.map {
		--blue: var(--electric-blue, #4d8cff);
		--blue-strong: var(--electric-blue-strong, #2563eb);
		--ink: var(--on-surface, #e6e7ea);
		--ink-dim: var(--on-surface-variant, #a8adb2);
		--ink-faint: var(--outline, #6f7479);
		--panel: var(--surface-container, #1a1d1d);
		--panel-2: var(--surface-container-high, #23272a);
		--line: var(--outline-variant, #2c3030);
		--support: #8fb3c9;
		--news: #7fc9a3;
		--standalone: #d6b072;
		--support-bg: color-mix(in srgb, var(--support) 16%, transparent);
		--news-bg: color-mix(in srgb, var(--news) 16%, transparent);
		--standalone-bg: color-mix(in srgb, var(--standalone) 16%, transparent);

		max-width: 1120px;
		margin: 0 auto;
		padding: 48px 20px 80px;
		color: var(--ink);
		font-family: inherit;
	}
	:global([data-theme='light']) .map {
		--support: #3d6f88;
		--news: #2f8a5d;
		--standalone: #9a6f28;
	}

	.mono { font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; }
	code { font-family: ui-monospace, monospace; font-size: 0.86em; background: var(--panel-2); border: 1px solid var(--line); padding: 1px 6px; border-radius: 5px; }

	.eyebrow { font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blue); margin: 0 0 10px; display: flex; align-items: center; gap: 10px; }
	.eyebrow::before { content: ''; width: 26px; height: 1px; background: var(--blue); }
	h1 { font-size: clamp(30px, 5vw, 44px); margin: 0 0 12px; letter-spacing: -0.02em; text-wrap: balance; }
	.lede { color: var(--ink-dim); max-width: 66ch; margin: 0; font-size: 15.5px; line-height: 1.55; }

	.stats { display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; margin: 34px 0 26px; }
	.stat { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 14px 14px 12px; position: relative; overflow: hidden; }
	.stat .n { font-size: 30px; font-weight: 640; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; line-height: 1; }
	.stat .l { font-size: 11px; color: var(--ink-dim); margin-top: 6px; letter-spacing: 0.04em; text-transform: uppercase; }
	.rail { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
	.rl-blue { background: var(--blue); } .rl-support { background: var(--support); } .rl-news { background: var(--news); } .rl-standalone { background: var(--standalone); } .rl-line { background: var(--line); }

	.graph-panel, .card, .silo, .source { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
	.graph-panel { margin-bottom: 26px; }
	.graph-head { padding: 15px 18px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--line); font-size: 14px; }
	.graph-head .g-tag { margin-left: auto; }
	.g-tag { font-family: ui-monospace, monospace; font-size: 11px; color: var(--ink-faint); }
	.graph-scroll { overflow: auto; max-height: 560px; padding: 14px; }
	.graph-msg { color: var(--ink-dim); font-size: 14px; padding: 28px; text-align: center; }
	.mermaid-out { display: flex; justify-content: center; min-width: 640px; }
	.mermaid-out.hidden { display: none; }
	.mermaid-out :global(svg) { max-width: none; height: auto; }

	.toolbar { display: flex; gap: 12px; align-items: center; margin: 6px 0 16px; flex-wrap: wrap; }
	.search { flex: 1; min-width: 220px; position: relative; }
	.search input { width: 100%; background: var(--panel); border: 1px solid var(--line); color: var(--ink); border-radius: 10px; padding: 11px 12px 11px 38px; font-size: 14px; font-family: inherit; outline: none; }
	.search input:focus-visible { border-color: var(--blue); box-shadow: 0 0 0 3px color-mix(in srgb, var(--blue) 24%, transparent); }
	.search svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; stroke: var(--ink-faint); }
	.count-tag { font-family: ui-monospace, monospace; font-size: 13px; color: var(--ink-dim); white-space: nowrap; }

	.silos { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 26px; }
	.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 26px; }
	.card-full { margin-bottom: 26px; }

	.pillar-head { padding: 16px 18px 14px; border-bottom: 1px dashed var(--line); background: linear-gradient(180deg, color-mix(in srgb, var(--blue) 9%, transparent), transparent); }
	.pillar-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
	.pillar-tag { font-family: ui-monospace, monospace; font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--blue); display: inline-flex; align-items: center; gap: 7px; }
	.copy-all {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		flex: none;
		padding: 5px 11px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--panel-2);
		color: var(--ink-dim);
		cursor: pointer;
		font-family: ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.04em;
		white-space: nowrap;
		transition: color 0.12s ease, border-color 0.12s ease;
	}
	.copy-all svg { width: 13px; height: 13px; }
	.copy-all:hover { color: var(--blue); border-color: var(--blue); }
	.copy-all:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
	.copy-all.done { color: var(--support); border-color: var(--support); }
	.pillar-head h2 { margin: 8px 0 4px; font-size: 19px; }
	.pillar-head h2 a { color: var(--ink); text-decoration: none; }
	.pillar-head h2 a:hover { color: var(--blue); }
	.pillar-meta { font-size: 12.5px; color: var(--ink-dim); font-family: ui-monospace, monospace; }
	.pillar-meta .up { color: var(--blue); }

	.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blue); flex: none; }
	.dot.support { background: var(--support); } .dot.news { background: var(--news); } .dot.standalone { background: var(--standalone); } .dot.blue { background: var(--blue); }

	.card-head { padding: 15px 18px; display: flex; align-items: center; gap: 10px; border-bottom: 1px dashed var(--line); }
	.card-head h2 { margin: 0; font-size: 16px; }
	.card-head .sub { margin-left: auto; font-size: 12px; color: var(--ink-dim); font-family: ui-monospace, monospace; }
	.sub-head { padding: 10px 18px 2px; font-family: ui-monospace, monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); }

	ul.kids, ul.flat { list-style: none; margin: 0; padding: 8px; display: flex; flex-direction: column; gap: 2px; }
	ul.kids { max-height: 520px; overflow-y: auto; }
	.kids a, .flat a { display: flex; align-items: center; gap: 10px; padding: 8px 10px; text-decoration: none; color: var(--ink); border-radius: 8px; font-size: 13.5px; }
	.kids a:hover { background: var(--support-bg); }
	.flat a:hover { background: color-mix(in srgb, var(--blue) 12%, transparent); }
	.k-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--support); flex: none; }
	.k-dot.blue { background: var(--blue); } .k-dot.news { background: var(--news); } .k-dot.standalone { background: var(--standalone); } .k-dot.support { background: var(--support); }
	.k-key { flex: 1; } a > :not(.k-dot):not(.k-key):not(.k-date) { flex: 1; }
	.k-date { font-family: ui-monospace, monospace; font-size: 11px; color: var(--ink-faint); }
	.k-date.stale { color: var(--standalone); }

	/* Copiar keyword / URL al portapapeles (aparecen al hover) */
	ul.kids li, ul.flat li { position: relative; }
	.pillar-head h2 { position: relative; padding-right: 74px; }
	.kactions {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translateY(-50%);
		display: inline-flex;
		gap: 5px;
		opacity: 0;
		transition: opacity 0.12s ease;
	}
	.pillar-head h2 .kactions { right: 0; }
	.kcopy {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 7px;
		background: var(--panel-2);
		color: var(--ink-dim);
		cursor: pointer;
		transition: color 0.12s ease, border-color 0.12s ease;
	}
	.kcopy svg { width: 14px; height: 14px; }
	ul.kids li:hover > .kactions,
	ul.flat li:hover > .kactions,
	.pillar-head:hover .kactions,
	ul.kids li:focus-within > .kactions,
	ul.flat li:focus-within > .kactions,
	.pillar-head:focus-within .kactions { opacity: 1; }
	.kcopy:hover { color: var(--blue); border-color: var(--blue); }
	.kcopy:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
	.kcopy.done { color: var(--support); border-color: var(--support); }
	@media (hover: none) { .kactions { opacity: 1; } }
	@media (prefers-reduced-motion: reduce) { .kactions, .kcopy { transition: none; } }
	.empty { padding: 10px; color: var(--ink-faint); font-size: 13px; font-style: italic; }

	.source { margin-top: 8px; }
	.source > summary { list-style: none; cursor: pointer; padding: 15px 18px; display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 550; }
	.source > summary::-webkit-details-marker { display: none; }
	.source .chev { margin-left: auto; transition: transform 0.2s ease; color: var(--ink-faint); }
	.source[open] .chev { transform: rotate(90deg); }
	.source-body { position: relative; border-top: 1px solid var(--line); }
	.source-body pre { margin: 0; padding: 16px 18px; overflow-x: auto; font-family: ui-monospace, monospace; font-size: 12.5px; line-height: 1.5; color: var(--ink-dim); }
	.copy { position: absolute; top: 12px; right: 12px; background: var(--panel-2); color: var(--ink); border: 1px solid var(--line); border-radius: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer; font-family: ui-monospace, monospace; }
	.copy:hover { border-color: var(--blue); }

	footer { margin-top: 30px; text-align: center; font-size: 12px; color: var(--ink-faint); font-family: ui-monospace, monospace; }

	@media (max-width: 820px) {
		.stats { grid-template-columns: repeat(4, 1fr); }
		.silos, .cols { grid-template-columns: 1fr; }
	}
	@media (prefers-reduced-motion: reduce) { .source .chev { transition: none; } }
</style>
