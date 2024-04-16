<script lang="ts">
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { filterPost } from "$lib/domain/blogpost/filter";
    import { sortByIdDescending, type SortingFunction } from "$lib/domain/blogpost/sorting";
    import BlogCard from "./blogCard.svelte";
    import BlogRow from "./blogRow.svelte";

    export let posts : Blogpost[] = [];
    export let viewToggle : boolean = false;
    export let sorting : SortingFunction = sortByIdDescending
    export let limit : number | undefined = undefined;
    export let searchString : string | undefined = undefined;

    let innerHeight : number;
    let innerWidth : number;
    let mobile : boolean;
    let visiblePosts : Blogpost[];

    visiblePosts = posts.sort(sorting);
    visiblePosts = visiblePosts.filter((post : Blogpost) => filterPost(post,searchString));
    visiblePosts = visiblePosts.slice(0,limit)

    $:
    {
        visiblePosts = posts.sort(sorting);
        visiblePosts = visiblePosts.filter((post : Blogpost) => filterPost(post,searchString));
        visiblePosts = visiblePosts.slice(0,limit)
    }
</script>

{#if searchString}
    <p>
        <i>Searching for <b>{searchString}</b> gave {visiblePosts.length} result(s):</i>
    </p>
{/if}


{#key searchString} 
    <div>
        {#each visiblePosts as post,index}
            {#if (viewToggle && !mobile)}
                <BlogRow {index} {post}></BlogRow>
            {:else}
                <BlogCard {index} {post}></BlogCard>
            {/if}
        {/each}
    </div>
{/key}

<svelte:window bind:innerWidth bind:innerHeight />

<style>
    div
    {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-between;
        margin-top: 1rem;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        div
        {
            flex-direction: column;
        }

        p
        {
            text-align: center;
            margin-top: 1rem;
        }


    }
</style>