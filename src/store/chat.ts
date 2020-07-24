import {
    IChatState,
    IStoreArrayOptions,
    IGetState,
    IChat,
    IFetchMessagesOptions,
    IMessage,
    IChatOriginal,
    IAsyncActionOptions,
    ICreateMessageOptions,
    EStateStatus,
} from "../utils/types";
import {
    clone,
    configureArrayState,
    configureAsyncActionOptions,
    updateState,
} from "../utils/helpers";
import {
    fetchChatsByUserId,
    fetchMessagesByChatId,
    fetchChatById,
    createChat,
    createMessage,
} from "../utils/services";

export default function chatReducer(state = initialState, action) {
    try {
        return reducerHandlers[action.type](state, action);
    } catch {
        return state;
    }
}

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

    CREATE_CHAT_MESSAGE_START = "stem-bound/chat/CREATE_CHAT_MESSAGE_START",
    CREATE_CHAT_MESSAGE_FAILURE = "stem-bound/chat/CREATE_CHAT_MESSAGE_FAILURE",
    CREATE_CHAT_MESSAGE_SUCCESS = "stem-bound/chat/CREATE_CHAT_MESSAGE_SUCCESS",

    INSPECT_CHAT = "stem-bound/chat/INSPECT_CHAT",

    UPDATE_CHAT_TEXT_FIELD = "stem-bound/chat/UPDATE_CHAT_TEXT_FIELD",
}

const initialState: IChatState = {
    chats: [],
    inspectedChat: null,

    // Text field is in global state to allow for persistence
    // if the user accidentally navigates away.
    textField: "",
    status: {
        fetchChats: EStateStatus.failed,
        fetchChat: EStateStatus.failed,
        createChat: EStateStatus.failed,
        sendMessage: EStateStatus.failed,
    },
};

const reducerHandlers = {
    [actionTypes.FETCH_CHATS_START]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChats = EStateStatus.loading;
        return newState;
    },
    [actionTypes.FETCH_CHATS_FAILURE]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChats = EStateStatus.failed;
        return newState;
    },
    [actionTypes.FETCH_CHATS_SUCCESS]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChats = EStateStatus.successful;
        newState.chats = action.chats;
        return newState;
    },

    [actionTypes.FETCH_CHAT_START]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChat = EStateStatus.loading;
        return newState;
    },
    [actionTypes.FETCH_CHAT_FAILURE]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChat = EStateStatus.failed;
        return newState;
    },
    [actionTypes.FETCH_CHAT_SUCCESS]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.fetchChat = EStateStatus.successful;
        newState.inspectedChat = action.chat;
        return newState;
    },

    [actionTypes.CREATE_CHAT_START]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.createChat = EStateStatus.loading;
        return newState;
    },
    [actionTypes.CREATE_CHAT_FAILURE]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.createChat = EStateStatus.failed;
        return newState;
    },
    [actionTypes.CREATE_CHAT_SUCCESS]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.status.createChat = EStateStatus.successful;
        newState.inspectedChat = action.chat;
        newState.textField = "";
        return newState;
    },

    [actionTypes.CREATE_CHAT_MESSAGE_START]: function (
        state: IChatState,
        action
    ) {
        const newState = clone(state);
        newState.status.sendMessage = EStateStatus.loading;
        return newState;
    },
    [actionTypes.CREATE_CHAT_MESSAGE_FAILURE]: function (
        state: IChatState,
        action
    ) {
        const newState = clone(state);
        newState.status.sendMessage = EStateStatus.failed;
        return newState;
    },
    [actionTypes.CREATE_CHAT_MESSAGE_SUCCESS]: function (
        state: IChatState,
        action
    ) {
        const newState = clone(state);
        newState.status.sendMessage = EStateStatus.successful;
        const chatIndex = newState.chats
            .map((chat) => chat._id)
            .indexOf(action.chatId);
        newState.chats[chatIndex].messages.push(action.message);
        newState.inspectedChat.messages.push(action.message);
        return newState;
    },

    [actionTypes.INSPECT_CHAT]: function (state: IChatState, action) {
        const newState = clone(state);
        newState.inspectedChat = clone(
            newState.chats.find((chat) => chat._id === action.chatId)
        );
        return newState;
    },

    [actionTypes.UPDATE_CHAT_TEXT_FIELD]: function (state: IChatState, action) {
        return updateState(state, {
            textField: action.text,
        });
    },
};

// STAND-ALONE ACTIONS

export const inspectChat = (chatId) => ({
    type: actionTypes.INSPECT_CHAT,
    chatId,
});

export const updateChatTextField = (text: string) => ({
    type: actionTypes.UPDATE_CHAT_TEXT_FIELD,
    text,
});
// ACTION CREATORS

export const createChatStart = () => ({ type: actionTypes.CREATE_CHAT_START });
export const createChatFailure = () => ({
    type: actionTypes.CREATE_CHAT_FAILURE,
});
export const createChatSuccess = (chat: IChat) => ({
    type: actionTypes.CREATE_CHAT_SUCCESS,
    chat,
});

export const fetchChatsStart = () => ({ type: actionTypes.FETCH_CHATS_START });
export const fetchChatsFailure = () => ({
    type: actionTypes.FETCH_CHATS_FAILURE,
});
export const fetchChatsSuccess = (chats: IChat[]) => ({
    type: actionTypes.FETCH_CHATS_SUCCESS,
    chats,
});

export const fetchChatStart = () => ({ type: actionTypes.FETCH_CHAT_START });
export const fetchChatFailure = () => ({
    type: actionTypes.FETCH_CHAT_FAILURE,
});
export const fetchChatSuccess = (chat: IChat) => ({
    type: actionTypes.FETCH_CHAT_SUCCESS,
    chat,
});

export const fetchChatMessagesStart = () => ({
    type: actionTypes.FETCH_CHAT_MESSAGES_START,
});
export const fetchChatMessagesFailure = () => ({
    type: actionTypes.FETCH_CHAT_MESSAGES_START,
});
export const fetchChatMessagesSuccess = ({
    chatId,
    messages,
}: {
    chatId: string;
    messages: IMessage[];
}) => ({
    type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
    messages,
    chatId,
});

export const createChatMessageStart = () => ({
    type: actionTypes.CREATE_CHAT_MESSAGE_START,
});
export const createChatMessageFailure = () => ({
    type: actionTypes.CREATE_CHAT_MESSAGE_FAILURE,
});
export const createChatMessageSuccess = ({
    chatId,
    message,
}: {
    chatId: string;
    message: IMessage;
}) => ({
    type: actionTypes.CREATE_CHAT_MESSAGE_SUCCESS,
    chatId,
    message,
});

// ASYNC ACTIONS

export function createChatAsync(
    chatData: Partial<IChatOriginal>,
    asyncActionOptions?: IAsyncActionOptions<IChat>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch) {
        dispatch(createChatStart());

        createChat(chatData)
            .then(function (res) {
                dispatch(createChatSuccess(res.data));
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(createChatFailure());
                onFailure(err);
            });
    };
}

export function fetchChatsAsync(
    userId: string,
    arrayOptions: IStoreArrayOptions = {},
    asyncActionOptions?: IAsyncActionOptions<IChat[]>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
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
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(fetchChatsFailure());
                onFailure(err);
            });
    };
}

export function fetchChatAsync(
    chatId: string,
    asyncActionOptions?: IAsyncActionOptions<IChat[]>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch) {
        dispatch(fetchChatStart());

        fetchChatById(chatId)
            .then(function (res) {
                dispatch(fetchChatSuccess(res.data));
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(fetchChatFailure());
                onFailure(err);
            });
    };
}

export function fetchChatMessages(
    fetchMessagesOptions: IFetchMessagesOptions,
    arrayOptions: IStoreArrayOptions = {},
    asyncActionOptions?: IAsyncActionOptions<IMessage[]>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch, getState: IGetState) {
        dispatch(fetchChatMessagesStart());

        const chat = getState().chat.chats.find(
            (chat) => chat._id === fetchMessagesOptions.chatId
        );

        fetchMessagesByChatId(fetchMessagesOptions)
            .then(function (res) {
                dispatch(
                    fetchChatMessagesSuccess({
                        chatId: chat._id,
                        messages: configureArrayState(
                            chat.messages,
                            res.data,
                            arrayOptions
                        ),
                    })
                );
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(fetchChatMessagesFailure());
                onFailure(err);
            });
    };
}

export function createChatMessageAsync(
    { chatId, messageData }: ICreateMessageOptions,
    asyncActionOptions?: IAsyncActionOptions<IMessage>
) {
    const { onSuccess, onFailure } = configureAsyncActionOptions(
        asyncActionOptions || {}
    );
    return function (dispatch) {
        dispatch(createChatMessageStart());

        createMessage({ chatId, messageData })
            .then(function (res) {
                dispatch(
                    createChatMessageSuccess({ chatId, message: res.data })
                );
                onSuccess(res.data);
            })
            .catch(function (err) {
                dispatch(createChatMessageFailure());
                onFailure(err);
            });
    };
}
