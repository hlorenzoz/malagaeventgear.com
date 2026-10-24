/**
 * mdsvex builds its markdown parser with remark-external-links and `rel: ['nofollow']`, with no
 * option to turn it off, so EVERY external link of a post body came out as rel="nofollow". That
 * made a deliberate editorial link (the agency of a News post, the client, the hotel partner)
 * pass no authority. rehypeFollowedExternalLinks removes only that nofollow, only for the hosts
 * the business chose to vouch for. Any other external link keeps nofollow.
 */
import { describe, expect, it } from 'vitest';
import { compile } from 'mdsvex';
import { BLOG_MARKDOWN_OPTIONS } from './blog-markdown-options.mjs';
import { BLOG_REHYPE_PLUGINS } from './blog-rehype-plugins.mjs';
import {
	FOLLOWED_EXTERNAL_HOSTS,
	isFollowedHost,
	rehypeFollowedExternalLinks
} from './rehype-followed-external-links.mjs';

const BODY = [
	'[Tinkle](https://www.tinkle.es/) and [easyJet](https://www.easyjet.com/en/).',
	'',
	'[Hotels](https://topgroupexpress.com/en) and [ECOC](https://www.ecoc2026.org/ECOC2026).',
	'',
	'[Chat](https://wa.me/34666346911) and [inside](/blog/lectern-rental/).'
].join('\n');

/** The opening tag of the first <a> whose href contains `needle`. */
function anchorFor(code: string, needle: string): string {
	const match = code.match(new RegExp(`<a [^>]*href="[^"]*${needle}[^"]*"[^>]*>`));
	if (!match) throw new Error(`no <a> for ${needle} in: ${code.slice(0, 400)}`);
	return match[0];
}

async function render(rehypePlugins: unknown[]): Promise<string> {
	const compiled = await compile(BODY, { ...BLOG_MARKDOWN_OPTIONS, rehypePlugins } as never);
	return compiled?.code ?? '';
}

function tree(rel: unknown, href = 'https://www.tinkle.es/') {
	return {
		type: 'root',
		children: [
			{ type: 'element', tagName: 'a', properties: { href, rel }, children: [] as unknown[] }
		]
	};
}

describe('isFollowedHost', () => {
	it('accepts the chosen hosts, with or without www and on their subdomains', () => {
		for (const host of [
			'tinkle.es',
			'www.tinkle.es',
			'easyjet.com',
			'www.easyjet.com',
			'corporate.easyjet.com',
			'topgroupexpress.com',
			'WWW.EasyJet.com'
		]) {
			expect(isFollowedHost(host), host).toBe(true);
		}
	});

	it('rejects every other host, and look alike hosts', () => {
		for (const host of [
			'ecoc2026.org',
			'wa.me',
			'google.com',
			'eviltinkle.es',
			'tinkle.es.evil.com',
			'easyjet.com.evil.com',
			'notastopgroupexpress.com'
		]) {
			expect(isFollowedHost(host), host).toBe(false);
		}
	});

	it('lists the three hosts the business chose', () => {
		expect([...FOLLOWED_EXTERNAL_HOSTS].sort()).toEqual(
			['easyjet.com', 'tinkle.es', 'topgroupexpress.com'].sort()
		);
	});
});

describe('rehypeFollowedExternalLinks (tree)', () => {
	it('removes nofollow and drops the empty rel', () => {
		const t = tree(['nofollow']);
		rehypeFollowedExternalLinks()(t);
		expect(t.children[0].properties).toEqual({ href: 'https://www.tinkle.es/' });
	});

	it('keeps every other rel value', () => {
		const t = tree(['nofollow', 'noopener']);
		rehypeFollowedExternalLinks()(t);
		expect(t.children[0].properties.rel).toEqual(['noopener']);
	});

	it('understands a rel written as a string', () => {
		const t = tree('nofollow noopener');
		rehypeFollowedExternalLinks()(t);
		expect(t.children[0].properties.rel).toEqual(['noopener']);
	});

	it('never adds a rel and never touches sponsored or ugc', () => {
		const none = tree(undefined);
		rehypeFollowedExternalLinks()(none);
		expect('rel' in none.children[0].properties).toBe(false);
		const paid = tree(['sponsored', 'nofollow']);
		rehypeFollowedExternalLinks()(paid);
		expect(paid.children[0].properties.rel).toEqual(['sponsored']);
	});

	it('leaves a host that was not chosen, a relative link, mailto and tel alone', () => {
		for (const href of [
			'https://www.ecoc2026.org/ECOC2026',
			'/blog/lectern-rental/',
			'mailto:info@malagaeventgear.com',
			'tel:+34666346911',
			'not a url'
		]) {
			const t = tree(['nofollow'], href);
			rehypeFollowedExternalLinks()(t);
			expect(t.children[0].properties.rel, href).toEqual(['nofollow']);
		}
	});
});

describe('the post body as the build compiles it', () => {
	it('documents the root cause: without the plugin mdsvex nofollows every external link', async () => {
		const code = await render([]);
		expect(anchorFor(code, 'tinkle.es')).toContain('rel="nofollow"');
		expect(anchorFor(code, 'easyjet.com')).toContain('rel="nofollow"');
	});

	it('with the plugin the chosen hosts are plain followed links', async () => {
		const code = await render([rehypeFollowedExternalLinks]);
		for (const needle of ['tinkle.es', 'easyjet.com', 'topgroupexpress.com']) {
			expect(anchorFor(code, needle), needle).not.toMatch(/rel=/);
		}
	});

	it('with the plugin the other external links keep nofollow', async () => {
		const code = await render([rehypeFollowedExternalLinks]);
		expect(anchorFor(code, 'ecoc2026.org')).toContain('rel="nofollow"');
		expect(anchorFor(code, 'wa.me')).toContain('rel="nofollow"');
	});
});

describe('the build list', () => {
	it('registers the plugin, so the build runs it for every post of every language', () => {
		expect(BLOG_REHYPE_PLUGINS).toContain(rehypeFollowedExternalLinks);
	});
});
