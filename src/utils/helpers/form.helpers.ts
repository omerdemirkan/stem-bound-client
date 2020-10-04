import { clone } from "./state.helpers";

export function removeEmptyStrings<T>(
    obj: any,
    options?: { clone?: boolean }
): Partial<T> {
    obj = options?.clone ? clone(obj) : obj;

    if (Array.isArray(obj)) {
        obj = obj.filter((value) => value !== "");
        obj.forEach(function (value) {
            if (typeof value === "object") removeEmptyStrings(value);
        });
    } else if (typeof obj === "object") {
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] === "object") {
                removeEmptyStrings(obj[key]);
            } else if (obj[key] === "") {
                delete obj[key];
            }
        });
    }

    return obj;
}
