#!/usr/bin/env bun
/**
 * agent-json.ts: prints `.claude/agents/<name>.md` (default `ubersuggest-analyst`) as the JSON that
 * `claude --agents` takes. The scheduled run uses `--setting-sources ""` so that no settings
 * allowlist leaks into its permissions, and that also stops the CLI from loading project agents.
 * Converting the file on every run keeps the markdown as the only source of the agent.
 *
 * Usage: `bun scripts/keywords/agent-json.ts [name-or-path]` (used by `just keywords-research` with
 * no argument and by `just content-plan` with `content-strategist`). A bare name resolves to
 * `.claude/agents/<name>.md`, anything with a `/` or ending in `.md` is taken as a path.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface AgentJson {
	description: string;
	prompt: string;
	model?: string;
	tools: string[];
}

/** Pure: parses the small frontmatter shape our agent files use (`key: value` lines and one
 *  folded `key: >` block), never a full YAML document. */
function parseFrontmatter(block: string): Record<string, string> {
	const fields: Record<string, string> = {};
	const lines = block.split('\n');
	for (let i = 0; i < lines.length; i++) {
		const match = /^([a-zA-Z_-]+):\s*(.*)$/.exec(lines[i]);
		if (!match) continue;
		const [, key, value] = match;
		if (value === '>' || value === '|') {
			const folded: string[] = [];
			while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) folded.push(lines[++i].trim());
			fields[key] = folded.join(' ');
		} else {
			fields[key] = value.trim();
		}
	}
	return fields;
}

/** Pure: agent markdown to `{ [name]: { description, prompt, model, tools } }`. */
export function agentMarkdownToJson(markdown: string): Record<string, AgentJson> {
	const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(markdown);
	if (!match) throw new Error('agent file has no frontmatter');
	const fields = parseFrontmatter(match[1]);
	if (!fields.name) throw new Error('agent frontmatter has no name');
	return {
		[fields.name]: {
			description: fields.description ?? '',
			prompt: match[2].trim(),
			...(fields.model ? { model: fields.model } : {}),
			tools: (fields.tools ?? '')
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean)
		}
	};
}

/** Pure: the agent file a CLI argument points to. */
export function resolveAgentPath(arg: string | undefined, cwd: string): string {
	const target = arg || 'ubersuggest-analyst';
	if (target.includes('/') || target.endsWith('.md')) return join(cwd, target);
	return join(cwd, '.claude/agents', `${target}.md`);
}

if (import.meta.main) {
	const path = resolveAgentPath(process.argv[2], process.cwd());
	console.log(JSON.stringify(agentMarkdownToJson(readFileSync(path, 'utf8'))));
}
