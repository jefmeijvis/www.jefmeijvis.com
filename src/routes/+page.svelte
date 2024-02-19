<script lang="ts">
    import BlogBar from "$lib/components/blog/blogBar.svelte";
    import BlogContainer from "$lib/components/blog/blogContainer.svelte"
    import { sortByViewsDescending } from "$lib/domain/blogpost/sorting.js";
    export let data;

    let listview : boolean = true;

    function toggleListView()
    {
        listview = !listview;
    }
</script>

<h1>Most viewed posts</h1>
<BlogContainer sorting={sortByViewsDescending} limit={3} posts={data.blogposts}></BlogContainer>

<BlogBar toggleView={toggleListView}></BlogBar>
<BlogContainer limit={9} viewToggle={listview} posts={data.blogposts}></BlogContainer>
<a href="/blog">View all</a>