<script lang="ts">
    import Background from "$lib/components/background.svelte";
    import Footer from "$lib/components/footer.svelte";
    import MetaTags from "$lib/components/metaTags.svelte";
    import Navbar from "$lib/components/navigation/navbar.svelte";
    import { onMount } from "svelte";
    import { createTheme, persistTheme } from "../stores";

    interface Props {
        data: any;
        children?: import('svelte').Snippet;
    }

    let { data, children }: Props = $props();

    const theme = createTheme('light');
    onMount(() => persistTheme(theme));
</script>

<MetaTags></MetaTags>
<Navbar></Navbar>
<Background></Background>
<div id="page-container" class="page-container">
    {@render children?.()}
</div>
<Footer blogposts={data.recentPosts}></Footer>

<style>
    .page-container
    {
        padding-top: 3rem;
        width : min(80% , 70rem);
        margin:auto;
    }

    @media(max-aspect-ratio:1/1)
    {
        .page-container
        {
            width : 90%;
        }
    }
</style>
