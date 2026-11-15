// @ts-nocheck: a plain browser script (no imports, no types). tsconfig is set to Workers types,
// and tests/post-no-csr.spec.ts and tests/home-no-csr.spec.ts check its behaviour in a real browser.
// Interactive behaviour of a page that is not hydrated (csr = false: blog posts and the home),
// loaded directly. This plain script drives the server rendered markup through its data-* hooks,
// and every part acts only where its hooks exist. It never runs after a client side navigation,
// where Svelte renders the page and owns these handlers.
(function () {
	window.__megEnhanced = true;
	// Only posts hide the header on scroll (as TopNavBar.svelte): they tag the script tag.
	var hideHeaderOnScroll = !!(
		document.currentScript && document.currentScript.hasAttribute('data-hide-header-on-scroll')
	);

	function onAll(selector, event, handler) {
		document.querySelectorAll(selector).forEach(function (el) {
			el.addEventListener(event, handler);
		});
	}

	// Header (TopNavBar.svelte). CSS picks the theme and menu icons from data-theme and aria-expanded.
	var root = document.documentElement;
	var header = document.querySelector('[data-site-header]');
	var logo = document.querySelector('[data-logo-light]');
	var menuButton = document.querySelector('[data-menu-toggle]');

	function isDark() {
		return root.getAttribute('data-theme') !== 'light';
	}

	function syncLogo() {
		if (logo) logo.src = isDark() ? logo.dataset.logoLight : logo.dataset.logoDark;
	}
	syncLogo();

	onAll('[data-theme-toggle]', 'click', function () {
		var next = isDark() ? 'light' : 'dark';
		root.setAttribute('data-theme', next);
		try {
			localStorage.setItem('theme', next);
		} catch (_) {}
		syncLogo();
	});

	// Follow a live system theme change until the user saves a theme (same as TopNavBar.svelte).
	var lightQuery = window.matchMedia('(prefers-color-scheme: light)');
	lightQuery.addEventListener('change', function () {
		var saved = null;
		try {
			saved = localStorage.getItem('theme');
		} catch (_) {}
		if (saved) return;
		root.setAttribute('data-theme', lightQuery.matches ? 'light' : 'dark');
		syncLogo();
	});

	function menuOpen() {
		return !!menuButton && menuButton.getAttribute('aria-expanded') === 'true';
	}

	if (menuButton) {
		menuButton.addEventListener('click', function () {
			var open = !menuOpen();
			menuButton.setAttribute('aria-expanded', String(open));
			var panel = document.getElementById(menuButton.getAttribute('aria-controls'));
			if (panel) panel.hidden = !open;
		});
	}

	// Hide the header while scrolling down a post, show it again on the way up.
	if (header && hideHeaderOnScroll) {
		var lastY = window.scrollY;
		var ticking = false;
		window.addEventListener(
			'scroll',
			function () {
				if (ticking) return;
				ticking = true;
				requestAnimationFrame(function () {
					ticking = false;
					var y = window.scrollY;
					if (menuOpen()) header.style.transform = 'translateY(0)';
					else if (y > 80 && y > lastY) header.style.transform = 'translateY(-100%)';
					else if (y < lastY) header.style.transform = 'translateY(0)';
					lastY = y;
				});
			},
			{ passive: true }
		);
	}

	// Share bars (ShareThis.svelte, BlogPost.svelte): the floating ones show once the top bar is gone.
	var topShare = document.querySelector('[data-share-top]');
	if (topShare) {
		var topShareOnScreen = true;
		var syncFloatingShare = function () {
			var hide = topShareOnScreen || window.scrollY < 100;
			document.querySelectorAll('[data-share-float]').forEach(function (el) {
				el.classList.remove.apply(
					el.classList,
					el.dataset[hide ? 'shownClass' : 'hiddenClass'].split(' ')
				);
				el.classList.add.apply(
					el.classList,
					el.dataset[hide ? 'hiddenClass' : 'shownClass'].split(' ')
				);
				if (el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden', String(hide));
			});
		};
		new IntersectionObserver(function (entries) {
			topShareOnScreen = entries[0].isIntersecting;
			syncFloatingShare();
		}).observe(topShare);
		window.addEventListener('scroll', syncFloatingShare, { passive: true });
	}

	// Copy link buttons: CSS shows the copied state while data-copied is set.
	onAll('[data-copy-link]', 'click', function (event) {
		var button = event.currentTarget;
		var url = button.dataset.copyLink;
		var copied = function () {
			button.setAttribute('data-copied', '');
			setTimeout(function () {
				button.removeAttribute('data-copied');
			}, 2000);
		};
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(url).then(copied, copied);
		} else {
			var area = document.createElement('textarea');
			area.value = url;
			area.style.position = 'fixed';
			area.style.opacity = '0';
			document.body.appendChild(area);
			area.select();
			document.execCommand('copy');
			area.remove();
			copied();
		}
	});

	// Sharing options drawer (mobile): open button, close button, backdrop and network links close it.
	var drawer = document.querySelector('[data-share-drawer]');
	if (drawer) {
		onAll('[data-share-open]', 'click', function () {
			drawer.hidden = false;
		});
		drawer.addEventListener('click', function (event) {
			if (event.target === drawer || event.target.closest('[data-share-close], a'))
				drawer.hidden = true;
		});
	}

	// Click to tweet (ClickToTweet.svelte): a tweet button over a text selection inside the post body.
	var bubble = document.querySelector('[data-tweet-url]');
	if (bubble) {
		var selected = '';
		document.addEventListener('selectionchange', function () {
			var selection = getSelection();
			var text = selection && !selection.isCollapsed ? selection.toString().trim() : '';
			var range = text.length >= 3 && text.length <= 200 ? selection.getRangeAt(0) : null;
			var node = range && range.commonAncestorContainer;
			var element = node && (node.nodeType === 1 ? node : node.parentElement);
			if (!element || !element.closest('.prose')) {
				bubble.hidden = true;
				return;
			}
			var rect = range.getBoundingClientRect();
			bubble.style.left = rect.left + window.scrollX + rect.width / 2 + 'px';
			bubble.style.top = rect.top + window.scrollY + 'px';
			selected = text;
			bubble.hidden = false;
		});
		// Keep the selection when the button is pressed.
		bubble.addEventListener('mousedown', function (event) {
			event.preventDefault();
		});
		bubble.querySelector('[data-tweet-button]').addEventListener('click', function () {
			var tweet = '\u201c' + selected + '\u201d';
			window.open(
				'https://twitter.com/intent/tweet?text=' +
					encodeURIComponent(tweet) +
					'&url=' +
					encodeURIComponent(bubble.dataset.tweetUrl),
				'_blank',
				'noopener,noreferrer'
			);
			getSelection().removeAllRanges();
			bubble.hidden = true;
		});
	}

	// Table of contents (TableOfContents.svelte): mark the section on screen as active.
	var toc = document.querySelector('[data-toc]');
	if (toc) {
		var tocLinks = toc.querySelectorAll('a[href^="#"]');
		var lockUntil = 0;
		var setActive = function (id) {
			tocLinks.forEach(function (link) {
				var active = link.getAttribute('href') === '#' + id;
				link.classList.toggle('toc-desktop-link--active', active);
				if (active) link.setAttribute('aria-current', 'true');
				else link.removeAttribute('aria-current');
			});
		};
		var tocObserver = new IntersectionObserver(
			function (entries) {
				// A click scrolls smoothly past other headings: keep its section until it settles.
				if (Date.now() < lockUntil) return;
				var visible = entries
					.filter(function (e) {
						return e.isIntersecting;
					})
					.sort(function (a, b) {
						return a.boundingClientRect.top - b.boundingClientRect.top;
					});
				if (visible.length) setActive(visible[0].target.id);
			},
			{ rootMargin: '-80px 0px -60% 0px', threshold: 0 }
		);
		tocLinks.forEach(function (link) {
			var heading = document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
			if (heading) tocObserver.observe(heading);
			link.addEventListener('click', function () {
				setActive(link.getAttribute('href').slice(1));
				lockUntil = Date.now() + 700;
			});
		});
	}

	// Deferred gallery carousels (ImageMarquee.svelte): mount the <template> track near the viewport,
	// so its images and animation stay out of the critical render window.
	var marqueeObserver = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				var template = entry.target.querySelector('template[data-marquee-track]');
				if (template) template.replaceWith(template.content);
				marqueeObserver.unobserve(entry.target);
			});
		},
		{ rootMargin: '200px' }
	);
	document.querySelectorAll('[data-marquee]').forEach(function (marquee) {
		if (marquee.querySelector('template[data-marquee-track]')) marqueeObserver.observe(marquee);
	});

	// Carousels (home packages, Testimonials.svelte): arrows show while the track overflows, scroll
	// one card, and disable at each edge. The cards are centered with auto margins in CSS.
	document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
		var track = carousel.querySelector('[data-carousel-track]');
		var nav = carousel.querySelector('[data-carousel-nav]');
		var prev = carousel.querySelector('[data-carousel-prev]');
		var next = carousel.querySelector('[data-carousel-next]');
		if (!track || !nav || !prev || !next) return;
		var raf = 0;
		var update = function () {
			raf = 0;
			var max = track.scrollWidth - track.clientWidth;
			nav.hidden = max <= 1;
			prev.disabled = track.scrollLeft <= 1;
			next.disabled = track.scrollLeft >= max - 1;
		};
		var scrollByCard = function (direction) {
			var card = track.firstElementChild;
			var amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
			track.scrollBy({ left: amount * direction, behavior: 'smooth' });
		};
		prev.addEventListener('click', function () {
			scrollByCard(-1);
		});
		next.addEventListener('click', function () {
			scrollByCard(1);
		});
		track.addEventListener(
			'scroll',
			function () {
				if (!raf) raf = requestAnimationFrame(update);
			},
			{ passive: true }
		);
		new ResizeObserver(update).observe(track);
	});

	// Rows that become scrollable only after the LCP (src/lib/utils/after-lcp.ts explains why: a
	// snap container scroll before the first LCP candidate stops LCP recording).
	var lateScroll = document.querySelectorAll('[data-scroll-after-lcp]');
	if (lateScroll.length) {
		var enabled = false;
		var lcpSeen = false;
		var enableScroll = function () {
			if (enabled) return;
			enabled = true;
			lateScroll.forEach(function (el) {
				el.classList.replace('overflow-x-hidden', 'overflow-x-auto');
			});
		};
		var lcpSupported =
			window.PerformanceObserver &&
			(PerformanceObserver.supportedEntryTypes || []).indexOf('largest-contentful-paint') !== -1;
		var checkLcp = function () {
			if (document.readyState !== 'complete' || (lcpSupported && !lcpSeen)) return;
			// One more frame, so the paint of the candidate is committed.
			requestAnimationFrame(enableScroll);
		};
		if (lcpSupported) {
			new PerformanceObserver(function () {
				lcpSeen = true;
				checkLcp();
			}).observe({ type: 'largest-contentful-paint', buffered: true });
		}
		window.addEventListener('load', checkLcp);
		// Input stops LCP recording on its own, so there is nothing left to protect.
		['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (type) {
			window.addEventListener(type, enableScroll, { passive: true, once: true });
		});
		setTimeout(enableScroll, 10000);
		checkLcp();
	}

	// Long reviews (TestimonialCard.svelte): Read more / Read less, labels from the server render.
	onAll('[data-read-more]', 'click', function (event) {
		var button = event.currentTarget;
		var card = button.closest('[data-testid="testimonial-card"]');
		var expanded = card.getAttribute('data-expanded') !== 'true';
		card.setAttribute('data-expanded', String(expanded));
		card
			.querySelector('[data-testid="testimonial-text"]')
			.classList.toggle('line-clamp-4', !expanded);
		button.textContent = expanded ? button.dataset.less : button.dataset.more;
	});

	// FAQ accordion (home): one answer open at a time. CSS picks the icon from aria-expanded.
	var faqToggles = document.querySelectorAll('[data-faq-toggle]');
	faqToggles.forEach(function (button) {
		button.addEventListener('click', function () {
			var open = button.getAttribute('aria-expanded') !== 'true';
			faqToggles.forEach(function (other) {
				var isThis = other === button;
				other.setAttribute('aria-expanded', String(isThis && open));
				var answer = document.getElementById(other.getAttribute('aria-controls'));
				if (answer) answer.hidden = !(isThis && open);
			});
		});
	});
})();
