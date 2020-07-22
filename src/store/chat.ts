import {
    IChatState,
    IStoreArrayOptions,
    IGetState,
    IChat,
    IFetchMessagesOptions,
    IMessage,
} from "../utils/types";
import { clone, configureArrayState } from "../utils/helpers";
import {
    fetchChatsByUserId,
    fetchMessagesByChatId,
    fetchChatById,
} from "../utils/services/chat.services";

enum actionTypes {
    FETCH_CHATS_START = "stem-bound/chat/FETCH_CHATS_START",
    FETCH_CHATS_FAILURE = "stem-bound/chat/FETCH_CHATS_FAILURE",
    FETCH_CHATS_SUCCESS = "stem-bound/chat/FETCH_CHATS_SUCCESS",

    FETCH_CHAT_START = "stem-bound/chat/FETCH_CHAT_START",
    FETCH_CHAT_FAILURE = "stem-bound/chat/FETCH_CHAT_FAILURE",
    FETCH_CHAT_SUCCESS = "stem-bound/chat/FETCH_CHAT_SUCCESS",

    FETCH_CHAT_MESSAGES_START = "stem-bound/chat/FETCH_CHAT_MESSAGES_START",
    FETCH_CHAT_MESSAGES_FAILURE = "stem-bound/chat/FETCH_CHAT_MESSAGES_FAILURE",
    FETCH_CHAT_MESSAGES_SUCCESS = "stem-bound/chat/FETCH_CHAT_MESSAGES_SUCCESS",

    CREATE_CHAT_START = "stem-bound/chat/CREATE_CHAT_START",
    CREATE_CHAT_FAILURE = "stem-bound/chat/CREATE_CHAT_FAILURE",
    CREATE_CHAT_SUCCESS = "stem-bound/chat/CREATE_CHAT_SUCCESS",

    INSPECT_CHAT = "stem-bound/chat/INSPECT_CHAT",
}

const initialState: IChatState = {
    chats: [],
    inspectedChat: null,
    status: {
        fetchChats: {
            attempted: false,
            error: null,
            loading: false,
        },
        fetchChat: {
            attempted: false,
            error: null,
            loading: false,
        },
        createChat: {
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

    [actionTypes.FETCH_CHAT_START]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChat.loading = true;
        return newState;
    },
    [actionTypes.FETCH_CHAT_FAILURE]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChat.loading = false;
        newState.status.fetchChat.attempted = true;
        newState.status.fetchChat.error = action.error;
        return newState;
    },
    [actionTypes.FETCH_CHAT_SUCCESS]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChat.loading = false;
        newState.status.fetchChat.attempted = true;
        newState.status.fetchChat.error = null;
        newState.inspectedChat = action.chat;
        return newState;
    },

    [actionTypes.CREATE_CHAT_START]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.createChat.loading = true;
        return newState;
    },
    [actionTypes.CREATE_CHAT_FAILURE]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.createChat.loading = false;
        newState.status.createChat.attempted = true;
        newState.status.createChat.error = action.error;
        return newState;
    },
    [actionTypes.CREATE_CHAT_SUCCESS]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.createChat.loading = false;
        newState.status.createChat.attempted = true;
        newState.status.createChat.error = null;
        newState.inspectedChat = action.chat;
        return newState;
    },

    [actionTypes.INSPECT_CHAT]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.inspectedChat = clone(
            newState.chats.find((chat) => chat._id === action.chatId)
        );
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

// STAND-ALONE ACTIONS

export const inspectChat = (chatId) => ({
    type: actionTypes.INSPECT_CHAT,
    chatId,
});
// FETCH CHATS ACTIONS

export const fetchChatsStart = () => ({ type: actionTypes.FETCH_CHATS_START });
export const fetchChatsFailure = (error: string) => ({
    type: actionTypes.FETCH_CHATS_FAILURE,
    error,
});
export const fetchChatsSuccess = (chats: IChat[]) => ({
    type: actionTypes.FETCH_CHATS_SUCCESS,
    chats,
});

export const fetchChatStart = () => ({ type: actionTypes.FETCH_CHAT_START });
export const fetchChatFailure = (error: string) => ({
    type: actionTypes.FETCH_CHAT_FAILURE,
    error,
});
export const fetchChatSuccess = (chat: IChat) => ({
    type: actionTypes.FETCH_CHAT_SUCCESS,
    chat,
});

export const fetchChatMessagesStart = () => ({
    type: actionTypes.FETCH_CHAT_MESSAGES_START,
});
export const fetchChatMessagesFailure = (error: string) => ({
    type: actionTypes.FETCH_CHAT_MESSAGES_START,
    error,
});
export const fetchChatMessagesSuccess = (messages: IMessage[]) => ({
    type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
    messages,
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
                        configureArrayState(prevChats, res.data, arrayOptions)
                    )
                );
            })
            .catch(function (err) {
                dispatch(
                    fetchChatsFailure(
                        err.message || "An error occured when fetching chats"
                    )
                );
            });
    };
}

export function fetchChatAsync(chatId: string) {
    return function (dispatch) {
        dispatch(fetchChatStart());

        fetchChatById(chatId)
            .then(function (res) {
                dispatch(fetchChatSuccess(res.data));
            })
            .catch(function (err) {
                dispatch(
                    fetchChatFailure(
                        err.message || "An error occured when fetching chat"
                    )
                );
            });
    };
}

export function fetchChatMessages(
    fetchMessagesOptions: IFetchMessagesOptions,
    arrayOptions: IStoreArrayOptions = {}
) {
    return function (dispatch, getState: IGetState) {
        dispatch(fetchChatMessagesStart());

        const prevMessages = getState().chat.chats.find(
            (chat) => chat._id === fetchMessagesOptions.chatId
        ).messages;

        fetchMessagesByChatId(fetchMessagesOptions)
            .then(function (res) {
                dispatch(
                    fetchChatMessagesSuccess(
                        configureArrayState(
                            prevMessages,
                            res.data,
                            arrayOptions
                        )
                    )
                );
            })
            .catch(function (err) {
                dispatch(
                    fetchChatMessagesFailure(
                        err.message || "An error occured when fetching messages"
                    )
                );
            });
    };
}
