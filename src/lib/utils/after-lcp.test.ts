import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { afterLcp, type AfterLcpEnv } from './after-lcp';

// Fakes minimos del entorno del navegador. vitest corre en `node`, asi que el helper
// recibe sus dependencias inyectadas en vez de leer globals.
function createEnv(opts: { lcpSupported?: boolean; loaded?: boolean } = {}) {
	const { lcpSupported = true } = opts;
	let loaded = opts.loaded ?? false;
	let lcpCallback: (() => void) | null = null;
	const listeners = new Map<string, Set<() => void>>();
	const disconnect = vi.fn();

	class FakeObserver {
		static supportedEntryTypes = lcpSupported ? ['largest-contentful-paint', 'paint'] : ['paint'];
		constructor(cb: () => void) {
			lcpCallback = cb;
		}
		observe() {}
		disconnect = disconnect;
	}

	const target = {
		addEventListener: (type: string, fn: () => void) => {
			if (!listeners.has(type)) listeners.set(type, new Set());
			listeners.get(type)!.add(fn);
		},
		removeEventListener: (type: string, fn: () => void) => {
			listeners.get(type)?.delete(fn);
		}
	};

	const env: AfterLcpEnv = {
		PerformanceObserver: FakeObserver as unknown as AfterLcpEnv['PerformanceObserver'],
		target,
		isLoaded: () => loaded,
		requestAnimationFrame: (fn) => {
			fn(0);
			return 1;
		},
		cancelAnimationFrame: () => {},
		setTimeout: (fn, ms) => setTimeout(fn, ms),
		clearTimeout: (id) => clearTimeout(id)
	};

	return {
		env,
		disconnect,
		emitLcp: () => lcpCallback?.(),
		fire: (type: string) => [...(listeners.get(type) ?? [])].forEach((fn) => fn()),
		listenerCount: () => [...listeners.values()].reduce((n, s) => n + s.size, 0),
		setLoaded: (v: boolean) => {
			loaded = v;
		}
	};
}

describe('afterLcp', () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it('does NOT run on mount alone, before any LCP entry (the NO_LCP race)', () => {
		const { env } = createEnv({ loaded: true });
		const cb = vi.fn();
		afterLcp(cb, env);
		expect(cb).not.toHaveBeenCalled();
	});

	it('does NOT run on an LCP entry while the page is still loading', () => {
		const { env, emitLcp } = createEnv({ loaded: false });
		const cb = vi.fn();
		afterLcp(cb, env);
		emitLcp();
		expect(cb).not.toHaveBeenCalled();
	});

	it('runs once the page has loaded AND an LCP entry was recorded', () => {
		const t = createEnv({ loaded: false });
		const cb = vi.fn();
		afterLcp(cb, t.env);
		t.emitLcp();
		t.setLoaded(true);
		t.fire('load');
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('runs when the LCP entry arrives after load', () => {
		const t = createEnv({ loaded: true });
		const cb = vi.fn();
		afterLcp(cb, t.env);
		t.emitLcp();
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('runs immediately on first user input (LCP recording already stops on input)', () => {
		const t = createEnv({ loaded: false });
		const cb = vi.fn();
		afterLcp(cb, t.env);
		t.fire('pointerdown');
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('falls back to load when the browser does not support LCP entries', () => {
		const t = createEnv({ lcpSupported: false, loaded: false });
		const cb = vi.fn();
		afterLcp(cb, t.env);
		expect(cb).not.toHaveBeenCalled();
		t.setLoaded(true);
		t.fire('load');
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('runs after the safety timeout if LCP never arrives', () => {
		const t = createEnv({ loaded: true });
		const cb = vi.fn();
		afterLcp(cb, t.env);
		vi.advanceTimersByTime(9_999);
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('runs only once and cleans up observer, listeners and timer', () => {
		const t = createEnv({ loaded: true });
		const cb = vi.fn();
		afterLcp(cb, t.env);
		t.emitLcp();
		t.fire('pointerdown');
		vi.advanceTimersByTime(20_000);
		expect(cb).toHaveBeenCalledTimes(1);
		expect(t.disconnect).toHaveBeenCalled();
		expect(t.listenerCount()).toBe(0);
	});

	it('the returned cancel function prevents the callback and cleans up', () => {
		const t = createEnv({ loaded: true });
		const cb = vi.fn();
		const cancel = afterLcp(cb, t.env);
		cancel();
		t.emitLcp();
		vi.advanceTimersByTime(20_000);
		expect(cb).not.toHaveBeenCalled();
		expect(t.disconnect).toHaveBeenCalled();
		expect(t.listenerCount()).toBe(0);
	});
});
