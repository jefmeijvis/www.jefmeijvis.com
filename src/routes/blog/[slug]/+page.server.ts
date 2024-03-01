import { getBlogposts } from "$lib/domain/blogpost/blogpostController";

export async function load({params,fetch} : any) {
    let posts = await getBlogposts();
    let post = posts.filter((post) => post.path == params.slug)[0];
    return {     
        post: post
    };
  }