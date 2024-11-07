<script lang="ts">
    import { theme } from "../../stores";

    interface Props {
        url: string;
    }

    let { url }: Props = $props();

    function link()
    {
        window.open(url,'_blank');
    }

    let coffeeUrl = "https://ko-fi.com/jefmeijvis";
    function linkCoffee()
    {
        window.open(coffeeUrl,'_blank');
    }
</script>

<div class="container">
    <div class="element">
        <button title="View the source for this page on Github" onclick={link} class:button-light={$theme == 'light'} class:button-dark={$theme != 'light'}>
            <span>View this page on GitHub</span>
            <img style="{$theme == 'light' ? ''  :'filter:invert()'}" alt="GitHub logo" src="/icons/github.png"/>
        </button>
    </div>
    <div class="element">
        <button title="Buy me a coffee via ko-fi.com" onclick={linkCoffee} class:button-light={$theme == 'light'} class:button-dark={$theme != 'light'}>
            <span>Buy me a coffee</span>
            <img style="{$theme == 'light' ? ''  :'filter:invert()'}" alt="GitHub logo" src="/icons/coffee.png"/>
        </button>
    </div>
</div>

<style>
    .container
    {
        margin-top: 3rem;
        margin-bottom: 3rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .element
    {
        padding: .5rem;
        text-align: center;
    }

    button
    {
        border-radius: .5rem;
        background: none;
        padding: .25rem;
        cursor:pointer;
        font-weight: bold;
        transition: all ease .25s;
    }

    .button-light
    {
        background-color: white;
        color:black;
        border: 2px black solid;
    }

    .button-dark
    {
        background-color: black;
        color:white;
        border: 1px white solid;
    }

    button::before
    {
        content: '➜ ';
    }

    button:hover
    {
        padding-left: 1rem;
    }


    img
    {
        width : 1rem;
        margin-left: .5rem;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        .container
        {
            flex-direction: column;
            flex-wrap: wrap;
        }

        .element
        {
            width: 100%;
        }
    }
</style>