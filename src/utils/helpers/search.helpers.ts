import { ESearchQueries } from "../types/search.types";

export function isSearchQuery(s: any): boolean {
    if (typeof s !== "string") return false;
    return Object.values(ESearchQueries).includes(s);
}
