import type { Link } from "./link";

export function AddLink(links: Link[], name : string, href : string)
{
    links.push({name:name,href:href}) ;
}


