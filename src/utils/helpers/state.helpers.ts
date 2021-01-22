import rfdc from "rfdc";

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
