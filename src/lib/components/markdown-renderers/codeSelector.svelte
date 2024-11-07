<script lang='ts'>
    import Code from "./code.svelte";
    import Math from "./math.svelte";

    interface Props {
        lang: string;
        text: string;
    }

    let { lang, text }: Props = $props();
</script>

{#if lang=='math'}
    <!-- Render mathematical TeX equations -->
    <Math {text} ></Math>
{:else}
    <!-- Render all other languages -->
    <Code {lang} {text}></Code>
{/if}