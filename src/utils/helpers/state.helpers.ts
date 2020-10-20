import rfdc from "rfdc";
import { IStoreArrayOptions, IAsyncActionOptions } from "../types";

export const clone = rfdc({ proto: false, circles: false });

// A helper used in reducers
export function updateState<T>(state: T, updates: Partial<T>): T {
    return Object.assign(clone(state), updates);
}

export function filterByUniqueKey<T>(arr: T[], key: string): T[] {
    const hashMap = {};
    for (let i = 0; i < arr.length - 1; i++) {
        if (!hashMap[arr[i][key]]) {
            hashMap[arr[i][key]] = arr[i];
        }
    }
    return Object.values(hashMap);
}

export function configureArrayState<T>(
    prevArray: T[],
    newArray: T[],
    options: IStoreArrayOptions
): T[] {
    if (!Object.values(options).length) return newArray;
    let copy = clone(newArray);

    if (options.concat) {
        copy = prevArray.concat(copy);
    }

    if (options.sort) {
        copy.sort(options.sort);
    }

    if (options.filter) {
        copy = copy.filter(options.filter);
    }

    if (options.uniqueKey) {
        copy = filterByUniqueKey(copy, options.uniqueKey);
    }
    return copy;
}

export function configureAsyncActionOptions<T>(
    options: IAsyncActionOptions<T>
): IAsyncActionOptions<T> {
    return {
        onSuccess:
            typeof options.onSuccess === "function"
                ? options.onSuccess
                : function () {},
        onFailure:
            typeof options.onFailure === "function"
                ? options.onFailure
                : console.error,
    };
}

export function reverseMap<T>(
    arr: T[],
    mapFunc: (val: T, index?: number) => any
) {
    if (!arr) return null;
    const newArr = [];
    let i = arr.length;
    while (i--) {
        newArr.push(mapFunc(arr[i], i));
    }
    return newArr;
}

export function deleteUndefined(obj: Record<string, any> | undefined): void {
    if (obj) {
        Object.keys(obj).forEach((key: string) => {
            if (obj[key] && typeof obj[key] === "object") {
                deleteUndefined(obj[key]);
            } else if (typeof obj[key] === "undefined") {
                delete obj[key]; // eslint-disable-line no-param-reassign
            }
        });
    }
}

export function deleteEmptyStrings(obj: Record<string, any> | undefined): void {
    if (obj) {
        Object.keys(obj).forEach((key: string) => {
            if (obj[key] && typeof obj[key] === "object") {
                deleteEmptyStrings(obj[key]);
            } else if (obj[key] === "") {
                delete obj[key]; // eslint-disable-line no-param-reassign
            }
        });
    }
}
