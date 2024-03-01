<script lang="ts">
    import { goto } from "$app/navigation";
    import { AddLink } from "./utils";
    import { page } from "$app/stores";
    import NavLogo from "./navLogo.svelte";
    import NavDesktopLink from "./navDesktopLink.svelte";
    import NavDesktopButton from "./navDesktopButton.svelte";
    import type { Link } from "./link";
    import NavMobileHamburger from "./navMobileHamburger.svelte";
    import NavMobileButton from "./navMobileButton.svelte";
    import { theme } from "../../../stores";
    let menuOpen : boolean = false;

    let links : Link[] = [];
    AddLink(links,"RSS","/rss");
    AddLink(links,"About","/about");
    AddLink(links,"Blog","/blog");
    AddLink(links,"Home","/");

    function toggleMenu()
    {
        menuOpen = !menuOpen;
        if(menuOpen)
        {
            document.body.style["overflow"] = "hidden"
        }
        else
        {
            document.body.style["overflow"] = "auto"
        }
    }
</script>

<nav>
    <NavLogo></NavLogo>
    <NavMobileHamburger {menuOpen} {toggleMenu}></NavMobileHamburger>
    <NavDesktopButton></NavDesktopButton>
    {#key $page.url.pathname}
        {#each links as link}
            <NavDesktopLink {link}></NavDesktopLink>
        {/each}
    {/key}
</nav>

{#if menuOpen}
    <div class="mobile-menu">
        {#each [...links].reverse() as link}
            <NavMobileButton onClick={()=>{()=>{console.log('click');toggleMenu();goto(link.href)}}}>
                {link.name}
            </NavMobileButton>
        {/each}
        <NavMobileButton onClick={()=>{$theme = ($theme == "light" ? 'dark' : 'light')}}>
            Toggle Theme
        </NavMobileButton>
    </div>
{/if}

<style>
    .mobile-menu
    {
        position: fixed;
        width : 100%;
        height : 100%;
        background-color: var(--color-background);
        z-index: 100;
    }

    nav
    {
        width : 100%;
        margin:auto;
        background-color: var(--color-background);
        border-bottom: 1px rgba(0,0,0, .1) solid;
        z-index: 10;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        nav
        {
            width : 95%;
        }
    }
</style>