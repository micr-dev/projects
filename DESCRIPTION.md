# Description Rules

Use this file when writing portfolio descriptions for repository entries in this site.

## Goal

Each project description should read like a concise explanation from a senior engineer who actually built the thing.

The writing should be grounded, specific, and easy to scan. It should not sound like marketing copy, README boilerplate, or AI filler.

## Structure

Every description must have exactly 3 paragraphs.

### Paragraph 1: What

Explain what the project is in concrete terms.

Good targets:

- what the repo is
- what it does
- what kind of system, tool, site, hardware project, MCP, or skill it is

### Paragraph 2: Why

Explain the need, constraint, or use case that made it necessary.

Good targets:

- the problem it solves
- the limitation in existing tools or workflows
- the use case that justified building it

### Paragraph 3: How

Explain how the project approaches the problem in practice.

Good targets:

- implementation character
- system shape
- technical angle
- workflow or design choices

The third paragraph should be slightly shorter than the first two.

## Tone

- Use normal capitalization and punctuation.
- Be direct.
- Prefer concrete nouns over abstract praise.
- Prefer explanation over self-congratulation.
- Sound like an engineer describing real work.

## Length

- Keep each paragraph short.
- Paragraphs should be similar in length.
- The third paragraph should be a bit tighter than the others.
- A good target is 2 sentences per paragraph, but 1 sentence is acceptable when it is dense and specific.

## Avoid

Do not use these phrases or anything too close to them:

- what makes it worth showing
- the reason to show it
- it was built to
- it does that by

Do not rely on repeated openers across repos.

Do not use:

- hype
- branding language
- vague praise
- moralizing language
- filler like "innovative", "powerful", "seamless", "comprehensive", or "robust" unless the README itself proves a very specific meaning

## Source Priority

Use the highest-confidence first-party source available.

1. Repo README
2. Repo docs linked from the README
3. Repo description or first-party project page
4. Parent repo section when the displayed entry is a subproject and does not have its own repo

If the repo path in metadata is stale or unresolved, do not invent details. Use the nearest first-party source and stay conservative.

## Languages Line

Each project entry must also carry a `Languages:` line.

Rules:

- Use the GitHub languages list when available.
- Keep the list concise.
- Prefer the top 1 to 4 languages.
- Drop low-signal entries when they distract from the actual stack.
- Use readable names exactly as they should appear to users.

Examples:

- `Languages: TypeScript, CSS, MDX`
- `Languages: Rust`
- `Languages: KiCad, CAD`

## Output Contract

For each repo, produce:

- `paragraphs`: array of 3 strings
- `languages`: array of display strings

The copy must be ready to ship without additional cleanup.
