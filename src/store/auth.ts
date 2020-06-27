import { Dispatch } from "redux";
import { logIn, signUp, me } from "../utils/services/auth.services";

enum actionTypes {
    AUTH_START = "stem-bound/auth/AUTH_START",
    AUTH_SUCCESS = "stem-bound/auth/AUTH_SUCCESS",
    AUTH_FAILURE = "stem-bound/auth/AUTH_FAILURE",
}

const initialState = {
    loading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.accessToken,
                user: action.user,
                authAttempted: true,
            };
        case actionTypes.AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                authAttempted: true,
            };
        default:
            return { ...state };
    }
}

// AUTH

export function authStart() {
    return { type: actionTypes.AUTH_START };
}

export function authSuccess({
    accessToken,
    user,
}: {
    accessToken: string;
    user: any;
}) {
    return { type: actionTypes.AUTH_SUCCESS, accessToken, user };
}

export function authFailure() {
    return { type: actionTypes.AUTH_FAILURE };
}

export function logInAsync({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    return async function (dispatch: Dispatch) {
        dispatch(authStart());
        const { user, accessToken } = await logIn({ email, password });

        if (user && accessToken) {
            dispatch(authSuccess({ user, accessToken }));
        } else {
            dispatch(authFailure());
        }
    };
}

export function signUpAsync(userData: any) {
    return async function (dispatch: Dispatch) {
        dispatch(authStart());
        const { user, accessToken } = await signUp(userData);

        if (user && accessToken) {
            dispatch(authSuccess({ user, accessToken }));
        } else {
            dispatch(authFailure());
        }
    };
}

export function meAsync(currentAccessToken: string) {
    return async function (dispatch: Dispatch) {
        dispatch(authStart());

        const { user, accessToken } = await me(currentAccessToken);

        if (user && accessToken) {
            dispatch(authSuccess({ user, accessToken }));
        } else {
            dispatch(authFailure());
        }
    };
}
