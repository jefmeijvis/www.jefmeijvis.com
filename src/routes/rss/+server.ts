import type { Blogpost } from "$lib/domain/blogpost/blogpost";
import { getBlogposts } from "$lib/domain/blogpost/blogpostController";
export const prerender = true

// Header options
const responseInit : ResponseInit =
{
    headers : 
    {
      'Cache-Control': `max-age=0, s-max-age=${600}`,
      'Content-Type': 'application/xml',
    }
}



let bodyStart = '<?xml version="1.0" encoding="UTF-8" ?>' 
+ '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">'
+ '<channel>'
+ '<atom:link href="https://www.jefmeijvis.com/rss" rel="self" type="application/rss+xml" />' 
+ '<title>Jef Meijvis</title>' 
+ '<link>https://www.jefmeijvis.com</link>' 
+ '<language>en</language>'
+ '<description>Blogging about general secure software development. Often making use of .NET, Azure and Svelte</description>'
+ '<image>'
  + '<url>https://www.jefmeijvis.com/profile-picture.png</url>'
  + '<title>Jef Meijvis</title>'
  + '<link>https://www.jefmeijvis.com</link>'
+'</image>'

let bodyEnd = '</channel>' + '</rss>';


export async function GET() 
{
  let blogposts : Blogpost[] = await getBlogposts();

  let body : string = bodyStart;
  for(let i = 0 ; i < blogposts.length ; i++)
  {
    let post  = blogposts[i];
    body += '<item>';

    // Title
    body += '<title>'
    body += post.title;
    body += '</title>'

    // Link
    body += '<link>'
    body += generateLink(post);
    body += '</link>'

    // Description
    body += '<description>'
    body += generateDescription(post);
    body += '</description>'

    // Guid
    body += '<guid isPermaLink="true">'
    body += generateLink(post);
    body += '</guid>'

    // Guid
    body += '<source url="https://www.jefmeijvis.com/rss">'
    body += 'Jef Meijvis'
    body += '</source>'

    // Enclosure
    body += '<enclosure url="http://www.jefmeijvis.com/content/' + post.path + '/images/opengraph.png" length="221004" type="image/png" />'

    // PubDate
    body += '<pubDate>'
    body += generateDate(post);
    body += '</pubDate>'

    body += '</item>';
  }

  body += bodyEnd;
  return new Response(body,responseInit);
}

function generateDescription(post : Blogpost)
{
  let desc : string =  post.description;
  return desc;
}

function generateDate(post : Blogpost) : string
{
  return pubDate(yyymmddToDate(post.date));
}

function generateLink(post : Blogpost) : string
{
  return 'https://www.jefmeijvis.com/blog/' + post.path
}


function pubDate(date : Date) : string 
{

    if (typeof date === 'undefined') {
      date = new Date();
    }
  
    var pieces     = date.toString().split(' '),
        offsetTime = pieces[5].match(/[-+]\d{4}/),
        offset     = (offsetTime) ? offsetTime : pieces[5],
        parts      = [
          pieces[0] + ',',
          pieces[2],
          pieces[1],
          pieces[3],
          pieces[4],
          offset
        ];
  
    return parts.join(' ');
  }

  function yyymmddToDate(input : string) : Date
  {
    input = input + ""
    var year = Number.parseInt(input.substring(0,4));
    var month = Number.parseInt(input.substring(4,6));
    var day = Number.parseInt(input.substring(6,8));

    return new Date(year, month-1, day);
  }