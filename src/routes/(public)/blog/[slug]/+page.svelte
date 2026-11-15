<script lang="ts">
	import BlogPost from '$lib/layouts/BlogPost.svelte';
	// no-inline: Vite would inline a small ?url asset as a data: URL, this keeps a hashed file.
	import enhanceUrl from '$lib/no-csr/enhance.js?url&no-inline';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// data.component is the lazily-loaded mdsvex component (only the rendered Markdown body).
	// BlogPost.svelte wraps it with SEO, header, author links, category links, etc.
	let PostBody = $derived(data.component);
</script>

<svelte:head>
	<!-- With csr = false SvelteKit strips component <script> tags, {@html} keeps this one. After a
	     client side navigation it is inserted as inert HTML, so it only runs on a direct load.
	     data-hide-header-on-scroll: only posts hide the header while scrolling down. -->
	{@html `<script src="${enhanceUrl}" defer data-hide-header-on-scroll><\/script>`}
</svelte:head>

<BlogPost post={data.post}>
	<PostBody />
</BlogPost>
