<script lang="ts">
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { filterPost } from "$lib/domain/blogpost/filter";
    import { sortByIdDescending, type SortingFunction } from "$lib/domain/blogpost/sorting";
    import BlogCard from "./blogCard.svelte";

    interface Props {
        posts?: Blogpost[];
        sorting?: SortingFunction;
        limit?: number | undefined;
        searchString?: string | undefined;
    }

    let {
        posts = [],
        sorting = sortByIdDescending,
        limit = undefined,
        searchString = undefined
    }: Props = $props();

    let innerHeight = $state(0);
    let innerWidth = $state(0);
    let mobile = $derived(innerWidth > 0 && innerWidth <= innerHeight);
    let visiblePosts = $derived(
        [...posts].sort(sorting)
            .filter((post) => filterPost(post, searchString))
            .slice(0, limit)
    );
</script>

{#if searchString}
    <p>
        <i>Searching for <b>{searchString}</b> returned {visiblePosts.length} {visiblePosts.length == 1 ? 'result' : 'results'}:</i>
    </p>
{/if}


{#key searchString} 
    <div>
        {#each visiblePosts as post,index}
            <BlogCard {index} {post}></BlogCard>
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
