import { urlRegex } from "../constants/regex.constants";

export * from "./location.helpers";
export * from "./course.helpers";
export * from "./school.helpers";
export * from "./http.helpers";
export * from "./store.helpers";
export * from "./form.helpers";
export * from "./navigation.helpers";
export * from "./search.helpers";
export * from "./user.helpers";
export * from "./chat.helpers";
export * from "./api.helpers";

// Put common helpers here
export function capitalizeWords(s: string) {
    return s
        .toLowerCase()
        .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}

export function removeDuplicates(
    array: any[],
    {
        key,
    }: {
        key: string;
    }
) {}

export function isValidUrl(s: string): boolean {
    return urlRegex.test(s);
}
