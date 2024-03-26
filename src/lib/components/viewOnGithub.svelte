<script lang="ts">
    import { goto } from "$app/navigation";
    import { theme } from "../../stores";

    export let url : string;

    function link()
    {
        window.location.href = url;
    }
</script>

<div>
    <button on:click={link} on:keypress={link} title="View the source of this page on {url}">
        View this page on GitHub
        <img style="{$theme == 'light' ? ''  :'filter:invert()'}" alt="GitHub logo" src="/icons/github.png"/>
    </button>
</div>

<style>
    div
    {
        text-align: center;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }

    button
    {
        display: block;
        margin:auto;
        color: var(--color-text);
        outline: 1px rgb(127,127,127) solid;
        background: none;
        border: none;
        padding: .4rem;
        border-radius: .3rem;
        cursor:pointer;
    }

    button:hover
    {
        outline: 3px rgb(127,127,127) solid;
        background-color: var(--color-text-subtle);
    }

    img
    {
        width : 1.1rem;
        margin-left: .5rem;
    }
</style>