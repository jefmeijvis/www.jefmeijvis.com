<script lang="ts">
    import Notfound from "$lib/components/notfound.svelte";

    /*
        Via: https://vercel.com/guides/custom-404-page:
        Emit a 404.html file to your Output Directory and it 
        will be served as the 404 page when a route does not match any other static file.
    */
</script>

<svelte:head>
    <title>Page not found - Jef Meijvis</title>
</svelte:head>

<Notfound></Notfound>
