<script>

    import { theme } from "../../../stores";
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();

</script>
<blockquote class:light={$theme == 'light'} class:dark={$theme != 'light'}>
    <p><b>Note</b></p>
    {@render children?.()}
</blockquote>


<style>
    .light
    {
        background-color: rgb(255, 208, 0);
        outline: 1px rgb(189, 159, 7) solid;
    }

    .dark
    {
        background-color: rgb(95, 83, 18);
        outline: 1px rgb(185, 155, 4) solid;
    }

    .dark p
    {
        color:rgb(255, 213, 0);
    }

    blockquote
    {
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding : 1rem;
        border-radius: .5rem;
        text-align: justify;
        font-weight: 300;
    }    
</style>