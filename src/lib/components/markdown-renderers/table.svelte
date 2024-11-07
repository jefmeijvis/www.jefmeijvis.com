<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<table>
    {#if children}{@render children()}{:else}
    {/if}
</table>


<style>
    table
    {
        margin:auto;
        border-radius: .25rem;
        margin-top: 2rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-collapse: collapse;
        overflow: hidden;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        table
        {
            width: 100%;
        }
    }
</style>