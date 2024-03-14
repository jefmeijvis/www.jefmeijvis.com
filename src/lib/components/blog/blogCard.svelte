<script lang="ts">
    import { BlogpostUtils } from "./utils";
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { theme } from "../../../stores";
    import { Text } from "$lib/utils/text";
    import { goto } from "$app/navigation";

    export let post: Blogpost;
    export let index : number

    function click()
    {
        goto('/blog/' + post.path)
    }
</script>


<div tabindex="{index}" on:keypress={click} role="button" on:click={click} class="big-button">
    <div class="top">
        <div class="top-left">
            <p class="date">{BlogpostUtils.formatDateForCard(post.date)}</p>
        </div>
        <div class="image">
            <img alt="{post.title}" src="/content/{post.path}/images/cover-{$theme}.png"/>
        </div>
    </div>
    <div class="body">
        <h1>{Text.desluggify(post.title)}</h1>
        <p class="details">
            <span class="id">#{post.id}</span>
            <span>//</span>
            <span class="category">{Text.capitalize(post.category)}</span>
            <span>//</span>
            <span class="viewcount">{Text.formatViewCount(post.views)} views</span>
        </p>
        <p class="description">{post.description}</p>
    </div>
</div>

<style>
    .details
    {
        text-align: left;
        margin-top: .5rem;
        margin-bottom: .5rem;
        opacity: 70%;
    }
    .description
    {
        text-align: left;
        opacity: 70%;
    }


    .top-left
    {
        writing-mode: tb-rl;
        transform: rotate(-180deg);
        font-size: calc(10% * 13);
        opacity: 50%;
        text-align: right;
        width : 10%;
    }
    .top
    {
        display: flex;
    }

    h1
    {
        text-align: left;
        font-weight: normal;
        font-size: 1.5rem;
    }

    img
    {
        transition: all ease .2s;
        width : 100%;
        height:100%;
        object-fit: cover;
        opacity: 80%;
    }

    img:hover
    {
        opacity: 100%;
    }
    .image
    {
        width : 100%;
        overflow: hidden;
        transition: all ease .2s;
        outline: 1px var(--color-text-subtle) solid; 
    }

    .body
    {
        width : calc(100% - 10%);
        margin-left: 10%;
        padding-top: .5rem;
    }

    .big-button
    {
        background: none;
        border: none;
        width : 30%;
        cursor:pointer;
        margin-bottom: 4rem;
        color:var(--color-text);
    }

    @media (max-aspect-ratio: 1/1) 
    {
        .big-button
        {
            width: 90%;
            margin:auto;
            margin-bottom: 3rem;
        }
    }
</style>