<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import { getTheme } from "../../../stores";
    const theme = getTheme();

    interface Props {
        title?: string;
        updateSearchString: ChangeEventHandler<HTMLElement>;
    }

    let { title = "Articles", updateSearchString }: Props = $props();


</script>

<div class="container">
    <div class="left">
        <h1>
            {title}
        </h1>
    </div>

    <div class="right">

        <div class="search">
            <input onkeyup={updateSearchString} placeholder="Search" type="text">
            <img style="filter:{$theme == 'light' ? 'none' : 'invert()'}" class="search-image" alt="magnifying glass" src="/icons/search.png"/>
        </div>

    </div>
</div>

<style>
    .search-image
    {
        transform: translate(-40%,30%);
        width : 1rem;
        opacity: 70%;
    }

    .search
    {
        background-color: var(--color-background-bright);
        border-radius: .5rem;
        height : 70%;
        transform: translate(0,15%);
        outline: 1px rgb(123, 123, 123) solid;
    }

    input:focus
    {
        outline:none;
    }


    input
    {
        margin:0;
        padding : 0;
        border:none;
        background: none;
        color: var(--color-text-bright);
        height : 100%;
        padding-left : .5rem;
    }
    .container
    {
        display: flex;
        width : 100%;
        margin-top: 4rem;
        flex-direction: row;
    }

    .left
    {
        width : 60%;
    }

    .right
    {
        width: 40%;
        display: flex;
        justify-content: flex-end;
    }

    img
    {
        width : 1.2rem;
        filter:invert()
    }

    @media (max-aspect-ratio: 1/1) 
    {
        .search-image
        {
            display: none;
        }

        .container
        {
            flex-direction: column;
        }

        .left, .right
        {
            width : 100%;
        }

        .left
        {
            text-align: center;
        }

        .right
        {
            justify-content: center;
        }

    }
</style>
