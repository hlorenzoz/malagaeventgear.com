/**
 * rehype plugin (build-time) - lets the external links the business vouches for pass authority.
 *
 * Why: mdsvex builds its markdown parser with remark-external-links and `rel: ['nofollow']`,
 * hard coded and with no option to turn it off. Every external link of a post body therefore
 * came out as rel="nofollow", a deliberate editorial link included (the agency and the client of a
 * News post, the group hotel partner). Google's guidance is that nofollow is for links you do not
 * vouch for (qualify-outbound-links.md): a link the business chose to give is a plain link.
 *
 * What: removes ONLY the `nofollow` value of the rel of an external link whose host is in
 * FOLLOWED_EXTERNAL_HOSTS. Any other external link keeps nofollow. It never adds a rel, and it
 * keeps every other value (sponsored, ugc, noopener).
 *
 * Adding a host is a decision of the business, never an agent's. A paid or exchanged link is NOT
 * added here: it takes rel="sponsored" (CLAUDE.md, link-building plan, rule 4).
 */
import { visit } from 'unist-util-visit';

/** Hosts whose links pass authority. A subdomain and the www form count as the same host. */
export const FOLLOWED_EXTERNAL_HOSTS = Object.freeze([
	// Tinkle, the agency of the 2026-10-22 event, and easyJet, its client (decision of the user,
	// 2026-10-24: "que pasen la autoridad SEO").
	'tinkle.es',
	'easyjet.com',
	// Top Group Express, the group hotel partner: a plain followed link (decision of the user,
	// 2026-10-08, "not sponsored").
	'topgroupexpress.com',
	// ECOC 2026, the congress at FYCMA behind the News post about the exhibitor stand screens: an
	// editorial reference to the event, not paid (decision of the user, 2026-10-24).
	'ecoc2026.org'
]);

/** True when `hostname` is one of the followed hosts or a subdomain of one. */
export function isFollowedHost(hostname) {
	const host = String(hostname)
		.toLowerCase()
		.replace(/^www\./, '');
	return FOLLOWED_EXTERNAL_HOSTS.some(
		(followed) => host === followed || host.endsWith(`.${followed}`)
	);
}

/** The rel values of a hast `rel` property, whether it is an array or a space separated string. */
function relValues(rel) {
	if (Array.isArray(rel)) return rel.map(String);
	if (typeof rel === 'string') return rel.split(/\s+/).filter(Boolean);
	return [];
}

/** The host of an absolute http(s) href, or null (relative, mailto, tel and malformed hrefs). */
function externalHost(href) {
	if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return null;
	try {
		return new URL(href).hostname;
	} catch {
		return null;
	}
}

export function rehypeFollowedExternalLinks() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a' || !node.properties) return;
			const host = externalHost(node.properties.href);
			if (host === null || !isFollowedHost(host)) return;
			if (!('rel' in node.properties)) return;

			const kept = relValues(node.properties.rel).filter(
				(value) => value.toLowerCase() !== 'nofollow'
			);
			if (kept.length === 0) delete node.properties.rel;
			else node.properties.rel = kept;
		});
	};
}
