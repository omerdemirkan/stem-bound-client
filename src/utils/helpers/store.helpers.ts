import rfdc from "rfdc";
import { IStoreArrayOptions } from "../types";

export const clone = rfdc({ proto: false, circles: false });

// A helper used in reducers
export function updateState<T>(state: T, updates: Partial<T>): T {
    return Object.assign(clone(state), updates);
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

    if (options.filter) {
        copy = copy.filter(options.filter);
    }
    return copy;
}
