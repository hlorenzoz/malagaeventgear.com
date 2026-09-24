<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	// On a translated legal page the English version prevails (confirmed by the business,
	// 2026-09-24). Goes at the very top of every translated legal page. Nothing in English.
	let { enPath }: { enPath: string } = $props();
</script>

{#if i18n.lang !== 'en'}
	<div class="glass-panel rounded-xl px-5 py-4 mb-8 text-sm text-on-surface-variant" role="note" data-testid="legal-language-notice">
		{i18n.t.notices.legalTranslation}
		<a href={enPath} hreflang="en" lang="en" class="text-electric-blue underline underline-offset-2 ml-1">{i18n.t.notices.readEnglish}</a>
	</div>
{/if}
