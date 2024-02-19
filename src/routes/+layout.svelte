<script lang="ts">
    import Background from "$lib/components/background.svelte";
    import Navbar from "$lib/components/navigation/navbar.svelte";
    import { theme } from "../stores";
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/{$theme}-theme.css" />
</svelte:head>

<Navbar></Navbar>
<Background></Background>
<div class="page-container">
    <slot></slot>
</div>

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