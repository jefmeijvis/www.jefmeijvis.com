<script lang="ts">
    import { page } from "$app/stores";
    import { theme } from "../../../stores";

  interface Props {
    href?: string;
    title?: string;
    text?: string;
  }

  let { href = $bindable(''), title = $bindable(""), text = $bindable('') }: Props = $props();

    function getUrl(theme : string)
    {
        let themedHref : string = href;
        if(theme == 'light')
        {
            themedHref = themedHref.replaceAll('-dark','-light')
        }
        else
        {
            themedHref = themedHref.replaceAll('-light','-dark')
        }

        return '/content' + $page.url.pathname.replace('/blog','') + '/' + themedHref;
    }


    // Using /static allows autocomplete in VS code somehow, but breaks the image linking
    // So I just remove it before applying the href property of the img tag.
    if(href.includes("/static/post"))
        href = href.replace("/static/post","/content");


    let small : boolean = false;
    if(text.includes("[small]"))
    {
        small = true;
        text = text.replace("[small]","")
    }

    let medium : boolean = false;
    if(text.includes("[medium]"))
    {
        medium = true;
        text = text.replace("[medium]","")
    }

    if(!title || title == "")
        title = text;

    function getStyle()
    {
        if(small)
            return "width:25%;";

        if(medium)
            return "width:50%;";

        return "";
    }

</script>
  
<img loading="lazy" style="{getStyle()}" src={getUrl($theme)} {title} alt={text}>
<p class="alt-text"><i>Image: {text}</i></p>

<style>
    .alt-text
    {
        font-weight: 300;
        font-size: 1rem;
        text-align: center;
        margin-bottom: 2rem;
    }

    img
    {
        width : 100%;
        border-radius: .5rem;
        margin:auto;
        margin-top: 2rem;
        margin-bottom: 1rem;;
        display: block;
        outline: 1px solid rgb(127,127,127);
    }

    @media (max-aspect-ratio: 1/1) 
    {
        img
        {
            width : 100% !important;
        }
    }
</style>