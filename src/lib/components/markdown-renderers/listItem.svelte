<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<li>bob {@render children?.()}</li>

<style>
    li
    {
        list-style-position: inside;
        background-color: red;
    }
</style>