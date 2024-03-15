<script>
    import { page } from "$app/stores";
</script>

<svelte:head>
    {#if !$page.url.pathname.includes("/blog/")}
        <!--GENERAL META TAGS-->
        <meta name="description" content="Blogging about CyberSecurity and software development using .NET, Svelte and Azure.">
        <meta name="keywords" content="Svelte, Cybersecurity, Azure, Microsoft, dotnet, .NET, HTML, CSS, JavaScript">
        <meta name="author" content="Jef Meijvis">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://www.jefmeijvis.com">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Jef Meijvis">
        <meta property="og:description" content="Blogging about CyberSecurity and software development using .NET, Svelte and Azure.">
        <meta property="og:image" content="https://jefmeijvis.com/images/opengraph.png">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta property="twitter:domain" content="jefmeijvis.com">
        <meta property="twitter:url" content="https://www.jefmeijvis.com">
        <meta name="twitter:title" content="Jef Meijvis">
        <meta name="twitter:description" content="Blogging about CyberSecurity and software development using .NET, Svelte and Azure.">
        <meta name="twitter:image" content="https://jefmeijvis.com/images/opengraph.png">
    {/if}
</svelte:head>