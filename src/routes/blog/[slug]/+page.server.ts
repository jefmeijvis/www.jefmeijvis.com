import { getBlogposts } from "$lib/domain/blogpost/blogpostController";

export async function load({params,fetch} : any) {
    return {     
        post: getBlogposts().filter((post) => post.path == params.slug)[0]
    };
  }