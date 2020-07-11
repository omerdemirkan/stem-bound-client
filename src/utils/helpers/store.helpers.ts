import rfdc from "rfdc";

export const clone = rfdc({ proto: false, circles: false });

// A helper used in reducers
export function updateState(state: any, updates: any) {
    return Object.assign(clone(state), updates);
}

export const updateStateMiddleware = (store) => (next) => (action) => {
    return updateState(store.getState(), next(action));
};
