<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { Text } from "$lib/utils/text";
    import { fade } from "svelte/transition";

    export let post : Blogpost
    let buttonCopyActive : boolean = false;

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

    async function buttonTwitter()
    {
        let text = "Sharing: " + Text.desluggify(post.title);
        text = text.replaceAll(" ","%20")
        text = " https://twitter.com/intent/tweet?text=" + text;
        text+= "&url=" + "https://www.jefmeijvis.com/blog/" + post.path;

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
            on:click={buttonTwitter} 
            title="Share this article via X">
            <img alt="x (formerly Twitter) logo" src="/icons/x.png"/>
        </button>
        <button 
            on:click={buttonMastodon} 
            title="Share this article via Mastodon">
            <img alt="x (formerly Twitter) logo" src="/icons/mastodon.svg"/>
        </button>
        <button 
            on:click={buttonPDF} 
            title="Download this article as PDF">
            <img alt="PDF logo" src="/icons/pdf.png"/>
        </button>
        <button 
            on:click={buttonCopy} 
            title="Copy link to clipboard">
            {#if buttonCopyActive}
                <span in:fade>COPIED TO CLIPBOARD</span>
            {:else}
                <img alt="link" src="/icons/link.png"/>
            {/if}
        </button>
</div>

<style>
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