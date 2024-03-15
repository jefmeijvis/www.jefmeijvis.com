<script lang="ts">
    import { theme } from "../../stores";
    let y : number;

    function getTransform(input : number)
    {
        return 'rotate(180deg) translate(0,' + input + 'px)'
    }

    let keywords : string[] = ["CyberSecurity" , "Azure" , "Frontend" , "Svelte" , "Cloud Native" , "Software","CyberSecurity" , "Azure" , "Frontend" , "Svelte" , "Cloud Native" , "Software"]
</script>

<div class="background-effect">
<p style="transform:{getTransform(y)};opacity:{$theme == 'dark' ? '5%' : '6%'}">
   {keywords.join(' // ')}
</p>
</div>

<svelte:window bind:scrollY={y} />

<style>
    .background-effect
    {
        position: fixed;
        top: 0;
        left: 0;
        right:0;
        bottom:0;
        pointer-events: none;
        overflow: hidden;
        z-index: -1
    }

    p
    {
        display: block;
        position: absolute;
        right : 0;
        writing-mode: tb-rl;
        font-size: 7rem;
        text-wrap: nowrap;
        text-align: right;
        user-select: none;
        color: var(--color-text)
}

@media (max-aspect-ratio: 1/1) 
{
    .background-effect
    {
        display: none;
    }
}
</style>