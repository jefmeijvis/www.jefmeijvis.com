<svelte:head>
    <title>About - Jef Meijvis</title>
</svelte:head>

<img class="profile-picture" alt="Jef Meijvis" src="/images/profile.png"/>

<h1>About me</h1>
<p>
    My name is Jef. I'm a software security engineer, focusing mostly on the C# / Dotnet / Azure ecosystem. 
    I work as a cybersecurity consultant at DotnetLab, a company focussing on Microsoft technologies. 
    This blog will be used to post anything related to Cybersecurity, Dotnet development and Azure!
</p>

<p>I am a Microsoft Certified Trainer (MCT) since 2021, and enjoy giving talks!</p>

<div class="container">
    <img class="badge" alt="MCT Badge 2021" src="/images/about/mct-2021.png"/>
    <img class="badge" alt="MCT Badge 2022" src="/images/about/mct-2022.png"/>
    <img class="badge" alt="MCT Badge 2023" src="/images/about/mct-2023.png"/>
</div>

<h1>Pictures</h1>

<div class="container">
    <img class="picture" alt="Event" src="/images/about/talk-1.jpeg"/>
    <img class="picture" alt="Event" src="/images/about/talk-3.jpeg"/>
    <img class="picture" alt="Event" src="/images/about/event.jpg"/>
    <img class="picture" alt="Event" src="/images/about/company-event-2023.jpg"/>
</div>

<style>
    .container
    {
        display: flex;
        width : 100%;
        justify-content: space-evenly;
        margin-top: 2rem;
        margin-bottom: 2rem;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .picture
    {
        width: 40%;
        margin: 1rem;
        outline: 1px rgb(127,127,127) solid;
    }

    img
    {
        object-fit: cover;
    }

    .badge
    {
        width: 15%;
    }
    .profile-picture
    {
        border-radius: 100%;
        width: 12rem;
        filter:grayscale();
        margin:auto;
        display: block;
    }

    @media (max-aspect-ratio: 1/1)
    {
        h1,p
        {
            text-align: center;
        }

        .picture
        {
            width: 80%;
        }

        .badge
        {
            width: 30%;
        }
    }
</style>