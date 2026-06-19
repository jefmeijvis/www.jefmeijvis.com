import type { Blogpost } from './blogpost';
import fs from 'node:fs';
import fm from 'front-matter';
import { supabase } from '$lib/infrastructure/supabase';

const VIEW_COUNT_TTL_MS = 24 * 60 * 60 * 1000;

type ViewCountSnapshot = {
    counts: Map<string, number>;
    expiresAt: number;
    updatedAt: number;
};

let blogpostMetadata: Blogpost[] | undefined;
let viewCountSnapshot: ViewCountSnapshot | undefined;
let viewCountRefresh: Promise<ViewCountSnapshot> | undefined;

export async function getBlogposts(): Promise<Blogpost[]> {
    const posts = getBlogpostMetadata();
    const viewCounts = await getViewCounts(posts);

    return posts.map((post) => ({
        ...post,
        views: viewCounts.get(post.path) ?? -1
    }));
}

export async function getBlogpost(slug: string): Promise<Blogpost | undefined> {
    const posts = await getBlogposts();
    return posts.find((post) => post.path === slug);
}

export function getViewCountUpdatedAt(): Date {
    return new Date(viewCountSnapshot?.updatedAt ?? Date.now());
}

function getBlogpostMetadata(): Blogpost[] {
    if (blogpostMetadata) {
        return blogpostMetadata;
    }

    blogpostMetadata = getDirectories('./content')
        .map((directory) => readBlogpost(directory))
        .filter((post) => post.published)
        .sort((a, b) => ('' + b.date).localeCompare(a.date));

    return blogpostMetadata;
}

function readBlogpost(directory: string): Blogpost {
    const file = fs.readFileSync(`./content/${directory}/index.md`, 'utf8');
    const parsed = fm<Record<string, unknown>>(file);
    const attributes = parsed.attributes;

    return {
        title: directory.slice(4),
        markdown: parsed.body,
        path: directory,
        id: Number.parseInt(directory.slice(0, 3)),
        date: attributes.date as string,
        published: attributes.published as boolean,
        description: attributes.description as string,
        category: attributes.category as string,
        views: -1
    };
}

function getDirectories(path: string): string[] {
    return fs.readdirSync(path, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

async function getViewCounts(posts: Blogpost[]): Promise<Map<string, number>> {
    if (viewCountSnapshot && viewCountSnapshot.expiresAt > Date.now()) {
        return viewCountSnapshot.counts;
    }

    if (!viewCountRefresh) {
        viewCountRefresh = refreshViewCounts(posts).finally(() => {
            viewCountRefresh = undefined;
        });
    }

    return (await viewCountRefresh).counts;
}

async function refreshViewCounts(posts: Blogpost[]): Promise<ViewCountSnapshot> {
    const previousCounts = viewCountSnapshot?.counts;
    const results = await Promise.allSettled(
        posts.map((post) => getViews(`/blog/${post.path}`))
    );
    const counts = new Map<string, number>();
    let failedRequests = 0;

    results.forEach((result, index) => {
        const path = posts[index].path;

        if (result.status === 'fulfilled') {
            counts.set(path, result.value);
            return;
        }

        failedRequests++;
        counts.set(path, previousCounts?.get(path) ?? -1);
    });

    if (failedRequests > 0) {
        console.warn(
            `Failed to refresh ${failedRequests} view count(s); stale values will be used where available.`
        );
    }

    viewCountSnapshot = {
        counts,
        expiresAt: Date.now() + VIEW_COUNT_TTL_MS,
        updatedAt: Date.now()
    };

    return viewCountSnapshot;
}

async function getViews(page: string): Promise<number> {
    if (!supabase) {
        return -1;
    }

    const response = await supabase
        .from('website_visits')
        .select('*', { count: 'exact', head: true })
        .eq('host', 'www.jefmeijvis.com')
        .ilike('page', `%${page}%`);

    if (response.error) {
        throw response.error;
    }

    return response.count ?? -1;
}
