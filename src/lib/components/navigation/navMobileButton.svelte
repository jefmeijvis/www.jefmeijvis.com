<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";

    interface Props {
        onClick: MouseEventHandler<HTMLButtonElement>;
        children?: import('svelte').Snippet;
    }

    let { onClick, children }: Props = $props();
</script>

<button onclick={onClick}>
    {@render children?.()}
</button>


<style>
    button
    {
        border:none;
        font-size: 1.2rem;
        display: none;
        width : 100%;
        color:var(--color-text-normal);
        text-align: center;
        border-bottom: 1px rgba(126, 126, 126, 1) solid;
        background:none;
        float:right;
        margin:auto;
        padding: 1.5rem;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        button
        {
            display: block;
        }
    }
</style>
