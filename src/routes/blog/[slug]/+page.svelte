<script>
    import { Text } from "$lib/utils/text";
    import SvelteMarkdown from 'svelte-markdown';
    import renderers from '$lib/components/markdown-renderers/renderers'
    import MetaTagsBlogpost from "$lib/components/metaTagsBlogpost.svelte";

	export let data;
</script>

<MetaTagsBlogpost post={data.post}></MetaTagsBlogpost>
<h1>{Text.desluggify(data.post.title)}</h1>
<SvelteMarkdown source={data.post.markdown} renderers={renderers}/>
