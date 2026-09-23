/**
 * Ejecuta `callback` recien cuando el navegador ya registro el Largest Contentful Paint.
 *
 * Por que existe: Chrome deja de registrar candidatos de LCP ante cualquier scroll. Los
 * carruseles del home arrancan con `overflow-x:hidden` y se vuelven scrolleables despues,
 * porque al pasar a `overflow-x:auto` el navegador dispara un scroll programatico del
 * contenedor (snap). Antes eso se hacia en `onMount`/`$effect`, asumiendo que el montaje
 * ocurre despues del FCP. No es asi: el montaje sigue el reloj del JS (descarga, parseo,
 * hidratacion) y el FCP el del paint. Con red lenta el JS a veces gana, el scroll cae antes
 * del primer candidato y PageSpeed reporta NO_LCP. Medido: 3 de 40 corridas de Lighthouse
 * sin ningun candidato de LCP, las 3 con el scroll del carrusel de paquetes antes del FCP.
 * Ver docs/home-no-lcp-investigation.md.
 *
 * Condicion: el documento cargo (`load`) Y hay al menos una entrada de LCP. Atajos:
 * - Primer input del usuario: el registro de LCP ya se corta solo con el input, asi que no
 *   hay nada que proteger y el usuario no debe esperar para usar el carrusel.
 * - Navegador sin soporte de LCP: alcanza con `load`.
 * - Timeout de seguridad, por si el LCP nunca llega.
 *
 * Los botones de flecha siguen funcionando mientras tanto: `scrollBy` opera tambien sobre un
 * contenedor con `overflow:hidden`.
 */

type Listener = () => void;

export interface AfterLcpEnv {
	PerformanceObserver: {
		new (callback: () => void): { observe(options: PerformanceObserverInit): void; disconnect(): void };
		supportedEntryTypes?: readonly string[];
	};
	/** Donde escuchar `load` y los eventos de input (window en el navegador). */
	target: {
		addEventListener(type: string, fn: Listener, options?: AddEventListenerOptions): void;
		removeEventListener(type: string, fn: Listener): void;
	};
	isLoaded: () => boolean;
	requestAnimationFrame: (fn: FrameRequestCallback) => number;
	cancelAnimationFrame: (id: number) => void;
	setTimeout: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>;
	clearTimeout: (id: ReturnType<typeof setTimeout>) => void;
}

const INPUT_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
const SAFETY_TIMEOUT_MS = 10_000;

function browserEnv(): AfterLcpEnv {
	return {
		PerformanceObserver: window.PerformanceObserver,
		target: window,
		isLoaded: () => document.readyState === 'complete',
		requestAnimationFrame: (fn) => window.requestAnimationFrame(fn),
		cancelAnimationFrame: (id) => window.cancelAnimationFrame(id),
		setTimeout: (fn, ms) => window.setTimeout(fn, ms),
		clearTimeout: (id) => window.clearTimeout(id)
	};
}

/** Devuelve una funcion de cancelacion (para el cleanup de `$effect`/`onMount`). */
export function afterLcp(callback: () => void, env: AfterLcpEnv = browserEnv()): () => void {
	let done = false;
	let lcpSeen = false;
	let raf = 0;
	let observer: { disconnect(): void } | null = null;

	const lcpSupported = env.PerformanceObserver?.supportedEntryTypes?.includes('largest-contentful-paint') ?? false;

	function cleanup() {
		observer?.disconnect();
		observer = null;
		env.target.removeEventListener('load', check);
		for (const type of INPUT_EVENTS) env.target.removeEventListener(type, fire);
		env.clearTimeout(timer);
		if (raf) env.cancelAnimationFrame(raf);
	}

	function fire() {
		if (done) return;
		done = true;
		cleanup();
		callback();
	}

	function check() {
		if (done || !env.isLoaded()) return;
		if (lcpSupported && !lcpSeen) return;
		// Un frame mas, para que el paint del candidato ya este comprometido.
		raf = env.requestAnimationFrame(() => fire());
	}

	const timer = env.setTimeout(fire, SAFETY_TIMEOUT_MS);
	env.target.addEventListener('load', check);
	for (const type of INPUT_EVENTS) env.target.addEventListener(type, fire, { passive: true, once: true });

	if (lcpSupported) {
		const lcpObserver = new env.PerformanceObserver(() => {
			lcpSeen = true;
			check();
		});
		lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
		observer = lcpObserver;
	}

	check();

	return () => {
		done = true;
		cleanup();
	};
}
