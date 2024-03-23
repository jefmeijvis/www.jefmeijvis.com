<script lang='ts'>
    import Code from "./code.svelte";
    import Math from "./math.svelte";

    export let lang : string;
    export let text : string;
</script>

{#if lang=='math'}
    <Math {lang} {text} ></Math>
{:else}
    <Code {lang} {text}></Code>
{/if}