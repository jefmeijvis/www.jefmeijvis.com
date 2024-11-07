<script lang="ts">
  interface Props {
    ordered: any;
    start: any;
    children?: import('svelte').Snippet;
  }

  let { ordered, start, children }: Props = $props();
</script>
  
  {#if ordered}
    <ol {start}>{@render children?.()}</ol>
  {:else}
    <ul>{@render children?.()}</ul>
  {/if}

<style>
  ul,ol
  {
    list-style-position: inside;
    overflow: hidden;
    font-weight: 300;
    margin-top: 1rem;
  }
</style>