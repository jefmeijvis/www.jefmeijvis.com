<script lang='ts'>
    import {display} from 'mathlifier';
    export let text : string;
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/katex.css" />
</svelte:head>

{@html display(text)}