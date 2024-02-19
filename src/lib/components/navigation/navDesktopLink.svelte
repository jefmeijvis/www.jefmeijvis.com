<script lang="ts">
    import { page } from "$app/stores";
    import type { Link } from "./link";
    export let link : Link

    function getSelectedStyle(link : string)
    {
        if(link.toLowerCase() == $page.url.pathname.toLowerCase())
            return 'opacity:100%;font-weight:bold;'
    }
</script>

<a style="{getSelectedStyle(link.href)}" class="link" href="{link.href}">{link.name}</a>

<style>
    .link
    {
        float:right;
        color:var(--color-text-normal);
        text-decoration: none;
        padding: .5rem;
        font-size: 1rem;
        margin: 1rem;
        opacity: 85%;
        transition: all ease .1s;
    }

    .link:hover
    {
        opacity: 100%;
        text-shadow: 0px 0px 10px var(--color-text-bright);
    }

    @media (max-aspect-ratio: 1/1) 
    {
        .link
        {
            display:none;
        }
    }
</style>