# 📚 Personal blogging site
This repository hosts my personal blogging site over at [jefmeijvis.com](https://www.jefmeijvis.com)

![Homepage screenshot 22 June 2024](/docs/preview.png)
# ⚙️ Tech stack
The website is build using [Sveltekit](https://kit.svelte.dev/).
All content is written in markdown, with the images stored in a folder next to each *index.md* file. 
The following node packages are essential to the current setup:
- [svelte-markdown](https://www.npmjs.com/package/svelte-markdown) as a markdown parser for Svelte, which allows me to express each different type of markdown syntax as a distinct Svelte component. You can view these over at [/src/lib/components/markdown-renderers](https://github.com/jefmeijvis/www.jefmeijvis.com/tree/master/src/lib/components/markdown-renderers).
- [front-matter](https://www.npmjs.com/package/front-matter) to extract metadata from markdown files.
- [shiki](https://github.com/shikijs/shiki) as syntax highlighter for code blocks.
- [mathlifier](https://www.npmjs.com/package/mathlifier) to render LaTeX math equations into HTML. 

# 💻 Contributing
Feel free to open an issue or submit a PR if you feel like something needs to be different! 
All the content is written in markdown and is stored in this repository under [/content](https://github.com/jefmeijvis/www.jefmeijvis.com/tree/master/content)

# 📝 emoticon test