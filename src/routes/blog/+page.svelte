<script lang="ts">
    import BlogBar from "$lib/components/blog/blogBar.svelte";
    import BlogContainer from "$lib/components/blog/blogContainer.svelte";
    import { getDaysSince } from "$lib/utils/date.js";

    interface Props {
        data: any;
    }

    let { data }: Props = $props();

    let days = getDaysSince('10/16/2021');
    let daysBetween = Math.floor(days / data.blogposts.length);
    let listview : boolean = $state(false);
    let searchString : string = $state();

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

<svelte:head>
    <title>Blogposts - Jef Meijvis</title>
</svelte:head>

<h1>All blogposts</h1>
<p>
    I've been using this blog to share my thoughts since October 2021.
    Topics are always IT related, floating somewhere between frontend development, cloud infrastructure and cybersecurity. 
    So far I have written {data.blogposts.length} posts. 
    That means that on average, I write a post every {daysBetween} days! 
</p>
<BlogBar updateSearchString={changeSearchString} toggleView={toggleListView}></BlogBar>
<BlogContainer searchString={searchString} viewToggle={listview} posts={data.blogposts}></BlogContainer>