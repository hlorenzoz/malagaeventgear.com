import hero400 from './hero-stage-400.webp';
import hero512 from './hero-stage-512.webp';
import heroMobile from './hero-stage-mobile.webp';

// Hero (LCP element). Shared by the <img> and its preload so the two can never drift.
// The ladder is monotonic in bytes (13.3 / 21.2 / 29.7 / 60.9 KiB), so a browser that
// picks a wider variant never downloads fewer bytes than a narrower one.
// 1024w is the largest source we have: nothing above it, because upscaling adds weight
// without adding detail.
export const HERO_MOBILE = heroMobile;

// hero-stage.webp (1024w) stays a literal stable path in `static/`, because it is the
// hardcoded og:image/twitter:image asserted by tests/opengraph.spec.ts and SeoHead.svelte
// builds an absolute URL from this exact literal. Exporting it from here (not moving the
// file) keeps +page.svelte from hardcoding the string a second time.
export const HERO_FULL = '/hero-stage.webp';

export const HERO_SRCSET = `${hero400} 400w, ${hero512} 512w, ${HERO_MOBILE} 700w, ${HERO_FULL} 1024w`;
