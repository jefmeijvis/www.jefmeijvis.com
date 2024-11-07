<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<p>{@render children?.()}</p>

<style>
    p
    {
        text-align: justify;
        font-weight: 300;
        margin-top:1rem;
    }
</style>