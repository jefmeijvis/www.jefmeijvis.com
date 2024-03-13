import { getBlogposts } from "$lib/domain/blogpost/blogpostController";
export const prerender = true;

export async function load()
{
    return {
        blogposts : await getBlogposts()
    }
}