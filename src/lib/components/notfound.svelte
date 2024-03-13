<script lang="ts">
	import { goto } from "$app/navigation";
	import { onDestroy } from "svelte";

    let href : string = "/"
    export let timer : number = 10_000

    let timeout : NodeJS.Timeout = setTimeout(countdown,1000);

    function countdown()
    {
        timer -= 1000;

        if(timer < 1000)
        {
            goto(href);
        }

        timeout = setTimeout(countdown,1000);
    }

    onDestroy(doOnDestroy)

    function doOnDestroy()
    {
        clearTimeout(timeout);
    }
</script>

<div>
    <h1>Oops!</h1>
    <p>We can't find anything at this location.</p>
    <p>We're redirecting you to the <a {href}>homepage</a> in {Math.floor(timer / 1000)} seconds.</p>    
</div>

<style>
    div
    {
        min-height: 100vh;
    }

    h1,p
    {
        text-align: center;
    }
</style>
