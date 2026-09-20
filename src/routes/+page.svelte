<script lang="ts">
    import BlogBar from "$lib/components/blog/blogBar.svelte";
    import BlogContainer from "$lib/components/blog/blogContainer.svelte"
    import Introduction from "$lib/components/introduction.svelte";
    interface Props {
        data: any;
    }

    let { data }: Props = $props();

    let searchString : string = $state('');

    function changeSearchString(event : Event)
    {
        searchString = (event.target as HTMLInputElement).value;
    }

</script>

<svelte:head>
    <title>Jef Meijvis</title>
</svelte:head>

<Introduction></Introduction>
<h1>Latest articles</h1>
<BlogContainer limit={3} posts={data.blogposts}></BlogContainer>
<BlogBar updateSearchString={changeSearchString} title="Most recent articles"></BlogBar>
<BlogContainer searchString={searchString} limit={9} posts={data.blogposts}></BlogContainer>
<p>
    <a href="/blog">View all posts</a>
</p>

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
