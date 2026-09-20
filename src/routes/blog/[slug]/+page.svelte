<script>
    import { Text } from "$lib/utils/text";
    import MetaTagsBlogpost from "$lib/components/metaTagsBlogpost.svelte";
    import ViewOnGithub from "$lib/components/viewOnGithub.svelte";
    import { getTheme } from "../../../stores";
    const theme = getTheme();
    import Sharing from "$lib/components/sharing.svelte";
    import { BlogpostUtils } from "$lib/components/blog/utils";

    /** @type {{data: any}} */
    let { data } = $props();
</script>

<div id="article">
    <MetaTagsBlogpost post={data.post}></MetaTagsBlogpost>
    <h1>{Text.desluggify(data.post.title)}</h1>
    <p class="date">{BlogpostUtils.formatDateForCard(data.post.date)}</p>
    <img src='/content/{data.post.path}/images/cover-{$theme}.png' alt='Cover for {Text.desluggify(data.post.title)}'/>
    <Sharing post={data.post}></Sharing>
    <div class="markdown">{@html data.post.html}</div>
    <ViewOnGithub url="https://github.com/jefmeijvis/www.jefmeijvis.com/blob/master/content/{data.post.path}/index.md"></ViewOnGithub>
</div>

<style>
    .date
    {
        opacity: 30%;
    }

    :global(.markdown figure) {
        margin: 2rem auto;
        text-align: center;
    }

    :global(.markdown figure img) {
        margin: auto;
        width: 100%;
        display: block;
        outline: 1px rgb(127,127,127) solid;
    }

    :global(.markdown figcaption) {
        font-size: 1rem;
        font-style: italic;
        margin-top: 1rem;
    }

    :global(.markdown p) { margin-top: 1rem; font-weight: 300; }
    :global(.markdown h2), :global(.markdown h3), :global(.markdown h4) { margin-top: 2rem; }
    :global(.markdown ul), :global(.markdown ol) { margin-top: 1rem; padding-left: 1.5rem; }
    :global(.markdown li) { margin-top: .5rem; }
    :global(.markdown blockquote) { margin: 1rem 0; padding: 1rem; border-left: 4px solid var(--color-text-subtle); }
    :global(.markdown table) { width: 100%; margin: 2rem 0; border-collapse: collapse; overflow: auto; display: block; }
    :global(.markdown th), :global(.markdown td) { border: 1px solid var(--color-text-subtle); padding: .5rem; }
    :global(.markdown-code) { margin: 1.5rem 0; overflow: auto; border: 1px solid var(--color-text-subtle); }
    :global(.markdown-code pre) { padding: 1rem; }
    :global(.markdown-code .shiki) { background-color: var(--shiki-light-bg); color: var(--shiki-light); }
    :global(.markdown-code .shiki span) { color: var(--shiki-light); }
    :global(.markdown-code .line) { display: inline-block; }
    :global(.markdown-code code) { counter-reset: step; counter-increment: step 0; }
    :global(.markdown-code code .line::before) { content: counter(step); counter-increment: step; width: 1rem; margin-right: 1.5rem; display: inline-block; text-align: right; color: rgba(115, 138, 148, .4); }

    @media (prefers-color-scheme: dark) {
        :global(.markdown-code .shiki) { background-color: var(--shiki-dark-bg); color: var(--shiki-dark); }
        :global(.markdown-code .shiki span) { color: var(--shiki-dark); }
    }

    :global(:root[data-theme="dark"] .markdown-code .shiki) { background-color: var(--shiki-dark-bg); color: var(--shiki-dark); }
    :global(:root[data-theme="dark"] .markdown-code .shiki span) { color: var(--shiki-dark); }

    @media (max-aspect-ratio: 1/1) 
    {
        :global(.markdown figure img)
        {
            width: 100%;
        }
    }
</style>
