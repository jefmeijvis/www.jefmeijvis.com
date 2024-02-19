export class Text
{
    public static desluggify(input : string) : string
    {
        input =  input.replaceAll('-',' ');
        input = this.capitalize(input);
        return input;
    }

    public static capitalize(input : string) : string
    {
        return input.slice(0,1).toUpperCase() + input.slice(1,input.length)
    }
}