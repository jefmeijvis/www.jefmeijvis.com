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


## Page view counts

Set `PAGEVIEWS_API_KEY` in the build environment (or `.env` locally). The build fetches `https://services.admin.jefmeijvis.com/api/pageviews` with the `X-API-Key` header and embeds counts in blog cards. Counts refresh on every deployment; the key stays server-side. Paths are matched without case, query strings, fragments, or trailing slashes.

Without a key, local builds omit counts. With a key, an API error fails the build to prevent silently publishing missing counts.

Docker deployments require a BuildKit secret, supplied from the deployment platform's secret settings:

```sh
docker buildx build --no-cache-filter build --secret id=PAGEVIEWS_API_KEY,env=PAGEVIEWS_API_KEY -t personal-blog .
```

Keep the key out of source control.

The `--no-cache-filter build` flag reruns the build stage even when source files are unchanged, ensuring each deployment fetches fresh counts.
