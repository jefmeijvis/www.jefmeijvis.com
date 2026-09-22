import * as privateEnv from '$env/static/private';

let snapshot: Promise<Map<string, number> | undefined> | undefined;

export function getPageviews(): Promise<Map<string, number> | undefined> {
    return snapshot ??= fetchPageviews();
}

export function pageKey(page: string): string {
    return page.split(/[?#]/, 1)[0].replace(/\/+$/, '').toLowerCase() || '/';
}

async function fetchPageviews(): Promise<Map<string, number> | undefined> {
    const apiKey = (privateEnv as Record<string, string>).PAGEVIEWS_API_KEY;
    if (!apiKey) {
        console.warn('PAGEVIEWS_API_KEY is not set; page view counts are omitted.');
        return undefined;
    }
    const response = await fetch('https://services.admin.jefmeijvis.com/api/pageviews', {
        headers: { 'X-API-Key': apiKey },
        signal: AbortSignal.timeout(15_000)
    });
    if (!response.ok) throw new Error('Pageviews request failed (' + response.status + ').');
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error('Invalid pageviews response: expected an array.');
    const counts = new Map<string, number>();
    for (const row of rows) {
        if (!row || typeof row.page !== 'string' || !row.page.startsWith('/') ||
            !Number.isSafeInteger(row.viewcount) || row.viewcount < 0) {
            throw new Error('Invalid pageviews response: expected page and non-negative viewcount.');
        }
        const key = pageKey(row.page);
        counts.set(key, (counts.get(key) ?? 0) + row.viewcount);
    }
    return counts;
}
