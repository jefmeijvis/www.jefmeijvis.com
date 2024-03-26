<script lang='ts'>
    import Code from "./code.svelte";
    import Math from "./math.svelte";

    export let lang : string;
    export let text : string;
</script>

{#if lang=='math'}
    <!-- Render mathematical TeX equations -->
    <Math {text} ></Math>
{:else}
    <!-- Render all other languages -->
    <Code {lang} {text}></Code>
{/if}