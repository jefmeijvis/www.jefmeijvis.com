<script lang="ts">
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import {Text} from "$lib/utils/text"

    interface Props {
        post: Blogpost;
    }

    let { post }: Props = $props();
    let title = Text.desluggify(post.title) + ' - Jef Meijvis';
</script>

<svelte:head>
    <!--GENERAL META TAGS-->
    <title>{title}</title>
    <meta name="description" content="{post.description}">
    <meta name="keywords" content="Svelte, Cybersecurity, Azure, Microsoft, dotnet, .NET, HTML, CSS, JavaScript">
    <meta name="author" content="Jef Meijvis">

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://www.jefmeijvis.com">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{post.description}">
    <meta property="og:image" content="https://www.jefmeijvis.com/content/{post.path}/images/opengraph.png">

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="jefmeijvis.com">
    <meta property="twitter:url" content="https://www.jefmeijvis.com">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{post.description}">
    <meta name="twitter:image" content="https://www.jefmeijvis.com/content/{post.path}/images/opengraph.png">
</svelte:head>