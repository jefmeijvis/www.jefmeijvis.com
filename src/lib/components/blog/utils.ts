export class BlogpostUtils
{
    public static formatDate(input : string) : string
    {
        // This method expects 19 december 2020 as 20201219 (YYYMMDD)
        var dateString = '' + input;
        var year = parseInt(dateString.substring(0,4));
        var month = parseInt(dateString.substring(4,6));
        var day = parseInt(dateString.substring(6,8));
        var date = new Date(year, month-1, day);       
        let result = date.getDate() + ' ' + date.toLocaleString('en-US', { month: 'short' }) + ', ' + date.getFullYear();
        return result
    }

    public static formatDateForCard(input : string) : string
    {
        return this.formatDate(input).replace(',',' // ').toUpperCase()
    }


}