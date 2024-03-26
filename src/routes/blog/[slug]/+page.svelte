<script>
    import { Text } from "$lib/utils/text";
    import SvelteMarkdown from 'svelte-markdown';
    import renderers from '$lib/components/markdown-renderers/renderers'
    import MetaTagsBlogpost from "$lib/components/metaTagsBlogpost.svelte";
    import { theme } from "../../../stores";

	export let data;
</script>

<MetaTagsBlogpost post={data.post}></MetaTagsBlogpost>
<h1>{Text.desluggify(data.post.title)}</h1>
<img src='/content/{data.post.path}/images/cover-{$theme}.png' alt='Cover for {Text.desluggify(data.post.title)}'/>
<SvelteMarkdown source={data.post.markdown} renderers={renderers}/>


<style>
    img{
        margin: auto;
        width: 100%;
        display: block;
        margin-top: 3rem;
        margin-bottom: 3rem;
        outline: 1px rgb(127,127,127) solid;
    }
</style>
