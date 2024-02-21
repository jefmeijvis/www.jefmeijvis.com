<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements";
    import { theme } from "../../../stores";

    export let toggleView : Function;
    export let title : string = "Articles";
    export let updateSearchString : ChangeEventHandler<HTMLElement>;


</script>

<div class="container">
    <div class="left">
        <h1>
            {title}
        </h1>
    </div>

    <div class="right">

        <div class="search">
            <input on:keyup={updateSearchString} placeholder="Search" type="text">
            <img style="filter:{$theme == 'light' ? 'none' : 'invert()'}" class="search-image" alt="magnifying glass" src="/icons/search.png"/>
        </div>


        <button on:click={()=>toggleView(false)}>
            <img style="filter:{$theme == 'light' ? 'none' : 'invert()'}" alt="grid" src="/icons/grid.png"/>
        </button>

        <button on:click={()=>toggleView(true)}>
            <img style="filter:{$theme == 'light' ? 'none' : 'invert()'}" alt="list" src="/icons/list.png"/>
        </button>
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
    button
    {
        background: none;
        border:none;
        cursor:pointer;
        opacity: 70%;
        margin-left: 1rem;
        padding-top: .2rem;
        transition: all ease .1s;
    }

    button:hover
    {
        opacity: 100%;
        filter: drop-shadow(0px 0px 3px #ffffff7d);
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

        button
        {
            display: none;
        }
    }
</style>