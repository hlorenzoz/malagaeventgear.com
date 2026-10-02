import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	EVENTS,
	appendAgentLog,
	commitDetail,
	formatLine,
	hasLoggedToday,
	modeFromEnv,
	monthFile,
	parseCliArgs
} from './agent-log';

describe('monthFile', () => {
	it('is .agents/logs/YYYY-MM.log of the Madrid month', () => {
		expect(monthFile(new Date('2026-10-02T09:15:00Z'))).toBe('.agents/logs/2026-10.log');
	});

	it('uses Madrid time, not UTC, at the month boundary', () => {
		// 23:30 UTC on 30 Sept is 01:30 on 1 Oct in Madrid (CEST, UTC+2).
		expect(monthFile(new Date('2026-09-30T23:30:00Z'))).toBe('.agents/logs/2026-10.log');
		expect(monthFile(new Date('2026-09-30T21:30:00Z'))).toBe('.agents/logs/2026-09.log');
	});
});

describe('formatLine', () => {
	const ts = new Date('2026-10-02T09:15:00Z');

	it('has five fields separated by " | " with the Madrid time', () => {
		const line = formatLine({
			ts,
			mode: 'demanda',
			actor: 'todo-implementer',
			event: 'task-done',
			detail: 'task=#T0037 cost_usd=5.03'
		});
		expect(line).toBe(
			'2026-10-02 11:15 | demanda | todo-implementer | task-done | task=#T0037 cost_usd=5.03'
		);
	});

	it('uses a dash for an empty detail so the line keeps five fields', () => {
		const line = formatLine({ ts, mode: 'auto', actor: 'daily-guard', event: 'run-end' });
		expect(line.split(' | ')).toHaveLength(5);
		expect(line.endsWith(' | -')).toBe(true);
	});

	it('collapses newlines and tabs into a single line', () => {
		const line = formatLine({
			ts,
			mode: 'auto',
			actor: 'daily-guard',
			event: 'info',
			detail: 'a\nb\r\n\tc   d'
		});
		expect(line).not.toMatch(/[\r\n\t]/);
		expect(line.endsWith('a b c d')).toBe(true);
	});

	it('caps a long detail with three dots', () => {
		const line = formatLine({
			ts,
			mode: 'auto',
			actor: 'x',
			event: 'info',
			detail: 'y'.repeat(2000)
		});
		const detail = line.split(' | ')[4];
		expect(detail.length).toBeLessThanOrEqual(400);
		expect(detail.endsWith('...')).toBe(true);
	});

	it('never lets a detail break the field separator', () => {
		const line = formatLine({ ts, mode: 'auto', actor: 'x', event: 'info', detail: 'a | b | c' });
		expect(line.split(' | ')).toHaveLength(5);
	});

	it('writes only ASCII punctuation (rule 12) but keeps accents', () => {
		const line = formatLine({
			ts,
			mode: 'demanda',
			actor: 'x',
			event: 'info',
			detail: 'Nueva sección \u2014 \u201chola\u201d \u2018x\u2019 \u2013 \u2026 \u2022 a\u00a0b; c'
		});
		expect(line).not.toMatch(/[\u2014\u2013\u2018\u2019\u201c\u201d\u2026\u2022\u00a0\u202f;]/);
		expect(line).toContain('sección');
		expect(line).toContain('"hola"');
	});

	it('rejects an unknown event or mode', () => {
		// @ts-expect-error invalid event on purpose
		expect(() => formatLine({ ts, mode: 'auto', actor: 'x', event: 'nope' })).toThrow();
		// @ts-expect-error invalid mode on purpose
		expect(() => formatLine({ ts, mode: 'manual', actor: 'x', event: 'info' })).toThrow();
	});

	it('cleans an actor with spaces or separators', () => {
		const line = formatLine({ ts, mode: 'auto', actor: 'my | actor', event: 'info' });
		expect(line.split(' | ')).toHaveLength(5);
	});

	it('documents the event vocabulary', () => {
		expect([...EVENTS]).toEqual([
			'run-start',
			'run-end',
			'step-done',
			'step-failed',
			'commit',
			'task-done',
			'task-blocked',
			'task-skipped',
			'info'
		]);
	});
});

describe('commitDetail', () => {
	it('joins hash, subject and extra pairs', () => {
		expect(commitDetail('86f051f', 'chore(keywords): sync', 'task=#T0037')).toBe(
			'hash=86f051f subject="chore(keywords): sync" task=#T0037'
		);
	});

	it('swaps double quotes inside the subject for single quotes', () => {
		expect(commitDetail('abc1234', 'say "hi"')).toBe('hash=abc1234 subject="say \'hi\'"');
	});
});

describe('modeFromEnv', () => {
	it('takes auto or demanda from the value, otherwise the fallback', () => {
		expect(modeFromEnv('auto', 'demanda')).toBe('auto');
		expect(modeFromEnv('demanda', 'auto')).toBe('demanda');
		expect(modeFromEnv(undefined, 'demanda')).toBe('demanda');
		expect(modeFromEnv('x', 'auto')).toBe('auto');
	});
});

describe('hasLoggedToday', () => {
	const text = [
		'2026-10-01 10:00 | auto | daily-guard | info | reason=offline',
		'2026-10-02 10:00 | auto | daily-guard | info | reason=attempts-exhausted'
	].join('\n');

	it('finds a line of that day with that text', () => {
		expect(hasLoggedToday(text, '2026-10-02', 'reason=attempts-exhausted')).toBe(true);
	});

	it('does not match another day', () => {
		expect(hasLoggedToday(text, '2026-10-02', 'reason=offline')).toBe(false);
	});
});

describe('parseCliArgs', () => {
	it('builds an entry from the flags', () => {
		const r = parseCliArgs([
			'--mode',
			'demanda',
			'--actor',
			'todo-implementer',
			'--event',
			'commit',
			'--detail',
			'x=1'
		]);
		expect(r).toEqual({
			ok: true,
			entry: { mode: 'demanda', actor: 'todo-implementer', event: 'commit', detail: 'x=1' },
			lastCommit: false
		});
	});

	it('flags --last-commit', () => {
		const r = parseCliArgs([
			'--mode',
			'auto',
			'--actor',
			'a',
			'--event',
			'commit',
			'--last-commit'
		]);
		expect(r.ok && r.lastCommit).toBe(true);
	});

	it('reports a missing or invalid flag', () => {
		expect(parseCliArgs(['--mode', 'auto']).ok).toBe(false);
		expect(parseCliArgs(['--mode', 'x', '--actor', 'a', '--event', 'info']).ok).toBe(false);
		expect(parseCliArgs(['--mode', 'auto', '--actor', 'a', '--event', 'zzz']).ok).toBe(false);
	});
});

describe('appendAgentLog', () => {
	let dir: string;
	beforeEach(() => {
		dir = mkdtempSync(join(tmpdir(), 'agent-log-'));
	});
	afterEach(() => {
		rmSync(dir, { recursive: true, force: true });
		vi.restoreAllMocks();
		delete process.env.AGENT_LOG_DIR;
	});

	it('appends one line per event to the month file, creating the folder', () => {
		const logs = join(dir, 'nested', 'logs');
		const now = new Date('2026-10-02T09:15:00Z');
		expect(
			appendAgentLog(
				{ mode: 'auto', actor: 'daily-guard', event: 'run-start', detail: 'a=1' },
				{ dir: logs, now }
			)
		).toBe(true);
		appendAgentLog({ mode: 'auto', actor: 'daily-guard', event: 'run-end' }, { dir: logs, now });
		const lines = readFileSync(join(logs, '2026-10.log'), 'utf8').trimEnd().split('\n');
		expect(lines).toHaveLength(2);
		expect(lines[0]).toBe('2026-10-02 11:15 | auto | daily-guard | run-start | a=1');
	});

	it('honours AGENT_LOG_DIR', () => {
		process.env.AGENT_LOG_DIR = dir;
		appendAgentLog({ mode: 'demanda', actor: 'x', event: 'info' }, { now: new Date() });
		const files = readFileSync(join(dir, monthFile(new Date()).split('/').pop() as string), 'utf8');
		expect(files).toContain('| x | info |');
	});

	it('never throws: a failure warns once on stderr and returns false', () => {
		const blocker = join(dir, 'file');
		writeFileSync(blocker, 'not a folder');
		const warn = vi.spyOn(console, 'error').mockImplementation(() => {});
		const ok = appendAgentLog(
			{ mode: 'auto', actor: 'x', event: 'info' },
			{ dir: join(blocker, 'logs') }
		);
		expect(ok).toBe(false);
		expect(warn).toHaveBeenCalledTimes(1);
		expect(String(warn.mock.calls[0][0])).toContain('[agent-log]');
	});

	it('never throws on an invalid event either', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		// @ts-expect-error invalid event on purpose
		expect(appendAgentLog({ mode: 'auto', actor: 'x', event: 'nope' }, { dir })).toBe(false);
		expect(existsSync(join(dir, 'x'))).toBe(false);
	});
});
