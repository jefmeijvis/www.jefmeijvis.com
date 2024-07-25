---
author: Jef Meijvis
id : 29
image : /post/029/logo.png
title: Google Chrome Gemini Nano
date: 20240626
description : Google Chrome Gemini Nano.
category : AI 
published : true
---

# Gemini Nano
Google's LLM, Gemini Nano, has been brought to the browser starting from version 126.
Developers can already get a taste by [downloading latest version of Chrome Canary](https://www.google.com/intl/en_in/chrome/canary/)

## How to get started? 

- Download the latest version of [Chrome Canary](https://www.google.com/intl/en_in/chrome/canary/)
- Navigate to **chrome://flags** and enable the **Prompt API for Gemini Nano** flag.
- Also enable the **optimization-guide-on-device-model** by setting it to Enabled BypassPerfRequirement
- Next up, visit **chrome://components** and search for **Optimization Guide On Device Model component**. Make sure to update this to the latest version.

And that's it, you should be all set!

> I couldn't get the AI component to work on my Lenovo Legion laptop.
It did however work on a Lenovo Thinkpad. So depending on what machine you're tryin this on, your mileage may vary.

## Did it work? 
We can validate the AI component by running the following in the browser console:

```js
    await ai.canCreateGenericSession()
```

![When this method reports readily, you are ready to go! [medium]](images/ai-available.png)


## Creating a chatbot demo
### HTML
Using this local AI model we can create a crude chatbot. 
Let's do this in vanilla html/js/css, so we can all contain it in a single file.
You can also find the [end result on Github](https://github.com/jefmeijvis/www.jefmeijvis.com/blob/master/content/029-google-chrome-gemini-nano/demo.html).
We start out by defining our markup like so:

```html
    <h1>Chrome Canary AI demo</h1>

    <!-- Check to see if we're using a browser that can use AI features -->
    <p >window.ai.canCreateTextSession(): <span id="check"></span></p>

    <!-- A list to store the chat history -->
    <ul id="chat"></ul>

    <!-- Input field to type a message -->
    <input id="textbox" type="text"/>

    <!-- A button to send the message -->
    <button onclick="sendMessage()">Send</button>
```

And continue by adding a **script** tag so that we can interact with the chatbot. 

### Javascript
```html
<script>
    window.onload = runWhenLoaded;
    let sesion

    async function runWhenLoaded()
    {
        updateElementWithId('check', await window.ai.canCreateTextSession());
        session = await window.ai.createTextSession();
    }

    async function sendMessage()
    {
        let startTimestamp = performance.now();
        let textbox = document.getElementById('textbox');
        let message = textbox.value;
        textbox.value = "";

        let child = document.createElement('li');
        child.innerHTML = '<span class="human-chat-bubble">YOU </span>' + message;
        document.getElementById('chat').appendChild(child);

        let response = await session.prompt(message);
        console.log(response);
        let duration = Math.round(performance.now() - startTimestamp);
        let aiResponse = document.createElement('li');
        aiResponse.innerHTML = '<span class="ai-chat-bubble">AI </span>' + response + "<span class='timestamp'>" + duration + "ms.</span>";
        document.getElementById('chat').appendChild(aiResponse);
    }

    // Helper function to update a single elements
    function updateElementWithId(id,text)
    {
        let element = document.getElementById(id);

        if(element)
        {
            element.innerText = text;
        }
        else
            console.error('No DOM element found with id:',id)
    }
</script>
```

### CSS
Adding a little bit of style allows us to visualize if a chat message is from ourselves or from the AI. 

```html
<style>
    .timestamp
    {
        font-size: .7rem;
        opacity: 50%;
    }

    .ai-chat-bubble,.human-chat-bubble
    {
        list-style: none;
    }

    .ai-chat-bubble
    {
        background-color: rgb(255, 163, 163);
    }

    .human-chat-bubble
    {
        background-color: rgb(179, 179, 255);
    }

    body
    {
        font-family:Arial, Helvetica, sans-serif;
    }

    span
    {
        font-weight: bold;
    }
</style>
```
### Everything together
And there we go, this way we have an interactive chatbot which runs in the browser.
For reference, I'm running this on a Lenovo Thinkpad [13th Gen Intel i7-1355U](https://www.cpubenchmark.net/cpu.php?id=5317&cpu=Intel+Core+i7-1355U) with 32Gb of RAM. 
You can see from the results here below that a short single word (or number) takes a good second to generate. 
For longer responses you can see it approaches 10 seconds fairly quick.
With similar laptops you can't really use this model for longer or more complicated usecases. 
However, with the continuous increase in available compute, and the models getting more and more efficient, this can only become more and more impressive in the future. 

![A small chat session requires some patience on my device [medium]](images/chat-example-light.png)

As mentioned before, you can find the source code for the chat application on [Github](https://github.com/jefmeijvis/www.jefmeijvis.com/blob/master/content/029-google-chrome-gemini-nano/demo.html). Please make sure you're running Chrome Canary 126 or later, with the correct flags enabled.

## Further reading and relevant links
- https://muthuishere.medium.com/ai-within-your-browser-exploring-google-chromes-new-prompt-api-a5c2c6bd5b4c
- https://syntackle.com/blog/window-ai-in-chrome/

