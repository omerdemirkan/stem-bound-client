export function appendQueriesToUrl(url: string, queries: object[]): string {
    const keys = Object.keys(queries);
    if (!keys.length) {
        return url;
    }
    keys.forEach((key: string, index) => {
        url += `${!index ? "?" : "&"}${key}=${queries[key]}`;
    });
    return url;
}
