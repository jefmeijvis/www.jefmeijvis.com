---
author: Jef Meijvis
id : 25
image : /post/025/logo.png
title: Rendering mathematical equations
date: 20240219
description : Rendering TeX syntax source from markdown to HTML using mathlifier.
category : Frontend 
published : true
---

## Rendering mathematical equations
For a while I've been wanting to expand the capabilities of my blogging setup to allow for the rendering of mathematical equations.
There were a few requirements for doing so:
- Equations must fit in a markdown syntax
- Equations must be rendered as a set of vectors, not as an image in bitmap format
- Equations must be visible in the sourcecode on GitHub as well

### GitHub support
Since the 19th of May 2022 [[1]](#references) GitHub supports the rendering of equations in TeX format.
TeX [[2]](#references) is a mathematical typesetting system released in 1978 by computer scientist [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth).
It allows for free, accessible and reproducible results. It is still wildly used in academics to this day. Below is an example of how TeX notation get's converted:

![From TeX notation to rendered output [medium]](images/tex-notation-light.png)

GitHub makes use of [MathJax](https://www.mathjax.org/) to render these equations under the hood.
There are two ways [[3]](#references) to indicate a piece of text is a mathematical equation:
- Using a dollar or double dollar sign delimiter: $
- Using a code block with triple backticks where the language is set to 'math'

Since my current blogging setup already uses triple backticks to display code, it seems to be the most straight forward solution.
This means that we can write our equation as code with the language set to 'math', while still being valid Markdown syntax:

![TeX syntax as valid markdown by making use of a code block [medium]](images/tex-in-markdown-light.png)

### Mathlifier
At this point we have satisfied 2 out of the 3 requirements: Markdown syntax and rendering on GitHub.
The most important one remains: rendering our equations into HTML. For this I've opted for the NPM package [Mathlifier](https://www.npmjs.com/package/mathlifier).
It is a wrapper around [KaTeX](https://www.npmjs.com/package/katex), which in its turn is a package for rendering TeX equations on the web!

Because all code blocks are rendered by a separate Svelte component, I can now add some logic to detect when the code language is set to 'math' like so:

```svelte
    <script lang='ts'>
    import Code from "./code.svelte";
    import Math from "./math.svelte";

    export let lang : string;
    export let text : string;
    </script>

    {#if lang=='math'}
        <!-- Render mathematical TeX equations -->
        <Math {text} ></Math>
    {:else}
        <!-- Render all other languages -->
        <Code {lang} {text}></Code>
    {/if}
```

Inside of the Math.svelte component I can make use of [Mathlifier](https://www.npmjs.com/package/mathlifier) to correctly display the equation like so:

```svelte
<script lang='ts'>
    import {display} from 'mathlifier';
    export let text : string;
</script>

<svelte:head>
    <link rel="stylesheet" href="/css/katex.css" />
</svelte:head>

{@html display(text)}
```
And that's how I render TeX syntax to HTML on this blog!

## An example with the quadratic formula
Below is an example where a proof is shown for the quadratic formula:

Let a, b, and c be real number. The solutions of

```math
    ax^2+bx+c=0
```
can be defined as:

```math
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
```

### Proof

Proof. In order to prove the quadratic formula, we use the process of completing
the square. Starting with

```math
    ax^2+bx+c=0
```
arithmetic gives us

```math
    ax^2+bx=-c
```

```math
    x^2+\frac{b}{a}x=-\frac{c}{a}
```

```math
    x^2+\frac{b}{a}x+\frac{b^2}{4a^2}=-\frac{c}{a}+\frac{b^2}{4a^2}
```

```math
    \Bigg(x+\frac{b}{2a}\Bigg)^2=-\frac{4ac}{4a^2}+\frac{b^2}{4a^2}
```

```math
    x+\frac{b}{2a}=\pm\sqrt[]{\frac{b-4ac}{4a^2}}
```

```math
    x=\frac{-b\pm\sqrt[]{b^2-4ac}}{2a}
```

The above proof serves as a stress test of some kind, rendering multiple complex and nested equations.
The TeX syntax for this proof is taken from a public template on OverLeaf [[4]](#references).

## References
- [1] [https://github.blog/2022-05-19-math-support-in-markdown/](https://github.blog/2022-05-19-math-support-in-markdown/)
- [2] [https://www.tug.org/](https://www.tug.org/)
- [3] [https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions)
- [4] [https://www.overleaf.com/articles/the-quadratic-formula/wprdthgttvzm](https://www.overleaf.com/articles/the-quadratic-formula/wprdthgttvzm)