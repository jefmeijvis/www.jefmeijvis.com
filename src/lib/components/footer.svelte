<script lang="ts">
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { getHoursSince } from "$lib/utils/date";
    import { Text } from "$lib/utils/text";
    import { onMount } from "svelte";

    export let blogposts : Blogpost[];
    export let timestamp : Date;
    export let timeAgo : string = '';

    function getCurrentDate() : string
    {
        return timestamp.toUTCString() 
    }

    function doOnMount()
    {
        let hours : number =  getHoursSince(timestamp);

        if(hours < 1)
        {
            let minutes = Math.ceil(hours * 60);
            timeAgo = ', or ' + minutes + ' minutes ago'
        }
        else if(hours > 1 && hours < 2)
        {
            timeAgo = ', or 1 hour ago'
        }
        else
        {
            timeAgo = ', or ' + Math.ceil(hours) + ' hours ago'
        }
    }

    onMount(doOnMount)
</script>


<footer>
    <div class="footer-blocks">
        <div class="block">
            <ul>
                <li><h3>Navigation</h3></li>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/rss.xml">RSS feed</a></li>
            </ul>
        </div>
        <div class="block">
            <ul>
                <li><h3>External</h3></li>
                <li><a rel="noreferrer" target="_blank" href="https://twitter.com/JefMeijvis">Twitter</a></li>
                <li><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/jef-meijvis/">LinkedIn</a></li>
                <li><a rel="noreferrer" target="_blank" href="https://github.com/jefmeijvis">Github</a></li>
                <li><a rel="me" href="https://mastodon.social/@jefmeijvis">Mastodon</a></li>
            </ul>
        </div>
        <div class="block">
            <ul>
                <li><h3>Projects</h3></li>
                <li><a href="https://cornucopia.dotnetlab.eu">Cornucopia</a></li>
                <li><a href="https://colour.jefmeijvis.com">Colour</a></li>
            </ul>
        </div>
        <div class="block">
            <ul>
                <li><h3>Recent posts</h3></li>
                    {#each blogposts as post,index}
                        {#if index < 5}
                            <li>
                                <a href="/blog/{post.path}">{Text.desluggify(post.title).slice(0,30)}...</a>
                            </li>
                        {/if}
                    {/each}
            </ul>
        </div>
    </div>
    <p>© Jef Meijvis 2021 - {new Date().getFullYear()}</p>
    <p><a target="_blank" href="https://github.com/jefmeijvis/www.jefmeijvis.com">Source code on GitHub</a></p>
    <p>Views and other metrics are updated daily</p>
    <p>Last update was {getCurrentDate()}{timeAgo}</p>
</footer>


<style>
    h3
    {
        color:var(--color-text-secondary);
    }
    p
    {
        margin-top: .5rem;
        color:var(--color-text-secondary);
    }

    li
    {
        font-size: 1rem;
    }


    footer
    {
        text-align: center;
        width : 100%;
        bottom: 1rem;
        margin-top: 3rem;
        padding-bottom: 1rem;
        padding-top: 1rem;
        border-top: 1px rgb(127,127,127) solid;
        background-color: var(--color-background);
        color: var(--color-text)
    }

    .footer-blocks
    {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin:auto;
        width : 60%;
        font-weight: 300;
        justify-content: space-between;
    }

    .block
    {
        display: block;
        float: left;
        width : 25%;
        height : 100%;
        padding : .5rem;         
    }

    ul
    {
        text-align: left;
        list-style: none;
        padding: 0;
    }

    a
    {
        text-decoration: none;
        color: var(--color-text-secondary);
        font-size: 1rem;
    }

    a:hover
    {
        text-decoration: underline;
    }

    p,a
    {
        font-size: .75rem;
        font-weight: 300;
    }

    @media (max-width: 60rem) 
    {
        li        {
            text-align: center;
        }
        .footer-blocks
        {
            width : 100%;
            flex-direction: column;
        }

        .block
        {
            width : 90%;
            margin:auto;
            text-align: center;
        }
    }
</style>