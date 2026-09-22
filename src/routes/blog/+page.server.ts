import { getBlogposts } from '$lib/domain/blogpost/blogpostController';

export const load = async () => ({ blogposts: await getBlogposts() });
