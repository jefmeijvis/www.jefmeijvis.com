<div class="container" id="introduction">
    <div class="left">
        <h1>Jef Meijvis</h1>
        <p>
            Blogging about CyberSecurity and software development using .NET, Svelte and Azure. 
        </p>
    </div>
    <div class="right">
        <img alt="Jef Meijvis" src="/images/profile.png"/>
    </div>
</div>


<style>
    .container
    {
        display: flex;
    }

    img
    {
        width: 100%;
        filter:grayscale();
        outline: 1px rgb(127,127,127) solid;
        border-radius: 100%;;
    }

    .left
    {
        width: 85%;
    }

    .right
    {
        width : 15%;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        .container
        {
            flex-direction: column;
        }

        .left,.right
        {
            width: 100%;
        }

        .right
        {
            text-align: center;
        }

        img
        {
            width: 40%;
            margin:auto;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        h1,p
        {
            text-align: center;
        }
    }
</style>