import type { LayoutServerLoad } from "./$types";
import { getRecentBlogposts } from "$lib/domain/blogpost/blogpostController";

export const prerender = true;

export const load: LayoutServerLoad = async () => ({
    recentPosts: await getRecentBlogposts()
});
