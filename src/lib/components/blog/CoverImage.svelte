<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import type { BlogPost } from '$lib/types/blog';

	// The remaining props (sizes, alt, width, height, class, loading, fetchpriority, decoding)
	// go straight to the <img>, so each template keeps its own sizing and loading policy.
	let { post, ...rest }: { post: BlogPost } & HTMLImgAttributes = $props();
</script>

<!--
  Cover with an AVIF <source> when the whole ladder has AVIF (cover-thumbs.json avifSrcset,
  see scripts/gen-cover-thumbs.ts). The WebP <img> is the fallback for browsers without AVIF.
  `contents` keeps <picture> out of the layout, so the <img> still fills its aspect-video box.
-->
<picture class="contents">
	{#if post.coverImageAvifSrcset}
		<source type="image/avif" srcset={post.coverImageAvifSrcset} sizes={rest.sizes}>
	{/if}
	<img src={post.coverImageThumb ?? post.coverImage} srcset={post.coverImageSrcset} {...rest}>
</picture>
