<script lang="ts">
    import { codeToHtml} from 'shiki'
    import { theme } from '../../../stores';
    import { fade, fly } from 'svelte/transition';

    export let lang : string = "svelte"
    export let text : string;

    let themeOption : string;
    let options : any;
    let copied : boolean = false

    function formatLanguage(input : string) : string
    {
      input =  input.toLowerCase();
      if(input == 'js')
        input = input.replace('js','javascript')
      return '// ' + input.toUpperCase() + ' //';
    }

    function getImageStyle(theme : string) : string
    {
      let style = "";
      style += 'filter:' + (theme == 'light' ? 'none' : 'invert()')
      return style;
    }

    function getStyle(theme : string) : string
    {
      return 'background-color:' + (theme == 'light' ? 'white;' : '#24292e;')
    }

    function copy()
    {
      // Write the content of the code block to the clipboard
      navigator.clipboard.writeText(text);
      copied = true;
      setTimeout(() => {copied = false}, 1000);
    }

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
  <div style={getStyle($theme)} class="top-bar">
    <div class="top-bar-left">
      <p class="language">{formatLanguage(lang)}</p>
    </div>
    <div class="top-bar-right">
      {#if copied}
        <p in:fade={{duration:100}} class="copy-message">COPIED TO CLIPBOARD</p>
      {:else}
        <button in:fade={{duration:100}} title="Copy code" on:click={copy}>
          <img style={getImageStyle($theme)} alt="copy source code top clipboard" src="/icons/copy.png" />
        </button>
      {/if}

    </div>
  </div>
  <div style={getStyle($theme)} class="code-block">
    {#await codeToHtml(text,options) then result}
      {@html result}
    {/await}
  </div>
{/key}

<style>
  button
  {
    border:none;
    background: none;
    cursor:pointer;
  }

  button:hover
  {
    opacity: 70%;
  }

  img
  {
    width : 1.4rem;
    margin:.25rem;
    margin-top: 0.35rem;
    filter:invert();
  }
  .language,.copy-message
  {
    font-weight: bold;
    opacity: 30%;
  }

  .top-bar-right
  {
    margin-left: auto;
  }

  .top-bar
  {
    display: flex;
    border-top: 1px rgb(127,127,127) solid;
    border-left: 1px rgb(127,127,127) solid;
    border-right: 1px rgb(127,127,127) solid;
    margin-top: 1rem;
  }
  .code-block
  {
    overflow: auto;
    border: 1px rgb(127,127,127) solid;
    margin: 0;
    padding: 0;
  }

  p
  {
    margin: 0;
    padding: .5rem;
  }
</style>


