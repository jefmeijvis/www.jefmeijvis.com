<script>
    import { Text } from "$lib/utils/text";
    import SvelteMarkdown from 'svelte-markdown';
    import renderers from '$lib/components/markdown-renderers/renderers'
    import MetaTagsBlogpost from "$lib/components/metaTagsBlogpost.svelte";
    import ViewOnGithub from "$lib/components/viewOnGithub.svelte";
    import { theme } from "../../../stores";
    import Sharing from "$lib/components/sharing.svelte";

    /** @type {{data: any}} */
    let { data } = $props();
</script>

<div id="article">
    <MetaTagsBlogpost post={data.post}></MetaTagsBlogpost>
    <h1>{Text.desluggify(data.post.title)}</h1>
    <img src='/content/{data.post.path}/images/cover-{$theme}.png' alt='Cover for {Text.desluggify(data.post.title)}'/>
    <Sharing post={data.post}></Sharing>
    <SvelteMarkdown source={data.post.markdown} renderers={renderers}/>
    <ViewOnGithub url="https://github.com/jefmeijvis/www.jefmeijvis.com/blob/master/content/{data.post.path}/index.md"></ViewOnGithub>
</div>

<style>
    img{
        margin: auto;
        width: 100%;
        display: block;
        margin-top: 3rem;
        margin-bottom: 3rem;
        outline: 1px rgb(127,127,127) solid;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        img
        {
            width: 100%;
        }
    }
</style>
