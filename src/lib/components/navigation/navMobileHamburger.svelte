<script lang="ts">
    import { fade } from "svelte/transition";
    import { theme } from "../../../stores";
    import type { MouseEventHandler } from "svelte/elements";

    interface Props {
        menuOpen: Boolean;
        toggleMenu: MouseEventHandler<HTMLButtonElement>;
    }

    let { menuOpen, toggleMenu }: Props = $props();
</script>

<button data-umami-event="button-navbar-mobile-toggle-theme" style="{$theme=='light' ? 'filter:invert()' : ''}" in:fade={{duration:200}} onclick={toggleMenu}>
    <img alt="button to open the menu" src="/icons/{menuOpen ? 'close' : 'menu'}.png"/>
</button>

<style>
    img
    {
        width : 3rem
    }

    button
    {
        display: none;
        background:none;
        border:none;
        float:right;
        margin:1rem;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        button
        {
            display: inline-block;
        }
    }
</style>