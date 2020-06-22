enum actionTypes {
    LOG_IN_START = "stem-bound/auth/LOG_IN_START",
    LOG_IN_SUCCESS = "stem-bound/auth/LOG_IN_SUCCESS",
    LOG_IN_FAILURE = "stem-bound/auth/LOG_IN_FAILURE",
}

const initialState = {
    auth: false,
    loading: false,
    accessToken: null,
    user: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOG_IN_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.accessToken,
            };
        case actionTypes.LOG_IN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return { ...state };
    }
}
