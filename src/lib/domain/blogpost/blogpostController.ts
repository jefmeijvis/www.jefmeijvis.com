import {type Blogpost} from "./blogpost";
import fs from "fs"
import fm from 'front-matter';

export function getBlogposts() : Blogpost[]
{
    let result = new Array<Blogpost>();
    let dirs = getDirectories('./content');

    for(let i = 0 ; i < dirs.length ; i++)
    {
        let dir = dirs[i];
        let filepath = './content/' + dir + '/index.md';
        let file = fs.readFileSync(filepath, 'utf8');
        let parsed = fm(file);
        let post = {} as Blogpost;
        post.title = dir.slice(4);
        post.markdown = parsed.body;
        post.path = dir;
        //@ts-ignore
        post.id = Number.parseInt(dir.slice(0,3));
        //@ts-ignore
        post.date = parsed.attributes.date;
        //@ts-ignore
        post.description = parsed.attributes.description;
        //@ts-ignore
        post.category = parsed.attributes.category;
        post.views = Math.round(Math.random() * 1000);
        result.push(post);
    }

    return result.sort(sortingFunction);
}

function sortingFunction(a : Blogpost, b : Blogpost) : number
{
    return ('' + b.date).localeCompare(a.date);
}

function getDirectories(path : string) : string[]
{
    //console.log('📂 scanning ' + path + ' for directories')
    return fs.readdirSync(path,{ withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(dirent => dirent.name);
}