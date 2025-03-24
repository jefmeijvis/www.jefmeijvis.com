<script lang="ts">
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { Text } from "$lib/utils/text";
    import { fade } from "svelte/transition";
    import { theme } from "../../stores";

    interface Props {
        post: Blogpost;
    }

    let { post }: Props = $props();
    let buttonCopyActive : boolean = $state(false);

    async function buttonPDF()
    {
        window.print();
    }

    async function buttonCopy()
    {
        buttonCopyActive = true;
        navigator.clipboard.writeText("www.jefmeijvis.com/blog/" + post.path);
        setTimeout(()=>buttonCopyActive = false, 2000);
    }

    /*
    async function buttonTwitter()
    {
        let text = "Sharing: " + Text.desluggify(post.title);
        text = text.replaceAll(" ","%20")
        text = " https://twitter.com/intent/tweet?text=" + text;
        text+= "&url=" + "https://www.jefmeijvis.com/blog/" + post.path;

        window.open(text,'_blank')
    }
    */

    async function buttonBlueSky()
    {
        let text = "Sharing @jefmeijvis.com " + Text.desluggify(post.title);
        text = text.replaceAll(" ","%20")
        text = "https://bsky.app/intent/compose?text=" + text;
        text+= " ==> " + "https://www.jefmeijvis.com/blog/" + post.path;
        window.open(text,'_blank')
    }

    async function buttonMastodon()
    {
        let url = "https://www.jefmeijvis.com/blog/" + post.path;
        let text = "Sharing: " + Text.desluggify(post.title);
        let link = "https://mastodonshare.com/?text=" + text + "&url=" + url;
        window.open(link,'_blank')
    }

</script>

<div class="sharing-component">
        <button 
            style="{$theme == 'light' ? ''  :'filter:invert()'}"
            onclick={buttonBlueSky} 
            title="Share this article on BlueSky">
            <img alt="PDF logo" src="/icons/bluesky.png"/>
        </button>
        <button 
            style="{$theme == 'light' ? ''  :'filter:invert()'}"
            onclick={buttonMastodon} 
            title="Share this article via Mastodon">
            <img alt="x (formerly Twitter) logo" src="/icons/mastodon.svg"/>
        </button>
        <button 
         style="{$theme == 'light' ? ''  :'filter:invert()'}"
            onclick={buttonPDF} 
            title="Download this article as PDF">
            <img alt="PDF logo" src="/icons/pdf.png"/>
        </button>
        <button 
            style="{$theme == 'light' ? ''  :'filter:invert()'}"
            onclick={buttonCopy} 
            title="Copy link to clipboard">
            {#if buttonCopyActive}
                <span in:fade>COPIED TO CLIPBOARD</span>
            {:else}
                <img alt="link" src="/icons/link.png"/>
            {/if}
        </button>
</div>

<style>
    span
    {
        background-color: white;
        padding: .5rem;
    }
    img
    {
        width : 1.2rem;
    }
    .sharing-component
    {
        width : 100%;
    }

    button
    {
        border:none;
        background: none;
        padding: .3rem;
        transition: all ease .2s;
        cursor:pointer;
        opacity: 40%;
        font-weight: bold;
        font-size: 1.2rem;
    }

    button:hover
    {
        opacity: 100%;
        transform: scale(1.2);
    }

    @media (max-aspect-ratio: 1/1) 
    {
        img
        {
            width: 2rem;
        }

        .sharing-component
        {
            display: flex;
            justify-content: space-between;
            
        }
    }
</style>