import { Dispatch } from "redux";
import { logIn, signUp, me } from "../utils/services/auth.services";
import { apiClient } from "../utils/http.utils";

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
    return function (dispatch: Dispatch) {
        dispatch(authStart());

        logIn({ email, password })
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                dispatch(authSuccess({ user, accessToken }));
            })
            .catch(function (error) {
                dispatch(authFailure());
                console.error(error.message);
            });
    };
}

export function signUpAsync(userData: any) {
    return function (dispatch: Dispatch) {
        dispatch(authStart());

        signUp(userData)
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                dispatch(authSuccess({ user, accessToken }));
            })
            .catch(function (error) {
                dispatch(authFailure());
                console.error(error.message);
            });
    };
}

export function meAsync(currentAccessToken: string) {
    return function (dispatch: Dispatch) {
        dispatch(authStart());

        me(currentAccessToken)
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                dispatch(authSuccess({ user, accessToken }));
            })
            .catch(function (error) {
                dispatch(authFailure());
                console.error(error.message);
            });
    };
}
