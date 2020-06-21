export * from "./geolocation.helpers";

// Put common helpers here
export function capitalizeWords(s: string) {
    return s
        .toLowerCase()
        .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}
