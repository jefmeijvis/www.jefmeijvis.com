<script lang="ts">
    import BlogBar from "$lib/components/blog/blogBar.svelte";
    import BlogContainer from "$lib/components/blog/blogContainer.svelte"
    import Introduction from "$lib/components/introduction.svelte";
    import { sortByViewsDescending } from "$lib/domain/blogpost/sorting.js";
    export let data;

    let listview : boolean = false;
    let searchString : string;

    function changeSearchString(event : Event)
    {
        //@ts-ignore
        searchString = event.target.value as String;
    }

    function toggleListView(value : boolean)
    {
        listview = value;
    }
</script>
<Introduction></Introduction>
<h1>Most viewed Articles</h1>
<BlogContainer sorting={sortByViewsDescending} limit={3} posts={data.blogposts}></BlogContainer>
<BlogBar updateSearchString={changeSearchString} title="Recent articles" toggleView={toggleListView}></BlogBar>
<BlogContainer searchString={searchString} limit={9} viewToggle={listview} posts={data.blogposts}></BlogContainer>
<p>
    <a href="/blog">View all posts</a>
</p>

<div style="display:none" class="prerender-hack">
    {#each data.blogposts as post}
        <a  href="/blog/{post.path}">{post.title}</a>
    {/each}
</div>

<style>
    p
    {
        text-align: center;
        width : 100%;
    }   

    a
    {
        text-decoration: none;
        color:var(--color-text);
        display: block;
        border-radius: 1rem;
    }

    @media (max-aspect-ratio: 1/1)
    {
        h1
        {
            text-align: center;
        }
    }
</style>