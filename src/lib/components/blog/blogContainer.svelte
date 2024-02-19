<script lang="ts">
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { sortByIdDescending, type SortingFunction } from "$lib/domain/blogpost/sorting";
    import BlogCard from "./blogCard.svelte";

    export let posts : Blogpost[] = [];
    export let viewToggle : boolean = false;
    export let sorting : SortingFunction = sortByIdDescending
    export let limit : number | undefined = undefined;


    let visiblePosts = posts.sort(sorting);
    visiblePosts = posts.slice(0, limit ? limit : visiblePosts.length)
</script>

<div>
    {#each visiblePosts as post,index}
        <BlogCard {index} {post}></BlogCard>
    {/each}
</div>


<style>
    div
    {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 1rem;
    }

    @media (min-aspect-ratio: 1/1) 
    {
        div
        {
            flex-direction: row;
        }
    }
</style>