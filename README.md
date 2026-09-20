# 📚 Personal blogging site

This repository hosts my personal blogging site over at [jefmeijvis.com](https://www.jefmeijvis.com)

![Homepage screenshot 22 June 2024](/docs/preview.png)

# ⚙️ Tech stack

The website is built with [SvelteKit](https://kit.svelte.dev/) and generated as a static site.
Content lives in `content/<post>/index.md`, with each post's images beside it. During a build:

- `front-matter` reads post metadata.
- `marked` converts trusted Markdown to HTML.
- `shiki` highlights code and `mathlifier` renders maths at build time.
- SvelteKit prerenders pages and RSS into `build/`.

The resulting site needs no database, Node.js server, or runtime Markdown processing. The included Docker image serves `build/` with Nginx.

## Commands

- `pnpm dev` starts local development.
- `pnpm check` runs Svelte and TypeScript checks.
- `pnpm test:smoke` builds the complete site and verifies all generated pages.

# 💻 Contributing

Feel free to open an issue or submit a PR if you feel like something needs to be different!
All the content is written in markdown and is stored in this repository under [/content](https://github.com/jefmeijvis/www.jefmeijvis.com/tree/master/content)

