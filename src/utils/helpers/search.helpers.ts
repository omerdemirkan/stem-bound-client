import { ESearchFields } from "../types/search.types";
import { EUserRoles } from "../types";
import { defaultSearchFields } from "../constants";

export function isSearchField(s: any): boolean {
    if (typeof s !== "string") return false;
    return Object.values(ESearchFields).includes(s);
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
