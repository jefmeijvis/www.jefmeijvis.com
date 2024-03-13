import { getBlogposts } from "$lib/domain/blogpost/blogpostController";

export async function load()
{
    return {
        blogposts : await getBlogposts()
    }
}