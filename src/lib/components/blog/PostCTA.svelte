<script lang="ts">
	import type { EventPackage } from '$lib/data/packages';
	import { packageImageVariant } from '$lib/assets/package-images';
	import { i18n } from '$lib/i18n.svelte';
	import { postCtaCopy } from './post-cta-copy';

	let {
		pkg
	}: {
		pkg: EventPackage;
	} = $props();

	// Copy in the page language (dictionary `postCta`), package name untranslated, price and VAT
	// through formatPrice and {vat} (post-cta-copy.ts).
	let copy = $derived(postCtaCopy(pkg, i18n.t, i18n.lang));
</script>

<aside
	class="post-cta"
	data-testid="post-cta"
	aria-label={copy.aria}
>
	<div class="post-cta-inner">
		<!-- Package image -->
		{#if pkg.image}
			<div class="post-cta-img-wrap">
				<!-- Thumbnails dedicados (96 y 160px) en vez del <slug>.webp completo (800x800). Slot de
				     80px: a DPR 1 el navegador elige 96w, a DPR 1.75 o 2 elige 160w. -->
				<img
					src={packageImageVariant(pkg.image, 'thumb')}
					srcset="{packageImageVariant(pkg.image, 'thumb-sm')} 96w, {packageImageVariant(pkg.image, 'thumb')} 160w"
					sizes="80px"
					alt={pkg.name}
					width="80"
					height="80"
					loading="lazy"
					decoding="async"
					class="post-cta-img"
				/>
			</div>
		{/if}

		<!-- Copy -->
		<div class="post-cta-body">
			<p class="post-cta-headline">{copy.headline}</p>
			<p class="post-cta-subline">{copy.subline}</p>
			<p class="post-cta-price">{copy.price.before}<strong>{copy.price.amount}</strong>{copy.price.after}{i18n.space}<span>{copy.vat}</span></p>

			<!-- CTAs -->
			<div class="post-cta-actions">
				<a
					href={i18n.href(pkg.route)}
					class="post-cta-btn-primary"
					data-testid="post-cta-primary"
				>
					{copy.view} →
				</a>
				<a
					href={i18n.href('/contact/')}
					class="post-cta-btn-secondary"
					data-testid="post-cta-secondary"
				>
					{copy.quote}
				</a>
			</div>
		</div>
	</div>
</aside>

<style>
	.post-cta {
		margin: 2.5rem 0;
		border-radius: 16px;
		border: 1px solid rgba(59, 130, 246, 0.3);
		background: linear-gradient(
			135deg,
			rgba(59, 130, 246, 0.08) 0%,
			rgba(139, 92, 246, 0.06) 100%
		);
		backdrop-filter: blur(12px);
		overflow: hidden;
	}

	.post-cta-inner {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		padding: 1.5rem;
	}

	.post-cta-img-wrap {
		flex-shrink: 0;
		width: 80px;
		height: 80px;
		border-radius: 10px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.06);
	}

	.post-cta-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.post-cta-body {
		flex: 1;
		min-width: 0;
	}

	.post-cta-headline {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-on-surface, #f1f5f9);
		margin-bottom: 0.375rem;
		line-height: 1.3;
	}

	.post-cta-subline {
		font-size: 0.9rem;
		color: var(--color-on-surface-variant, #94a3b8);
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}

	.post-cta-price {
		font-size: 0.875rem;
		color: var(--color-on-surface-variant, #94a3b8);
		margin-bottom: 1rem;
	}

	.post-cta-price strong {
		color: var(--color-electric-blue, #3b82f6);
		font-weight: 700;
	}

	.post-cta-price span {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.post-cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.post-cta-btn-primary {
		display: inline-flex;
		align-items: center;
		padding: 0.625rem 1.25rem;
		border-radius: 8px;
		background: var(--color-electric-blue, #3b82f6);
		color: #fff;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background-color 0.2s ease,
			transform 0.15s ease;
	}

	.post-cta-btn-primary:hover {
		background: #2563eb;
		transform: translateY(-1px);
	}

	.post-cta-btn-primary:active {
		transform: scale(0.97);
	}

	.post-cta-btn-secondary {
		display: inline-flex;
		align-items: center;
		padding: 0.625rem 1.25rem;
		border-radius: 8px;
		border: 1px solid var(--color-border-glass, rgba(255, 255, 255, 0.15));
		background: transparent;
		color: var(--color-on-surface, #f1f5f9);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
	}

	.post-cta-btn-secondary:hover {
		border-color: rgba(59, 130, 246, 0.5);
		background: rgba(59, 130, 246, 0.06);
	}

	@media (max-width: 480px) {
		.post-cta-inner {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.post-cta-actions {
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.post-cta-btn-primary,
		.post-cta-btn-secondary {
			transition: none;
		}
	}
</style>
