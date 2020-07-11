import rfdc from "rfdc";

export const clone = rfdc({ proto: false, circles: false });

export function updateState(state: any, updates: any) {
    return clone({
        ...state,
        ...updates,
    });
}
