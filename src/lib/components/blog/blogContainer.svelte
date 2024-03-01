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
    let count : number = 0;
    let visiblePosts : Blogpost[];

    function increment()
    {
        if(!limit)
            return true;

        if(count < limit)
        {
            count++;
            return true;
        }

        return false;
    }

    visiblePosts = posts.sort(sorting);
</script>

{#if searchString}
    <p>
        <i>Searching for {searchString}</i>
    </p>
{/if}


{#key searchString}
    <div>
        {#each visiblePosts as post,index}
            {#if filterPost(post,searchString)}
                {#if increment()}
                    {#if viewToggle && !mobile}
                        <BlogRow {index} {post}></BlogRow>
                    {:else}
                        <BlogCard {index} {post}></BlogCard>
                    {/if}
                {/if}
            {/if}
        {/each}
    </div>
{/key}

<svelte:window bind:innerWidth bind:innerHeight />

<style>
    div
    {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content:space-between;
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