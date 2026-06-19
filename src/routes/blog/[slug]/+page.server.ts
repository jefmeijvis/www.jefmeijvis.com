import { getBlogpost } from "$lib/domain/blogpost/blogpostController";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const post = await getBlogpost(params.slug);

    if (!post) {
        error(404, 'Blog post not found');
    }

    return { post };
}
