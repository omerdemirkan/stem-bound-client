import {
    IChatState,
    IStoreArrayOptions,
    IGetState,
    IChat,
} from "../utils/types";
import { clone, configureArrayState, mapChatData } from "../utils/helpers";
import { fetchChatsByUserId } from "../utils/services/chat.services";

enum actionTypes {
    FETCH_CHATS_START = "stem-bound/chat/FETCH_CHATS_START",
    FETCH_CHATS_FAILURE = "stem-bound/chat/FETCH_CHATS_FAILURE",
    FETCH_CHATS_SUCCESS = "stem-bound/chat/FETCH_CHATS_SUCCESS",
}

const initialState: IChatState = {
    chats: [],
    status: {
        fetchChats: {
            attempted: false,
            error: null,
            loading: false,
        },
    },
};

const reducerHandlers = {
    [actionTypes.FETCH_CHATS_START]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChats.loading = true;
        return newState;
    },
    [actionTypes.FETCH_CHATS_FAILURE]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChats.loading = false;
        newState.status.fetchChats.attempted = true;
        newState.status.fetchChats.error = action.error;
        return newState;
    },
    [actionTypes.FETCH_CHATS_SUCCESS]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChats.loading = false;
        newState.status.fetchChats.attempted = true;
        newState.status.fetchChats.error = null;
        newState.chats = action.chats;
        return newState;
    },
};

export default function chatReducer(state = initialState, action) {
    try {
        return reducerHandlers[action.type](state, action);
    } catch {
        return state;
    }
}

// FETCH CHATS ACTIONS

export const fetchChatsStart = () => ({ type: actionTypes.FETCH_CHATS_START });
export const fetchChatsFailure = (error: string) => ({
    type: actionTypes.FETCH_CHATS_FAILURE,
    error,
});
export const fetchChatsSuccess = (chats) => ({
    type: actionTypes.FETCH_CHATS_SUCCESS,
    chats,
});

export function fetchChatsAsync(
    userId: string,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState: IGetState) {
        dispatch(fetchChatsStart());

        const prevChats: IChat[] = getState().chat.chats;

        fetchChatsByUserId(userId)
            .then(function (res) {
                dispatch(
                    fetchChatsSuccess(
                        configureArrayState(
                            prevChats,
                            res.data.map(mapChatData),
                            {
                                ...arrayOptions,
                            }
                        )
                    )
                );
            })
            .catch(function (err) {
                dispatch(fetchChatsFailure(err.message));
            });
    };
}
