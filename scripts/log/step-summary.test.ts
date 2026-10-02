import { describe, expect, it } from 'vitest';
import {
	formatMinutes,
	runEndDetail,
	stepFailedDetail,
	stepDoneDetail,
	summarizeFaqs,
	summarizePlan,
	summarizeResearch
} from './step-summary';

describe('summarizeResearch', () => {
	it('counts keywords, faqs, ai prompts and the run status', () => {
		const batch = {
			run: { status: 'ok' },
			keywords: [{}, {}, {}],
			faqs: [{}],
			aiPrompts: [{}, {}],
			discarded: [{}]
		};
		expect(summarizeResearch(batch)).toBe('keywords=3 faqs=1 ai_prompts=2 discarded=1 status=ok');
	});

	it('survives a malformed batch', () => {
		expect(summarizeResearch(null)).toBe('counts=unreadable');
		expect(summarizeResearch({ run: {} })).toBe('keywords=0 faqs=0 ai_prompts=0 discarded=0');
	});
});

describe('summarizeFaqs', () => {
	it('counts the raw suggestions and the status', () => {
		expect(summarizeFaqs({ run: { status: 'partial' }, suggestions: [{}, {}] })).toBe(
			'suggestions=2 status=partial'
		);
	});

	it('survives a malformed batch', () => {
		expect(summarizeFaqs('x')).toBe('counts=unreadable');
	});
});

describe('summarizePlan', () => {
	it('counts the plan items by action, always listing the four actions', () => {
		const plan = {
			items: [
				{ action: 'add-faq' },
				{ action: 'add-faq' },
				{ action: 'skip' },
				{ action: 'new-post' }
			]
		};
		expect(summarizePlan(plan)).toBe('items=4 add-section=0 new-post=1 add-faq=2 skip=1');
	});

	it('survives a malformed plan', () => {
		expect(summarizePlan({})).toBe('counts=unreadable');
	});
});

describe('formatMinutes', () => {
	it('is minutes with one decimal', () => {
		expect(formatMinutes(0)).toBe('0.0');
		expect(formatMinutes(90_000)).toBe('1.5');
		expect(formatMinutes(28 * 60_000)).toBe('28.0');
	});
});

describe('stepDoneDetail and stepFailedDetail', () => {
	it('joins file, summary and minutes', () => {
		expect(stepDoneDetail('a/b.json', 'keywords=3', 83_000)).toBe(
			'file=a/b.json keywords=3 minutes=1.4'
		);
	});

	it('omits the summary when there is none', () => {
		expect(stepDoneDetail('a/b.json', '', 60_000)).toBe('file=a/b.json minutes=1.0');
	});

	it('states why a step failed', () => {
		expect(stepFailedDetail('exit code 1', 60_000)).toBe('reason="exit code 1" minutes=1.0');
	});
});

describe('runEndDetail', () => {
	it('is ok when every agent step is done', () => {
		expect(runEndDetail({ done: ['research', 'faqs'], failed: [], ms: 120_000 })).toBe(
			'result=ok done=research,faqs failed=none minutes=2.0'
		);
	});

	it('is partial when something failed', () => {
		expect(runEndDetail({ done: ['research'], failed: ['plan'], ms: 60_000 })).toBe(
			'result=partial done=research failed=plan minutes=1.0'
		);
	});

	it('is failed when nothing was done', () => {
		expect(runEndDetail({ done: [], failed: ['research'], ms: 0 })).toBe(
			'result=failed done=none failed=research minutes=0.0'
		);
	});
});
