<script lang="ts">
    import { Text } from "$lib/utils/text";

    export let depth : number;
    export let raw : string;
    export let text : string;
  </script>
  
  {#if depth === 1}
    <h1 id={Text.sluggify(text)}><slot></slot></h1>
  {:else if depth === 2}
    <h2 id={Text.sluggify(text)}><slot></slot></h2>
  {:else if depth === 3}
    <h3 id={Text.sluggify(text)}><slot></slot></h3>
  {:else if depth === 4}
    <h4 id={Text.sluggify(text)}><slot></slot></h4>
  {:else if depth === 5}
    <h5 id={Text.sluggify(text)}><slot></slot></h5>
  {:else if depth === 6}
    <h6 id={Text.sluggify(text)}><slot></slot></h6>
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
      font-size: 1.5rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  </style>