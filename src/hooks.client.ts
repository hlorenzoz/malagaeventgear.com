import type { HandleClientError } from '@sveltejs/kit';

const STALE_CHUNK = /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed/i;
const RELOAD_FLAG = 'meg:stale-chunk-reload';

// A deploy can replace this tab's JS chunks mid-session (hashed filenames from the previous
// build stop existing on origin). SvelteKit then throws here instead of navigating. Reload
// once to pick up the current build rather than leaving navigation permanently broken;
// sessionStorage stops a reload loop if the error persists for a genuinely broken deploy.
export const handleError: HandleClientError = ({ error, message }) => {
	const text = error instanceof Error ? error.message : String(error);

	if (STALE_CHUNK.test(text) && !sessionStorage.getItem(RELOAD_FLAG)) {
		sessionStorage.setItem(RELOAD_FLAG, '1');
		location.reload();
		return;
	}

	console.error(error);
	return { message };
};
