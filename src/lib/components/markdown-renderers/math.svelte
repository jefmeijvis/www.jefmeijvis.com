<script lang='ts'>
    import {display} from 'mathlifier';
    interface Props {
        text: string;
    }

    let { text }: Props = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/katex.css" />
</svelte:head>

{@html display(text)}