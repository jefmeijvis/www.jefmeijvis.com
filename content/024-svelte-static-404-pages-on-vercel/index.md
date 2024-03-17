---
author: Jef Meijvis
id : 24
image : /post/024/logo.png
title: Svelte static 404 pages on Vercel
date: 20240116
description : Redirect traffic to your 404 pages with Sveltekit static adapter when hosting on Vercel.
category : Frontend 
published : true
---

## Sveltekit error pages
By default Sveltekit, will render your request on the server and hydrate it in the browser. 
When something goes wrong while doing so, Sveltekit will treewalk up your routing directory and [look for the nearest +error.svelte page](https://kit.svelte.dev/docs/routing#error). This allows us to deliver customized error pages fitting for the specific context of our website. 

Whenever the routing logic inside of Sveltekit can't find the requested page, it will look at the root of the routing folder over at */src/routes/+error.svelte* and render the +error.svelte page.
This give us the opportunity to catch any badly written or incorrect URL's, and give the user a way back to the homepage. 

## Static adapter
When using the static adapter from [@sveltejs/adapter-static](https://kit.svelte.dev/docs/adapter-static), this behavior remains the same:
A request to a non-existent url such as *mywebsite.com/bloggg* will render the +page.svelte page at the root of the routing folder.
This can be demonstrated by executing a local build and preview of your sveltekit project using this adapter.
Below is an example of a minimal *svelte.config.js* file using this adapter. 

```js
    import adapter from '@sveltejs/adapter-static';

    const config = {
        kit: {
            adapter: adapter(),
        }
    };
    export default config;
```

## Hosting on Vercel
However, when hosting our static project on [Vercel](https://www.vercel.com), a problem shows up. 
When we request a non-existent url, we are greeted with the generic Vercel error page. 

![Generic Vercel error [medium]](images/vercel-error-light.png)

This page isn't really helpful, and pulls the user out of the website.
We can do better and help a website visitor with a customized error page, even when the website is prerendered.

## Handling status codes on Vercel

To resolve this we can create a *vercel.json* file at the root of our project.
Here we can point all *404 NOT_FOUND* status codes to any url we prefer. 
In this case i'm pointing all requests to */404*.

```json
    {
        "routes": 
        [
            { 
                "handle": "filesystem" 
            },
            { 
                "src": "/(.*)", 
                "status": 404, 
                "dest": "/404" 
            }
        ]
    }
```

Additionally, we also need to create this specific route. 
In my case I created a Svelte page under */src/routes/404/page.svelte*.
An example error page implementation could be as follows:

```svelte
    <h1>Oops - Page not found!</h1>
    <p>Click <a href="/">here</a> to go back to the homepage</p>

    <style>
        h1,p
        {
            text-align:center;
        }
    </style>
```

And there we have it, custom 404 pages when hosting a statically build Sveltekit project on Vercel. 
This very own blog your reading now uses the same mechanic!

## Further reading and relevant links
- https://vercel.com/guides/custom-404-page
- https://kit.svelte.dev/docs/routing#error