import { ESearchFields } from "../types/search.types";
import { EUserRoles } from "../types";
import { defaultSearchFields, searchFieldDisplayTable } from "../constants";

export function isSearchField(s: any): boolean {
    if (typeof s !== "string") return false;
    return Object.values(ESearchFields).includes(s);
}

export function isUserSearchField(s: any): boolean {
    return isSearchField(s) && Object.values(EUserRoles).includes(s);
}

export function SearchField(
    s: any,
    options?: { userRole?: EUserRoles }
): ESearchFields {
    if (isSearchField(s)) {
        return s as ESearchFields;
    } else {
        return getDefaultSearchField(options?.userRole);
    }
}

export function getDefaultSearchField(userRole: EUserRoles) {
    return defaultSearchFields[userRole] || ESearchFields.INSTRUCTOR;
}

export function getDisplaySearchField(searchField: ESearchFields) {
    return searchFieldDisplayTable[searchField];
}
