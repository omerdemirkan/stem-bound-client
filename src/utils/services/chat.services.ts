import {
    apiClient,
    appendQueriesToUrl,
    mapResponseData,
    mapChatData,
    mapMessageData,
} from "../helpers";
import {
    IApiResponse,
    IChat,
    IFetchMessageOptions,
    IMessage,
    IFetchMessagesOptions,
    ICreateMessageOptions,
    IUpdateMessageOptions,
    IChatOriginal,
    IDeleteMessageOptions,
} from "../types";

export function createChat(
    chatData: Partial<IChatOriginal>
): Promise<IApiResponse<IChat>> {
    return mapResponseData(apiClient.post("/chats", chatData), mapChatData);
}

export function fetchChatsByUserId(id: string): Promise<IApiResponse<IChat[]>> {
    return mapResponseData(
        apiClient.get(`/users/${id}/chats?include_unread_messages=1`),
        mapChatData
    );
}

export function fetchChatById(id: string): Promise<IApiResponse<IChat>> {
    return mapResponseData(apiClient.get(`/chats/${id}`), mapChatData);
}

export function updateChatById(
    id: string,
    chatData: Partial<IChat>
): Promise<IApiResponse<IChat>> {
    return mapResponseData(
        apiClient.patch(`/chats/${id}`, chatData),
        mapChatData
    );
}

export function deleteChatById(id: string): Promise<IApiResponse<any>> {
    return mapResponseData(apiClient.delete(`/chats/${id}`), mapChatData);
}

// MESSAGES

export function fetchMessagesByChatId({
    chatId,
    limit,
    skip,
}: IFetchMessagesOptions): Promise<IApiResponse<IMessage[]>> {
    const path = appendQueriesToUrl(`/chats/${chatId}/messages`, {
        limit,
        skip,
    });
    return mapResponseData(apiClient.get(path), mapChatData);
}

export function fetchMessageById({
    chatId,
    messageId,
}: IFetchMessageOptions): Promise<IApiResponse<IMessage>> {
    return mapResponseData(
        apiClient.get(`/chats/${chatId}/messages/${messageId}`),
        mapChatData
    );
}

export function createMessage({
    chatId,
    text,
}: ICreateMessageOptions): Promise<IApiResponse<IMessage>> {
    return mapResponseData(
        apiClient.post(`/chats/${chatId}/messages`, { text }),
        mapMessageData
    );
}

export function updateMessage({
    chatId,
    messageId,
    text,
}: IUpdateMessageOptions): Promise<IApiResponse<IMessage>> {
    return mapResponseData(
        apiClient.patch(`/chats/${chatId}/messages/${messageId}`, { text }),
        mapMessageData
    );
}

export function deleteMessage({
    chatId,
    messageId,
}: IDeleteMessageOptions): Promise<IApiResponse<any>> {
    return apiClient.delete(`/chats/${chatId}/messages/${messageId}`);
}
