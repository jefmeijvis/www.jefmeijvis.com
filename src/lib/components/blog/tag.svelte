<script lang="ts">
    import type { Tag } from "./tags";

    interface Props {
        tag: Tag;
    }

    let { tag }: Props = $props();
</script>

<button style="color:{tag.color}">
    {tag.name}
</button>

<style>
    button
    {
        border:none;
        background: none;
        padding: .25rem;
        border-radius: .2rem;
        margin-right: .5rem;
        color:var(--color-text-bright);
        cursor:pointer;
        font-weight: bold;
    }
</style>

