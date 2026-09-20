<script lang="ts">
    import { getTheme } from "../../stores";
    const theme = getTheme();
    let keywords : string[] = ["CyberSecurity" , "Azure" , "Frontend" , "Svelte" , "Cloud Native" , "Software","CyberSecurity" , "Azure" , "Frontend" , "Svelte" , "Cloud Native" , "Software"]
</script>

<div class="background-effect" aria-hidden="true">
<p style="opacity:{$theme == 'dark' ? '5%' : '6%'}">
   {keywords.join(' // ')}
</p>
</div>

<style>
    .background-effect
    {
        position: absolute;
        top: 0;
        left: 0;
        right:0;
        bottom:0;
        pointer-events: none;
        overflow: hidden;
        z-index: -1;
        transition: none;
    }

    p
    {
        display: block;
        position: absolute;
        right : 0;
        transform: rotate(180deg);
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