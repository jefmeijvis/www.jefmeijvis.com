import type { Blogpost, BlogpostSummary } from './blogpost';
import fs from 'node:fs';
import fm from 'front-matter';
import { renderMarkdown } from '$lib/server/markdown';
import { getPageviews, pageKey } from '$lib/server/pageviews';

type BlogpostSource = BlogpostSummary & { markdown: string };

let blogpostSources: BlogpostSource[] | undefined;

export async function getBlogposts(): Promise<BlogpostSummary[]> {
    const counts = await getPageviews();
    return getBlogpostSources().map(({ markdown: _markdown, ...post }) => ({
        ...post,
        views: counts ? counts.get(pageKey('/blog/' + post.path)) ?? 0 : undefined
    }));
}

export async function getRecentBlogposts(limit = 5): Promise<BlogpostSummary[]> {
    return (await getBlogposts()).slice(0, limit);
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
