import type { ParamMatcher } from '@sveltejs/kit';
import { PREFIXED_LOCALES } from '$lib/i18n/locales';

/** Matches a prefixed locale code (`de`, `zh-hans`). English has no prefix, so it never matches. */
export const match: ParamMatcher = (param) => (PREFIXED_LOCALES as readonly string[]).includes(param);
