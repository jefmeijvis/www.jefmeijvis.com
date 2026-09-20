import type { LayoutServerLoad } from "./$types";
import {
    getBlogposts,
    getViewCountUpdatedAt
} from "$lib/domain/blogpost/blogpostController";

export const load: LayoutServerLoad = async ({ cookies }) =>
{
    const blogposts = await getBlogposts();
    const savedTheme = cookies.get("theme");

    return {
        blogposts,
        theme: savedTheme === "dark" ? "dark" : "light",
        hasThemeCookie: savedTheme === "dark" || savedTheme === "light",
        timestamp : getViewCountUpdatedAt(),
    }
}
