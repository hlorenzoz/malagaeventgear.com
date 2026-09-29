import { describe, it, expect } from 'vitest';
import { agentMarkdownToJson } from './agent-json';

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
