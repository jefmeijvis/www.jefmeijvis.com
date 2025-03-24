import fs from 'fs';
let globalTimestamp = performance.now();

// Cache the result of a given function on the local filesystem
export async function LocalCache(func : Function, cacheSeconds : number, description : string)
{
    let additionalTime = "+" + Math.floor((performance.now() - globalTimestamp)*1000).toString().padStart(4," ") + "µs\t"
    let logMessage =  additionalTime + "[LocalCacheAsync] ";
    globalTimestamp = performance.now();
    let filename : string = generateFilename('async-' + description);

    let [cacheStatusOk,cacheAge] = cacheIsOk(filename,cacheSeconds);
    if(description.length > 30)
    {
        description = description.slice(0,27)
        description += '...'
    }
    else
    {
        description = description.padEnd(30,' ')
    }
    
    if(cacheStatusOk)
    {
        logMessage += " 🟢 [" + description + "] in cache.";
        logMessage += "\t⏱️ Age is " + generateCacheAgeMessage(cacheAge)
        let responseAsString = fs.readFileSync(filename).toString();

        const size = Buffer.byteLength(responseAsString);
        const kiloBytes = Math.round(size / 1024);
        logMessage += "\t💿 " + kiloBytes + " kb."

        let response = JSON.parse(responseAsString);
        console.log(logMessage);
        return response; 
    }
    else
    {
        logMessage += " 🟠 " + description + " not in cache, got from API";
        logMessage += "\t⏱️ Age is " + generateCacheAgeMessage(cacheAge)
        
        let result = func();
        let response = await Promise.resolve(result)
        let responseAsJSON = JSON.stringify(response)

        const size = Buffer.byteLength(responseAsJSON);
        const kiloBytes = Math.round(size / 1024);
        logMessage += "\t💿 " + kiloBytes + " kb."

        fs.writeFileSync(filename, responseAsJSON);
        console.log(logMessage);
        return response;
    }

}

// The same as LocalCache, but for synchronous functions
export function LocalCacheSync(func : Function, cacheSeconds : number, description : string)
{
    let logMessage = "[LocalCacheSync] ";
    let filename : string = generateFilename('sync-' + description);

    let [cacheStatusOk,cacheAge] = cacheIsOk(filename,cacheSeconds);

    if(cacheStatusOk)
    {
        logMessage += " 🟢 [" + description + "] in cache.";
        logMessage += "\t⏱️ Age is " + generateCacheAgeMessage(cacheAge)
        let responseAsString = fs.readFileSync(filename).toString();

        const size = Buffer.byteLength(responseAsString);
        const kiloBytes = Math.round(size / 1024);
        logMessage += "\t💿 " + kiloBytes + " kb."

        let response = JSON.parse(responseAsString);
        console.log(logMessage);
        return response; 
    }
    else
    {
        logMessage += " 🟠 " + description + " not in cache, got from API";
        logMessage += "\t⏱️ Age is " + generateCacheAgeMessage(cacheAge)
        
        let result = func();
        let responseAsJSON = JSON.stringify(result)

        const size = Buffer.byteLength(responseAsJSON);
        const kiloBytes = Math.round(size / 1024);
        logMessage += "\t💿 " + kiloBytes + " kb."

        fs.writeFileSync(filename, responseAsJSON);
        console.log(logMessage);
        return result;
    }
}

function generateCacheAgeMessage(seconds : number) : string
{
    // Returns a string message that displays the cache age. E.g. 
    // 153 seconds
    // 14 hours
    // 17 days etc..
    let minutes = 0;
    let hours = 0;
    let days = 0;
    
    if(seconds >= 60)
    {
        minutes = Math.floor(seconds / 60);

        if(minutes >= 60)
        {
            hours = Math.floor(minutes / 60)
            minutes = minutes - hours * 60;
        }

        seconds = seconds - (hours * 60 * 60) - minutes * 60;

        if(hours >= 24)
        {
            days = Math.floor(hours / 24);
            hours = hours - days * 24;
        }
    }

    if(days > 0)
        return days + 'd ' + hours + "h " + minutes + "m " + seconds + "s."

    if(hours > 0)
        return hours + "h " + minutes + "m " + seconds + "s."

    if(minutes > 0)
        return minutes + "m " + seconds + "s."
    
    return seconds + "s."
}

function getSecondsAge(input : Date) : number
{
    let today = new Date();
    return Math.round(Math.abs(today.getTime() - input.getTime()) / 1000);
}

function generateFilename(input : string) : string
{
    return 'cache/' + input + '.cache';
}

function cacheIsOk(path : string, maximumAge : number) : [boolean,number]
{

    let fileExists : boolean = fs.existsSync(path);

    if(!fileExists)
        return [false,-1];

    let stats = fs.statSync(path);
    let diff : number =  getSecondsAge(stats.mtime)// Cache age in seconds
    if(diff > maximumAge)
        return [false,diff];

    return [true,diff];
}