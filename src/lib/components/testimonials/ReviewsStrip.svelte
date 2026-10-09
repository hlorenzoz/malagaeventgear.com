<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import Icon from '$lib/components/navigation/Icon.svelte';
	import { formatRating } from '$lib/i18n/format';
	import {
		getReviewsMeta,
		getTestimonials,
		GMB_PROFILE_URL,
		type ReviewsMeta,
		type Testimonial
	} from '$lib/data/testimonials';

	// Narrow strip of Google reviews for tight slots (under a package CTA). Same data as
	// Testimonials.svelte, a fraction of its height: one summary line and a row of small cards
	// that scrolls sideways with native overflow, so it needs no script of its own.
	let {
		testimonials = getTestimonials(),
		meta = getReviewsMeta()
	}: {
		testimonials?: Testimonial[];
		meta?: ReviewsMeta;
	} = $props();

	let basedOn = $derived(i18n.t.testimonials.basedOn.replace('{n}', String(meta.totalCount)));
	let ratingAria = $derived(
		`${formatRating(meta.averageRating, i18n.lang)} ${i18n.t.testimonials.outOfFiveStars}`
	);
</script>

<div class="reviews-strip" data-testid="reviews-strip">
	<div class="reviews-strip-head">
		<span class="reviews-strip-summary">
			<svg class="reviews-strip-g" viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill="#4285F4"
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
				/>
				<path
					fill="#34A853"
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
				/>
				<path
					fill="#FBBC05"
					d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
				/>
				<path
					fill="#EA4335"
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
				/>
			</svg>
			<strong>{formatRating(meta.averageRating, i18n.lang)}</strong>
			<span class="reviews-strip-stars" role="img" aria-label={ratingAria}>
				{#each Array(5) as _, i (i)}
					<Icon name={i < Math.round(meta.averageRating) ? 'star' : 'star_border'} size="14" />
				{/each}
			</span>
			<span class="reviews-strip-count">{basedOn}</span>
		</span>
		<a
			class="reviews-strip-link"
			data-testid="reviews-strip-link"
			href={GMB_PROFILE_URL}
			target="_blank"
			rel="noopener noreferrer"
		>
			{i18n.t.testimonials.seeAll}
			<Icon name="arrow_outward" size="14" />
		</a>
	</div>

	<!-- tabindex makes the row reachable by keyboard, so it can be scrolled with the arrow keys. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="reviews-strip-track"
		data-testid="reviews-strip-track"
		role="group"
		aria-label={i18n.t.testimonials.badge}
		tabindex="0"
	>
		{#each testimonials as testimonial (testimonial.id)}
			<article class="reviews-strip-card" data-testid="testimonial-card">
				<header class="reviews-strip-card-head">
					<span class="reviews-strip-author">{testimonial.author}</span>
					<span
						class="reviews-strip-stars"
						role="img"
						aria-label="{testimonial.rating} {i18n.t.testimonials.outOfFiveStars}"
					>
						{#each Array(5) as _, i (i)}
							<Icon name={i < testimonial.rating ? 'star' : 'star_border'} size="12" />
						{/each}
					</span>
				</header>
				<!-- Reviews are quoted as written, in their original language, on every locale. -->
				<p class="reviews-strip-text" data-testid="testimonial-text" lang={testimonial.lang}>
					{testimonial.text}
				</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.reviews-strip {
		border-top: 1px solid var(--color-border-glass, rgba(255, 255, 255, 0.15));
		padding: 0.875rem 1.5rem 1rem;
	}

	.reviews-strip-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.25rem 1rem;
		margin-bottom: 0.625rem;
		font-size: 0.8125rem;
		color: var(--color-on-surface-variant, #94a3b8);
	}

	.reviews-strip-summary {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.375rem;
	}

	.reviews-strip-summary strong {
		color: var(--color-on-surface, #f1f5f9);
		font-weight: 700;
	}

	.reviews-strip-g {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	.reviews-strip-stars {
		display: inline-flex;
		align-items: center;
		color: #fbbf24;
	}

	/* 44px tall hit area without growing the line: the padding is cancelled by the margin. */
	.reviews-strip-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem 0;
		margin: -0.75rem 0;
		color: var(--color-electric-blue, #3b82f6);
		font-weight: 600;
		text-decoration: none;
	}

	.reviews-strip-link:hover {
		text-decoration: underline;
	}

	.reviews-strip-track {
		display: flex;
		gap: 0.625rem;
		overflow-x: auto;
		scroll-snap-type: x proximity;
		scrollbar-width: thin;
		padding-bottom: 0.375rem;
		border-radius: 8px;
	}

	.reviews-strip-track:focus-visible,
	.reviews-strip-link:focus-visible {
		outline: 2px solid var(--color-electric-blue, #3b82f6);
		outline-offset: 2px;
	}

	.reviews-strip-card {
		flex: 0 0 15rem;
		scroll-snap-align: start;
		padding: 0.625rem 0.75rem;
		border-radius: 10px;
		border: 1px solid var(--color-border-glass, rgba(255, 255, 255, 0.15));
		background: rgba(255, 255, 255, 0.04);
	}

	.reviews-strip-card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.reviews-strip-author {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-on-surface, #f1f5f9);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Fixed height with its own scroll: the row stays short and a long review is still readable. */
	.reviews-strip-text {
		margin: 0;
		font-size: 0.8125rem;
		line-height: 1.45;
		color: var(--color-on-surface-variant, #94a3b8);
		max-height: 4.35em;
		overflow-y: auto;
		scrollbar-width: thin;
	}

	@media (max-width: 480px) {
		.reviews-strip {
			padding: 0.75rem 1rem 0.875rem;
		}

		.reviews-strip-card {
			flex-basis: 13.5rem;
		}
	}
</style>
