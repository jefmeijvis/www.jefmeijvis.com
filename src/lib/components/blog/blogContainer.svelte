<script lang="ts">
    import { run } from 'svelte/legacy';

    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { filterPost } from "$lib/domain/blogpost/filter";
    import { sortByIdDescending, type SortingFunction } from "$lib/domain/blogpost/sorting";
    import BlogCard from "./blogCard.svelte";
    import BlogRow from "./blogRow.svelte";

    interface Props {
        posts?: Blogpost[];
        viewToggle?: boolean;
        sorting?: SortingFunction;
        limit?: number | undefined;
        searchString?: string | undefined;
    }

    let {
        posts = [],
        viewToggle = false,
        sorting = sortByIdDescending,
        limit = undefined,
        searchString = undefined
    }: Props = $props();

    let innerHeight : number = $state();
    let innerWidth : number = $state();
    let mobile : boolean;
    let visiblePosts : Blogpost[] = $state();

    visiblePosts = posts.sort(sorting);
    visiblePosts = visiblePosts.filter((post : Blogpost) => filterPost(post,searchString));
    visiblePosts = visiblePosts.slice(0,limit)

    run(() => {
        visiblePosts = posts.sort(sorting);
        visiblePosts = visiblePosts.filter((post : Blogpost) => filterPost(post,searchString));
        visiblePosts = visiblePosts.slice(0,limit)
    });
</script>

{#if searchString}
    <p>
        <i>Searching for <b>{searchString}</b> returned {visiblePosts.length} {visiblePosts.length == 1 ? 'result' : 'results'}:</i>
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