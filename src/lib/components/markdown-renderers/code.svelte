<script lang="ts">
    import { codeToHtml} from 'shiki'
    import { theme } from '../../../stores';

    export let lang : string = "svelte"
    export let text : string;

    let themeOption : string;
    let options : any;

    $: {
      themeOption = $theme == 'light' ? "github-light" : "github-dark";
      options = 
      {
          lang: lang,
          theme: themeOption
      }
    }


</script>

{#key $theme}
  <p>{lang}</p>
  {#await codeToHtml(text,options) then result}
    {@html result}
  {/await}
{/key}

<style>
  p
  {
    border-top: 1px rgb(127,127,127) solid;
    border-left: 1px rgb(127,127,127) solid;
    border-right: 1px rgb(127,127,127) solid;
    margin: 0;
    padding: .5rem;
  }
</style>


