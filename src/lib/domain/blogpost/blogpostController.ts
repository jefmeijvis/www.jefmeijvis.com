import type { Blogpost, BlogpostSummary } from './blogpost';
import fs from 'node:fs';
import fm from 'front-matter';
import { renderMarkdown } from '$lib/server/markdown';

type BlogpostSource = BlogpostSummary & { markdown: string };

let blogpostSources: BlogpostSource[] | undefined;

export function getBlogposts(): BlogpostSummary[] {
    return getBlogpostSources().map(({ markdown: _markdown, ...post }) => post);
}

export function getRecentBlogposts(limit = 5): BlogpostSummary[] {
    return getBlogposts().slice(0, limit);
}

export async function getBlogpost(slug: string): Promise<Blogpost | undefined> {
    const post = getBlogpostSources().find((candidate) => candidate.path === slug);
    if (!post) return undefined;

    const { markdown, ...summary } = post;
    return { ...summary, html: await renderMarkdown(markdown, slug) };
}

function getBlogpostSources(): BlogpostSource[] {
    if (blogpostSources) return blogpostSources;

    blogpostSources = getDirectories('./content')
        .map((directory) => readBlogpost(directory))
        .filter((post) => post.published)
        .sort((a, b) => ('' + b.date).localeCompare(a.date));

    return blogpostSources;
}

function readBlogpost(directory: string): BlogpostSource {
    const file = fs.readFileSync(`./content/${directory}/index.md`, 'utf8');
    const parsed = fm<Record<string, unknown>>(file);
    const attributes = parsed.attributes;

    return {
        title: directory.slice(4),
        path: directory,
        id: Number(attributes.id ?? directory.slice(0, 3)),
        date: String(attributes.date),
        published: attributes.published as boolean,
        description: attributes.description as string,
        category: attributes.category as string,
        markdown: parsed.body
    };
}

function getDirectories(path: string): string[] {
    return fs.readdirSync(path, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}
