import {
    getBlogposts,
    getViewCountUpdatedAt
} from "$lib/domain/blogpost/blogpostController";

export async function load()
{
    const blogposts = await getBlogposts();

    return {
        blogposts,
        timestamp : getViewCountUpdatedAt(),
    }
}
