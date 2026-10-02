/**
 * step-summary.ts: the pure formatting of the detail of the daily chain events (see
 * `agent-log.ts`). Counts are read from the batch and plan files the agents wrote, defensively:
 * a malformed file gives `counts=unreadable`, never an exception, because a log line must not
 * break a run.
 */

const count = (v: unknown): number => (Array.isArray(v) ? v.length : 0);
const isObj = (v: unknown): v is Record<string, unknown> =>
	typeof v === 'object' && v !== null && !Array.isArray(v);
const status = (run: unknown): string =>
	isObj(run) && typeof run.status === 'string' ? ` status=${run.status}` : '';

/** `keywords=3 faqs=1 ai_prompts=2 discarded=1 status=ok` from an Ubersuggest batch. */
export function summarizeResearch(batch: unknown): string {
	if (!isObj(batch)) return 'counts=unreadable';
	return (
		`keywords=${count(batch.keywords)} faqs=${count(batch.faqs)} ` +
		`ai_prompts=${count(batch.aiPrompts)} discarded=${count(batch.discarded)}${status(batch.run)}`
	);
}

/** `suggestions=2 status=ok` from a FAQ batch. */
export function summarizeFaqs(batch: unknown): string {
	if (!isObj(batch)) return 'counts=unreadable';
	return `suggestions=${count(batch.suggestions)}${status(batch.run)}`;
}

const ACTIONS = ['add-section', 'new-post', 'add-faq', 'skip'] as const;

/** `items=4 add-section=0 new-post=1 add-faq=2 skip=1` from a content plan. */
export function summarizePlan(plan: unknown): string {
	if (!isObj(plan) || !Array.isArray(plan.items)) return 'counts=unreadable';
	const by = (a: string) => plan.items.filter((i: unknown) => isObj(i) && i.action === a).length;
	return `items=${plan.items.length} ${ACTIONS.map((a) => `${a}=${by(a)}`).join(' ')}`;
}

/** Minutes with one decimal. */
export function formatMinutes(ms: number): string {
	return (ms / 60_000).toFixed(1);
}

/** Detail of a step-done: the file, the counts (when there are any) and the minutes. */
export function stepDoneDetail(file: string, summary: string, ms: number): string {
	return [`file=${file}`, summary, `minutes=${formatMinutes(ms)}`].filter(Boolean).join(' ');
}

/** Detail of a step-failed. */
export function stepFailedDetail(reason: string, ms: number): string {
	return `reason="${reason}" minutes=${formatMinutes(ms)}`;
}

/** Detail of the run-end of the daily guard. */
export function runEndDetail(r: { done: string[]; failed: string[]; ms: number }): string {
	const result = r.failed.length === 0 ? 'ok' : r.done.length === 0 ? 'failed' : 'partial';
	const list = (l: string[]) => (l.length ? l.join(',') : 'none');
	return `result=${result} done=${list(r.done)} failed=${list(r.failed)} minutes=${formatMinutes(r.ms)}`;
}
