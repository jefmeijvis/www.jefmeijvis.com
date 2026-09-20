<script lang="ts">
  interface Props {
    href?: string;
    title?: string;
    children?: import('svelte').Snippet;
  }

  let { href = '', title = "", children }: Props = $props();

    let target = $derived(
      href.includes('www.jefmeijvis.com') || href.includes('localhost:') ||
      href.startsWith('/') || href.includes('#') ? '_self' : '_blank'
    );

  </script>
  
  <a {target} {href} {title}>
    {@render children?.()}
  </a>


  <style>
    a
    {
        padding : .10rem;
        border-radius: .25rem;
        color:var(--color-text-primary);
    }

    a:hover
    {
        opacity: 50%;
    }
  </style>