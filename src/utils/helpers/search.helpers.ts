import { ESearchQueries } from "../types/search.types";
import { EUserRoles } from "../types";
import { defaultSearchQueries } from "../constants";

export function isSearchQuery(s: any): boolean {
    if (typeof s !== "string") return false;
    return Object.values(ESearchQueries).includes(s);
}

export function SearchQuery(
    s: any,
    options?: { userRole?: EUserRoles }
): ESearchQueries {
    if (isSearchQuery(s)) {
        return s as ESearchQueries;
    } else {
        return getDefaultSearchQuery(options.userRole);
    }
}

export function getDefaultSearchQuery(userRole: EUserRoles) {
    return defaultSearchQueries[userRole] || ESearchQueries.INSTRUCTOR;
}
