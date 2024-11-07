<script lang="ts">
    import { Text } from "$lib/utils/text";

  interface Props {
    depth: number;
    raw: string;
    text: string;
    children?: import('svelte').Snippet;
  }

  let {
    depth,
    raw,
    text,
    children
  }: Props = $props();
  </script>
  
  {#if depth === 1}
    <h1 id={Text.sluggify(text)}>{@render children?.()}</h1>
  {:else if depth === 2}
    <h2 id={Text.sluggify(text)}>{@render children?.()}</h2>
  {:else if depth === 3}
    <h3 id={Text.sluggify(text)}>{@render children?.()}</h3>
  {:else if depth === 4}
    <h4 id={Text.sluggify(text)}>{@render children?.()}</h4>
  {:else if depth === 5}
    <h5 id={Text.sluggify(text)}>{@render children?.()}</h5>
  {:else if depth === 6}
    <h6 id={Text.sluggify(text)}>{@render children?.()}</h6>
  {:else}
    {raw}
  {/if}

  <style>
    h1,h2
    {
        background-color: var(--color-accent);
        color:var(--color-text-secondary);
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    h3,h4
    {
      font-size: 1.2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  </style>