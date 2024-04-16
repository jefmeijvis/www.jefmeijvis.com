import type { Blogpost } from "./blogpost";

export function filterPost(post : Blogpost, searchString : string | undefined) : boolean
{
    if(!searchString || searchString == '')
        return true;

    searchString = searchString.toLowerCase();

    if(post.title.toLowerCase().includes(searchString))
        return true;

    if(post.description.toLowerCase().includes(searchString))
        return true;

    if(post.category.toLowerCase().includes(searchString))
        return true;

    return false;
}
