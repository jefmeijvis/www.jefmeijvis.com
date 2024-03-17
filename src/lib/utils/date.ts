export function getDaysSince(input : string) : number
{
    let date_1 = new Date(input);
    let date_2 = new Date();
    let difference = Math.abs(date_1.getTime() - date_2.getTime());
    let differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));
    return differenceInDays;
}

export function getHoursSince(input : Date) : number
{
    let now = new Date()
    let difference = Math.abs(now.getTime() - input.getTime());
    let differenceInHours = difference / (1000 * 3600);
    return differenceInHours;
}