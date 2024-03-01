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

    public static formatViewCount(input : number) : string
    {
        // StackOverflow voodoo magic via: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}