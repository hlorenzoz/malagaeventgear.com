<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { siteConfig } from '$lib/data/site';
	import Icon from '$lib/components/navigation/Icon.svelte';

	// MEG answers only in English and Spanish (CLAUDE.md, "Idiomas soportados"). A page in any
	// other language must say so, in that language, wherever it invites contact: never promise
	// service in a language nobody speaks. Renders nothing in English or Spanish.
	let { class: className = '' }: { class?: string } = $props();
	const show = $derived(!(siteConfig.serviceLanguages as readonly string[]).includes(i18n.lang));
</script>

{#if show}
	<p class="flex items-center gap-2 text-sm text-on-surface-variant {className}" data-testid="service-language-notice">
		<Icon name="info" size="16" className="shrink-0 text-electric-blue" />
		<span>{i18n.t.notices.serviceLanguages}</span>
	</p>
{/if}
