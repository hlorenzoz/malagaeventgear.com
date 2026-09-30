import { describe, it, expect } from 'vitest';
import { agentMarkdownToJson, resolveAgentPath } from './agent-json';

const AGENT_MD = `---
name: keyword-researcher
description: >
  Daily keyword discovery.
  Discovers and measures only.
model: sonnet
tools: Read, Write, mcp__ubersuggest__user_limits
---

You are the **Keyword Researcher**.

## Procedure

1. Do the thing.
`;

describe('agentMarkdownToJson', () => {
	it('keys the agent by its name and keeps description, model and tools from the frontmatter', () => {
		const json = agentMarkdownToJson(AGENT_MD);
		expect(Object.keys(json)).toEqual(['keyword-researcher']);
		const agent = json['keyword-researcher'];
		expect(agent.description).toBe('Daily keyword discovery. Discovers and measures only.');
		expect(agent.model).toBe('sonnet');
		expect(agent.tools).toEqual(['Read', 'Write', 'mcp__ubersuggest__user_limits']);
	});

	it('uses the markdown body, without the frontmatter, as the prompt', () => {
		const agent = agentMarkdownToJson(AGENT_MD)['keyword-researcher'];
		expect(agent.prompt.startsWith('You are the **Keyword Researcher**.')).toBe(true);
		expect(agent.prompt).toContain('1. Do the thing.');
		expect(agent.prompt).not.toContain('model: sonnet');
	});

	it('throws when the file has no frontmatter or no name', () => {
		expect(() => agentMarkdownToJson('just a body')).toThrow();
		expect(() => agentMarkdownToJson('---\ndescription: x\n---\nbody')).toThrow();
	});
});

describe('the real keyword-researcher agent file', () => {
	const files = import.meta.glob('/.claude/agents/keyword-researcher.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;
	const md = Object.values(files)[0];

	it('converts, and every Ubersuggest tool it lists is one the scheduled run allows', () => {
		const justfiles = import.meta.glob('/Justfile', {
			query: '?raw',
			import: 'default',
			eager: true
		}) as Record<string, string>;
		const justfile = Object.values(justfiles)[0];
		const agent = agentMarkdownToJson(md)['keyword-researcher'];
		const mcpTools = agent.tools.filter((t) => t.startsWith('mcp__ubersuggest__'));
		expect(mcpTools.length).toBeGreaterThan(0);
		for (const tool of mcpTools) expect(justfile).toContain(tool);
	});
});

describe('resolveAgentPath', () => {
	it('defaults to the keyword researcher', () => {
		expect(resolveAgentPath(undefined, '/repo')).toBe('/repo/.claude/agents/keyword-researcher.md');
	});

	it('resolves a bare name and takes a path as is', () => {
		expect(resolveAgentPath('content-strategist', '/repo')).toBe(
			'/repo/.claude/agents/content-strategist.md'
		);
		expect(resolveAgentPath('agents/x.md', '/repo')).toBe('/repo/agents/x.md');
	});
});

const readRaw = (glob: Record<string, string>) => Object.values(glob)[0];
const justfile = readRaw(
	import.meta.glob('/Justfile', { query: '?raw', import: 'default', eager: true }) as Record<
		string,
		string
	>
);

function recipe(name: string): string {
	const start = justfile.indexOf(`\n${name}`);
	expect(start, `recipe ${name} exists`).toBeGreaterThan(-1);
	const rest = justfile.slice(start + 1);
	const end = rest.search(/\n\S[^\n]*\n|\n#/);
	return end > 0 ? rest.slice(0, end) : rest;
}

describe('the real content-strategist agent file', () => {
	const files = import.meta.glob('/.claude/agents/content-strategist.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;
	const md = readRaw(files);

	// The orchestrator writes this file: skip until it exists.
	it.skipIf(!md)('lists only tools that the scheduled content-plan run allows', () => {
		const agent = agentMarkdownToJson(md)['content-strategist'];
		expect(agent.tools.length).toBeGreaterThan(0);
		const run = recipe('content-plan:');
		for (const tool of agent.tools) expect(run, tool).toContain(tool);
	});
});

describe('the content-plan headless run and its scheduler', () => {
	it('mirrors the keywords-research isolation flags with an empty MCP config', () => {
		const run = recipe('content-plan:');
		expect(run).toContain('--setting-sources ""');
		expect(run).toContain('--strict-mcp-config');
		expect(run).toContain(`--mcp-config '{"mcpServers":{}}'`);
		expect(run).toContain('--permission-mode default');
		expect(run).toContain('--agent content-strategist');
		expect(run).toContain('agent-json.ts content-strategist');
		expect(run).toContain('--max-budget-usd 4');
		for (const denied of [
			'git push',
			'git reset',
			'git checkout',
			'git stash',
			'git restore',
			'rm'
		]) {
			expect(run).toContain(`Bash(${denied}:*)`);
		}
	});

	it('never lets the agent write outside the content plan folder or push', () => {
		const run = recipe('content-plan:');
		expect(run).toContain('Write(.agents/context/keywords/content-plan/**)');
		expect(run).not.toMatch(/--allowedTools[^\n]*Bash\(git/);
	});

	it('content-plan-commit never stages the task list', () => {
		const commit = recipe('content-plan-commit plan:');
		expect(commit).toContain('--no-verify');
		expect(commit).not.toMatch(/TODO/);
	});

	it('keywords-daily delegates to the daily guard, which runs research then plan', () => {
		const daily = recipe('keywords-daily');
		expect(daily).toContain('scripts/keywords/daily-guard.ts');
		expect(daily).toContain('{{ args }}');
	});

	it('the launchd template runs keywords-daily', () => {
		const plist = readRaw(
			import.meta.glob('/scripts/keywords/launchd/*.plist', {
				query: '?raw',
				import: 'default',
				eager: true
			}) as Record<string, string>
		);
		expect(plist).toContain('just keywords-daily');
		expect(plist).not.toContain('just keywords-research');
		expect(plist).toContain('<key>RunAtLoad</key>\n\t<true/>');
		expect(plist).toContain('<key>StartInterval</key>');
	});
});
