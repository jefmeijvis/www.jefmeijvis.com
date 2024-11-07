<script lang="ts">
    import { BlogpostUtils } from "./utils";
    import type { Blogpost } from "$lib/domain/blogpost/blogpost";
    import { theme } from "../../../stores";
    import { Text } from "$lib/utils/text";
    import { goto } from "$app/navigation";

    interface Props {
        post: Blogpost;
        index: number;
    }

    let { post, index }: Props = $props();

    function click()
    {
        goto('/blog/' + post.path)
    }
</script>


<div tabindex="{index}" onkeypress={click} role="button" onclick={click} class="big-button">
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
            <span class="viewcount">{post.views} views</span>
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
        font-size: calc(10% * 16);
        opacity: 50%;
        text-align: right;
        width : 10%;
    }
    .top
    {
        display: flex;
        width : 30%;
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
        opacity: 80%;
        width: 100%;
        height: 100%;
        margin:auto;
        object-fit: cover;
    }

    img:hover
    {
        opacity: 100%;
    }
    .image
    {
        transition: all ease .2s;
        outline: 1px var(--color-text-subtle) solid;
        width : 90%;
    }

    .body
    {
        padding-left: 1rem;
        width : 70%;
    }

    .big-button
    {
        background: none;
        border: none;
        width : 100%;
        cursor:pointer;
        margin-bottom: 4rem;
        color:var(--color-text);
        display: flex;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        .big-button
        {
        }
    }
</style>