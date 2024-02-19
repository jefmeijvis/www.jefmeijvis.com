import type { Blogpost } from "./blogpost";

// A sorting function must return a negative or positive value 
// when a blogpost is sorted higher or lower in sorting order.
export type SortingFunction = ( a : Blogpost, b : Blogpost) => number

export function sortByIdAscending(a : Blogpost, b : Blogpost)
{
    return a.id - b.id;
}

export function sortByIdDescending(a : Blogpost, b : Blogpost)
{
    return b.id - a.id;
}

export function sortByViewsDescending(a : Blogpost, b : Blogpost)
{
    return b.views - a.views;
}

