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
        onSuccess: options.onSuccess || function () {},
        onFailure: options.onFailure || function () {},
    };
}
