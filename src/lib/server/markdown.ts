import { marked } from 'marked';
import { codeToHtml } from 'shiki';
import { display } from 'mathlifier';

const codeFence = /```([^\n]*)\n([\s\S]*?)```/g;

/** Content is authored in this repository, so preserving its embedded HTML is intentional. */
export async function renderMarkdown(markdown: string, slug: string): Promise<string> {
    const renderedCode: string[] = [];
    let cursor = 0;
    let source = '';

    for (const match of markdown.matchAll(codeFence)) {
        source += markdown.slice(cursor, match.index);
        cursor = (match.index ?? 0) + match[0].length;

        const language = match[1].trim() || 'text';
        const code = match[2];
        const html = language === 'math'
            ? display(code)
            : await codeToHtml(code, {
                lang: normaliseLanguage(language),
                themes: { light: 'github-light', dark: 'github-dark' },
                defaultColor: false
            });

        const placeholder = `<!-- rendered-code-${renderedCode.length} -->`;
        renderedCode.push(`<div class="markdown-code" data-language="${escapeAttribute(language)}">${html}</div>`);
        source += `\n${placeholder}\n`;
    }
    source += markdown.slice(cursor);

    const renderer = new marked.Renderer();
    renderer.image = ({ href, title, text }) => renderImage(href, title, text, slug);
    renderer.heading = ({ depth, text }) =>
        `<h${depth} id="${escapeAttribute(slugify(text))}">${text}</h${depth}>\n`;
    let html = await marked.parse(source, { async: true, gfm: true, renderer });
    renderedCode.forEach((block, index) => {
        html = html.replace(`<!-- rendered-code-${index} -->`, block);
    });
    return html.replace(/<p>(<figure>[\s\S]*?<\/figure>)<\/p>/g, '$1');
}

function renderImage(href: string, title: string | null, text: string, slug: string): string {
    const size = text.match(/\[(small|medium)\]/)?.[1];
    const alt = text.replace(/\s*\[(small|medium)\]/, '');
    const src = href.startsWith('/') ? href : `/content/${slug}/${href}`;
    const style = size === 'small' ? ' style="width:25%"' : size === 'medium' ? ' style="width:50%"' : '';
    const image = `<img loading="lazy" src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}"${title ? ` title="${escapeAttribute(title)}"` : ''}${style}>`;

    if (!src.includes('-light')) return `<figure>${image}<figcaption>Image: ${escapeHtml(alt)}</figcaption></figure>`;

    const darkSrc = src.replace('-light', '-dark');
    return `<figure><picture><source media="(prefers-color-scheme: dark)" srcset="${escapeAttribute(darkSrc)}">${image}</picture><figcaption>Image: ${escapeHtml(alt)}</figcaption></figure>`;
}

function normaliseLanguage(language: string): string {
    const aliases: Record<string, string> = { js: 'javascript', ts: 'typescript', kql: 'kusto' };
    return aliases[language.trim().toLowerCase()] ?? language.trim().toLowerCase();
}

function escapeAttribute(value: string): string {
    return escapeHtml(value).replaceAll('"', '&quot;');
}

function escapeHtml(value: string): string {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function slugify(value: string): string {
    return value.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
