<script>
    import { theme } from "../../../stores";

</script>

<button data-umami-event="button-navbar-desktop-toggle-theme" title="Toggle theme" class="theme" onclick={()=>$theme = ($theme == "light" ? 'dark' : 'light')}>
    <img class="theme-img" style="{$theme=='dark' ? 'filter:invert()' : ''}" alt="theme toggle" src={$theme == 'dark' ? '/icons/light.png' : '/icons/dark.png'}/>
</button>

<style>
    button
    {
        background:none;
        border:none;
        float:right;
        margin:1rem;
    }

    .theme
    {
        font-weight: bold;
        color:var(--color-text-normal);
        opacity: 85%;
        cursor:pointer;
        transition: all ease .1s;
        padding-top: .3rem;
    }

    .theme:hover
    {
        opacity: 100%;
        filter: drop-shadow(0px 0px 10px #ffffff);
    }

    img
    {
        width : 1.5rem;
    }

    @media (max-aspect-ratio: 1/1) 
    {
        button
        {
            display: none;
        }
    }
</style>