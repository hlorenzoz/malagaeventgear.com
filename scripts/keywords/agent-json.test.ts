import { describe, it, expect } from 'vitest';
import {
	agentMarkdownToJson,
	agentsMarkdownToJson,
	resolveAgentPath,
	resolveAgentPaths
} from './agent-json';

const AGENT_MD = `---
name: ubersuggest-analyst
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
		expect(Object.keys(json)).toEqual(['ubersuggest-analyst']);
		const agent = json['ubersuggest-analyst'];
		expect(agent.description).toBe('Daily keyword discovery. Discovers and measures only.');
		expect(agent.model).toBe('sonnet');
		expect(agent.tools).toEqual(['Read', 'Write', 'mcp__ubersuggest__user_limits']);
	});

	it('uses the markdown body, without the frontmatter, as the prompt', () => {
		const agent = agentMarkdownToJson(AGENT_MD)['ubersuggest-analyst'];
		expect(agent.prompt.startsWith('You are the **Keyword Researcher**.')).toBe(true);
		expect(agent.prompt).toContain('1. Do the thing.');
		expect(agent.prompt).not.toContain('model: sonnet');
	});

	it('throws when the file has no frontmatter or no name', () => {
		expect(() => agentMarkdownToJson('just a body')).toThrow();
		expect(() => agentMarkdownToJson('---\ndescription: x\n---\nbody')).toThrow();
	});
});

describe('the real ubersuggest-analyst agent file', () => {
	const files = import.meta.glob('/.claude/agents/ubersuggest-analyst.md', {
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
		const agent = agentMarkdownToJson(md)['ubersuggest-analyst'];
		const mcpTools = agent.tools.filter((t) => t.startsWith('mcp__ubersuggest__'));
		expect(mcpTools.length).toBeGreaterThan(0);
		for (const tool of mcpTools) expect(justfile).toContain(tool);
	});
});

describe('resolveAgentPath', () => {
	it('defaults to the keyword researcher', () => {
		expect(resolveAgentPath(undefined, '/repo')).toBe(
			'/repo/.claude/agents/ubersuggest-analyst.md'
		);
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
		// Raised from 4 to 10 on 2026-10-02: the 09:30 plan run spent 3.85 USD of the old cap.
		expect(run).toContain('--max-budget-usd 10');
		expect(run).not.toContain('--max-budget-usd 4 ');
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

	it('content-plan-commit stages keywords.json and the plan, then hands the task list to todo-commit', () => {
		const commit = recipe('content-plan-commit plan:');
		expect(commit).toContain('--no-verify');
		expect(commit).toContain('just todo-commit');
		// TODO.json is committed only through todo-commit (which validates it), never staged here.
		expect(commit).not.toMatch(/git (add|commit)[^\n]*TODO\.json/);
	});

	it('todo-commit commits only a changed, schema valid TODO.json (user decision, 2026-10-02)', () => {
		const commit = recipe('todo-commit message=');
		expect(commit).toContain('--no-verify');
		expect(commit).toContain('scripts/todo/todo.ts list');
		expect(commit).toMatch(/git add -- \.agents\/data\/TODO\.json\n/);
		expect(commit).toMatch(/git commit --no-verify -m "\$msg" -- \.agents\/data\/TODO\.json\n/);
		// The message reaches the script as a positional argument, never interpolated into it: just
		// pastes `{{ message }}` as text, so a quote in it would break out of the string (found with
		// a throwaway repo on 2026-10-02) and run as shell.
		expect(justfile).toContain('[positional-arguments]\ntodo-commit message=');
		expect(commit).not.toContain('{{ message }}');
		expect(commit).toContain('msg="$1"');
		// Nothing else is ever staged or pushed from here.
		expect(commit).not.toMatch(/git add -A|git add \.|keywords\.json|git push/);
		// Validation runs before the add, and an unchanged file exits without a commit.
		expect(commit.indexOf('todo.ts list')).toBeLessThan(commit.indexOf('git add'));
		expect(commit).toMatch(/git diff --quiet -- \.agents\/data\/TODO\.json/);
		// The message is checked so a caller cannot smuggle shell into the commit command.
		expect(commit).toMatch(/chore\\\(todo\\\)/);
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

describe('the real faq-researcher agent file and its headless run', () => {
	const files = import.meta.glob('/.claude/agents/faq-researcher.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;
	const md = readRaw(files);

	it('lists exactly the one Ubersuggest tool the scheduled run allows, and no reports-spending tool', () => {
		const agent = agentMarkdownToJson(md)['faq-researcher'];
		const mcp = agent.tools.filter((t) => t.startsWith('mcp__'));
		expect(mcp).toEqual(['mcp__ubersuggest__google_suggestions']);
		const run = recipe('faq-research:');
		for (const tool of agent.tools) expect(run, tool).toContain(tool);
	});

	it('is isolated like the other agents, writes only under faqs/ and never touches git history', () => {
		const run = recipe('faq-research:');
		expect(run).toContain('--setting-sources ""');
		expect(run).toContain('--strict-mcp-config');
		expect(run).toContain('--permission-mode default');
		expect(run).toContain('agent-json.ts faq-researcher');
		expect(run).toContain('Write(.agents/context/keywords/faqs/**)');
		expect(run).not.toMatch(/--allowedTools[^\n]*Bash\(git/);
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

	it('the analyst no longer has google_suggestions, so each source has one owner', () => {
		const analyst = agentMarkdownToJson(
			readRaw(
				import.meta.glob('/.claude/agents/ubersuggest-analyst.md', {
					query: '?raw',
					import: 'default',
					eager: true
				}) as Record<string, string>
			)
		)['ubersuggest-analyst'];
		expect(analyst.tools).not.toContain('mcp__ubersuggest__google_suggestions');
		expect(recipe('keywords-research:')).not.toContain('google_suggestions');
	});

	it('faqs-commit stages only keywords.json and the FAQ batch', () => {
		const commit = recipe('faqs-commit batch:');
		expect(commit).toContain('--no-verify');
		expect(commit).toContain('.agents/data/keywords.json');
		expect(commit).not.toMatch(/TODO/);
	});
});

describe('agentsMarkdownToJson', () => {
	const other = AGENT_MD.replace('ubersuggest-analyst', 'faq-researcher').replace(
		'tools: Read, Write, mcp__ubersuggest__user_limits',
		'tools: Read, Glob'
	);

	it('merges several agents in one object, each keyed by its name', () => {
		const json = agentsMarkdownToJson([AGENT_MD, other]);
		expect(Object.keys(json)).toEqual(['ubersuggest-analyst', 'faq-researcher']);
		expect(json['faq-researcher'].tools).toEqual(['Read', 'Glob']);
	});

	it('with one agent returns exactly what agentMarkdownToJson returns (backward compatible)', () => {
		expect(agentsMarkdownToJson([AGENT_MD])).toEqual(agentMarkdownToJson(AGENT_MD));
	});

	it('throws when two files declare the same agent name', () => {
		expect(() => agentsMarkdownToJson([AGENT_MD, AGENT_MD])).toThrow(/ubersuggest-analyst/);
	});
});

describe('resolveAgentPaths', () => {
	it('with no argument keeps the single default agent', () => {
		expect(resolveAgentPaths([], '/repo')).toEqual(['/repo/.claude/agents/ubersuggest-analyst.md']);
	});

	it('resolves every name, in order', () => {
		expect(resolveAgentPaths(['a', 'b'], '/repo')).toEqual([
			'/repo/.claude/agents/a.md',
			'/repo/.claude/agents/b.md'
		]);
	});
});

const TODO_TEAM = [
	'todo-implementer',
	'post-writer',
	'post-translator',
	'post-verifier',
	'serp-term-researcher'
];

/** Pure: the top level, comma separated entries of a `--allowedTools` style string. */
function splitTools(list: string): string[] {
	const out: string[] = [];
	let depth = 0;
	let current = '';
	for (const ch of list) {
		if (ch === '(') depth++;
		if (ch === ')') depth--;
		if (ch === ',' && depth === 0) {
			out.push(current.trim());
			current = '';
		} else current += ch;
	}
	if (current.trim()) out.push(current.trim());
	return out;
}

describe('the todo-implementer team (todo-implement headless run)', () => {
	const agentFiles = import.meta.glob('/.claude/agents/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;
	const team = TODO_TEAM.map((name) => agentFiles[`/.claude/agents/${name}.md`]);
	const run = recipe('todo-implement *args:');
	const allowed = splitTools(/ALLOWED_TOOLS="([^"]+)"/.exec(run)?.[1] ?? '');
	const allowedNames = new Set(allowed.map((t) => t.replace(/\(.*$/, '')));

	it('has the five agent files, each with a name that matches its file and a description', () => {
		TODO_TEAM.forEach((name, i) => {
			expect(team[i], `${name}.md exists`).toBeTruthy();
			const agent = agentMarkdownToJson(team[i])[name];
			expect(agent, `${name} is keyed by its name`).toBeTruthy();
			expect(agent.description.length).toBeGreaterThan(40);
			expect(agent.tools.length).toBeGreaterThan(0);
		});
	});

	it('bundles the five agents in one --agents JSON and runs the orchestrator as main agent', () => {
		expect(run).toContain(`agent-json.ts ${TODO_TEAM.join(' ')}`);
		expect(run).toContain('--agent todo-implementer');
		expect(run).toContain('--model sonnet');
	});

	it('mirrors the isolation flags of content-plan with an empty MCP config', () => {
		expect(run).toContain('--setting-sources ""');
		expect(run).toContain('--strict-mcp-config');
		expect(run).toContain(`--mcp-config '{"mcpServers":{}}'`);
		expect(run).toContain('--permission-mode default');
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

	it('allows every tool name the five agents list, and nothing like push or deploy', () => {
		expect(allowed.length).toBeGreaterThan(0);
		TODO_TEAM.forEach((name, i) => {
			for (const tool of agentMarkdownToJson(team[i])[name].tools) {
				expect(allowedNames.has(tool), `${name}: ${tool}`).toBe(true);
			}
		});
		expect(allowed.join(' ')).not.toMatch(/git push|deploy|migrate|post-images|migrate-wp/);
	});

	it('limits Write and Edit to the blog, its generated data, the content map, the changelog and the SERP term files', () => {
		const writes = allowed.filter((t) => /^(Write|Edit)\(/.test(t));
		expect(writes.length).toBeGreaterThan(0);
		const allowedRoots = [
			'src/content/blog/**',
			'src/lib/data/post-faqs.json',
			'src/lib/data/post-toc.json',
			'src/lib/i18n/content-map/**',
			'.agents/CHANGELOG.md',
			'.agents/context/keywords/nlp-terms/**'
		];
		for (const w of writes) {
			expect(
				allowedRoots.some((r) => w.endsWith(`(${r})`)),
				w
			).toBe(true);
		}
		expect(allowed).not.toContain('Write');
		expect(allowed).not.toContain('Edit');
		expect(allowed).not.toContain('Bash');
	});

	it('pairs every Write rule with an Edit rule on the same path (the CLI only honors the Edit rule for the Write tool)', () => {
		// Verified 2026-10-02 with a headless run: `--allowedTools "Write(path)"` alone was denied,
		// `Edit(path)` alone let the Write tool create the file.
		const paths = (kind: string) =>
			allowed.filter((t) => t.startsWith(`${kind}(`)).map((t) => t.slice(kind.length));
		const editPaths = new Set(paths('Edit'));
		for (const p of paths('Write')) expect(editPaths.has(p), `Edit${p} next to Write${p}`).toBe(true);
	});

	it('never lets the agents touch git history beyond add and commit, nor TODO.json', () => {
		const git = allowed.filter((t) => t.startsWith('Bash(git'));
		for (const g of git) expect(g).toMatch(/^Bash\(git (status|diff|log|show|add|commit)/);
		expect(run).not.toMatch(/Write\([^)]*TODO/);
		expect(run).toContain('--max-budget-usd');
		expect(run).toContain('TODO_IMPLEMENT_BUDGET');
	});

	it('the verifier has no Write or Edit (read only by capability) and only the orchestrator spawns agents', () => {
		const tools = (name: string) => agentMarkdownToJson(team[TODO_TEAM.indexOf(name)])[name].tools;
		expect(tools('post-verifier')).not.toContain('Write');
		expect(tools('post-verifier')).not.toContain('Edit');
		expect(tools('todo-implementer')).toContain('Agent');
		for (const worker of [
			'post-writer',
			'post-translator',
			'post-verifier',
			'serp-term-researcher'
		]) {
			expect(tools(worker)).not.toContain('Agent');
		}
	});

	it('only the serp-term-researcher can reach the web, and it cannot edit the site', () => {
		const tools = (name: string) => agentMarkdownToJson(team[TODO_TEAM.indexOf(name)])[name].tools;
		expect(allowed).toContain('WebSearch');
		expect(allowed).toContain('WebFetch');
		expect(tools('serp-term-researcher')).toEqual(
			expect.arrayContaining(['WebSearch', 'WebFetch', 'Write', 'Read'])
		);
		expect(tools('serp-term-researcher')).not.toContain('Edit');
		for (const name of TODO_TEAM.filter((n) => n !== 'serp-term-researcher')) {
			expect(tools(name), name).not.toContain('WebSearch');
			expect(tools(name), name).not.toContain('WebFetch');
		}
	});

	it('hands the SERP terms from the researcher to the writer through the validator', () => {
		expect(allowed).toContain('Bash(just nlp-terms-check:*)');
		expect(recipe('nlp-terms-check file:')).toContain('scripts/keywords/nlp-terms-check.ts');
		const text = (name: string) => team[TODO_TEAM.indexOf(name)];
		expect(text('todo-implementer')).toContain('serp-term-researcher');
		expect(text('todo-implementer')).toContain('just nlp-terms-check');
		expect(text('post-writer')).toContain('SERP terms');
		expect(text('serp-term-researcher')).toContain('just nlp-terms-check');
	});

	it('tells the researcher to write with the repo relative path, never an absolute one', () => {
		// The project folder name has brackets, and a model that rebuilds the absolute path drops
		// them, so the write misses the permission rule (seen in the 2026-10-02 smoke test).
		const text = team[TODO_TEAM.indexOf('serp-term-researcher')];
		expect(text).toContain('repo relative path');
		expect(text).toMatch(/never an absolute path/i);
	});

	it('dry-run never calls claude: it only prints the command and runs just todo-next', () => {
		expect(run).toContain('--dry-run');
		expect(run).toContain('just todo-next');
	});

	it('logs the run (demanda) around claude, prints its json and keeps its exit code', () => {
		expect(run).toContain('AGENT_LOG_MODE=demanda');
		expect(run).toMatch(/"\$\{cmd\[@\]\}" > "\$claude_json" \|\| code=\$\?/);
		expect(run).toContain('cat "$claude_json"');
		expect(run).toContain('exit "$code"');
		expect(run).toContain('scripts/log/todo-implement-log.ts start');
		expect(run).toContain('scripts/log/todo-implement-log.ts end');
		// A logging failure never changes the recipe outcome.
		expect(run).toMatch(/todo-implement-log\.ts end[^\n]*\|\| true/);
	});

	it('the dry-run branch exits before any log call, so a dry run never writes the log', () => {
		const dryExit = run.indexOf('exit 0');
		expect(dryExit).toBeGreaterThan(0);
		expect(run.indexOf('todo-implement-log.ts start')).toBeGreaterThan(dryExit);
	});

	it('todo-implement-commit commits keywords.json, then hands the task list to todo-commit', () => {
		const commit = recipe('todo-implement-commit task slug:');
		expect(commit).toContain('--no-verify');
		expect(commit).toContain('.agents/data/keywords.json');
		expect(commit).toContain('just todo-commit');
		expect(commit).not.toMatch(/git (add|commit)[^\n]*TODO\.json/);
		// An unchanged keywords.json must not skip the task list: no early exit before todo-commit.
		expect(commit).not.toMatch(/exit 0/);
	});

	it('the orchestrator may run todo-commit and is told to commit TODO.json only through it', () => {
		expect(allowed).toContain('Bash(just todo-commit:*)');
		const orchestrator = team[TODO_TEAM.indexOf('todo-implementer')];
		expect(orchestrator).toContain('just todo-commit');
		expect(orchestrator).not.toMatch(/NEVER commit `\.agents\/data\/TODO\.json`/);
		expect(orchestrator).toMatch(/never `git add` or `git commit` it\s+yourself/i);
	});
});

describe('the daily agents know how to call tools in a headless run', () => {
	// The 2026-10-02 09:30 run lost turns (and money) to denied calls: `cd "..." && just ...`,
	// scratch scripts in /tmp, python, git status, and reading a saved tool result from outside
	// the repo. The todo-implementer already says it, the three daily agents did not.
	const DAILY = ['ubersuggest-analyst', 'faq-researcher', 'content-strategist'];
	const files = import.meta.glob('/.claude/agents/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	for (const name of DAILY) {
		it(`${name} has the one command per call rules`, () => {
			const text = files[`/.claude/agents/${name}.md`];
			expect(text, `${name}.md exists`).toBeTruthy();
			expect(text).toContain('## How to call tools in this run');
			expect(text).toContain('ONE command per Bash call');
			expect(text).toMatch(/Never `cd`/);
			expect(text).toMatch(/scratch scripts/);
			expect(text).toMatch(/saved to a file outside the repository/);
		});
	}
});
