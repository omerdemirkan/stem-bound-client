import {
    apiClient,
    updateState,
    configureAsyncActionOptions,
} from "../utils/helpers";
import { logIn, signUp, me } from "../utils/services";
import { Dispatch } from "redux";
import {
    IAuthState,
    IAsyncActionOptions,
    IApiAuthResponse,
    IGetState,
} from "../utils/types";

enum actionTypes {
    AUTH_START = "stem-bound/auth/AUTH_START",
    AUTH_SUCCESS = "stem-bound/auth/AUTH_SUCCESS",
    AUTH_FAILURE = "stem-bound/auth/AUTH_FAILURE",
    LOG_OUT = "stem-bound/auth/LOG_OUT",
}

const initialState: IAuthState = {
    loading: false,
    accessToken: null,
    user: null,
    authAttempted: false,
};

const reducerHandlers = {
    [actionTypes.AUTH_START]: function (state: IAuthState, action) {
        return updateState(state, { loading: true });
    },

    [actionTypes.AUTH_FAILURE]: function (state: IAuthState, action) {
        return updateState(state, {
            loading: false,
            authAttempted: true,
        });
    },

    [actionTypes.AUTH_SUCCESS]: function (state: IAuthState, action) {
        return updateState(state, {
            loading: false,
            accessToken: action.accessToken,
            user: action.user,
            authAttempted: true,
        });
    },

    [actionTypes.LOG_OUT]: function (state: IAuthState, action) {
        return initialState;
    },
};

export default function authReducer(state = initialState, action): IAuthState {
    try {
        return reducerHandlers[action.type](state, action);
    } catch {
        return state;
    }
}

// ACTION CREATORS

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

export function logout() {
    return { type: actionTypes.LOG_OUT };
}

// ASYNC ACTION CREATORS

export function logInAsync(
    {
        email,
        password,
    }: {
        email: string;
        password: string;
    },
    asyncActionOptions?: IAsyncActionOptions<IApiAuthResponse>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch: Dispatch, getState: IGetState) {
        if (getState().auth.loading) return null;

        dispatch(authStart());

        logIn({ email, password })
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                localStorage.setItem("accessToken", accessToken);
                dispatch(authSuccess({ user, accessToken }));
                onSuccess(res);
            })
            .catch(function (err) {
                dispatch(authFailure());
                onFailure(err);
            });
    };
}

export function signUpAsync(
    userData: any,
    asyncActionOptions?: IAsyncActionOptions<IApiAuthResponse>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch: Dispatch, getState: IGetState) {
        if (getState().auth.loading) return null;

        dispatch(authStart());

        signUp(userData)
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                localStorage.setItem("accessToken", accessToken);
                dispatch(authSuccess({ user, accessToken }));
                onSuccess(res);
            })
            .catch(function (err) {
                dispatch(authFailure());
                onFailure(err);
            });
    };
}

export function meAsync(
    currentAccessToken: string,
    asyncActionOptions?: IAsyncActionOptions<IApiAuthResponse>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch: Dispatch, getState: IGetState) {
        if (getState().auth.loading) return null;

        dispatch(authStart());

        me(currentAccessToken)
            .then(function (res) {
                const { user, accessToken } = res.data;
                apiClient.setAuthHeader(accessToken);
                localStorage.setItem("accessToken", accessToken);
                dispatch(authSuccess({ user, accessToken }));
                onSuccess(res);
            })
            .catch(function (err) {
                dispatch(authFailure());
                onFailure(err);
            });
    };
}
