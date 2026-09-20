import { getBlogposts } from '$lib/domain/blogpost/blogpostController';

export const load = () => ({ blogposts: getBlogposts() });
