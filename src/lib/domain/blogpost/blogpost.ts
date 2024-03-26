export type Blogpost =
{ 
    id : number,
    title : string,
    path : string,
    description : string,
    date : string,
    markdown : string,
    attributes : any,
    category : string,
    views : number,
    published : boolean,
}