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
} from "../types";

export function createChat(
    chatData: Partial<IChatOriginal>
): Promise<IApiResponse<IChat>> {
    return mapResponseData(apiClient.post("/chats", chatData), mapChatData);
}

export function fetchChatsByUserId(id: string): Promise<IApiResponse<IChat[]>> {
    return mapResponseData(apiClient.get(`/users/${id}/chats`), mapChatData);
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
    messageData,
}: ICreateMessageOptions): Promise<IApiResponse<IMessage>> {
    return mapResponseData(
        apiClient.post(`/chats/${chatId}/messages`, messageData),
        mapMessageData
    );
}

export function updateMessage({
    chatId,
    messageId,
    messageData,
}: IUpdateMessageOptions): Promise<IApiResponse<IMessage>> {
    return mapResponseData(
        apiClient.patch(`/chats/${chatId}/messages/${messageId}`, messageData),
        mapChatData
    );
}

export function deleteMessage({
    chatId,
    messageId,
    messageData,
}: IUpdateMessageOptions): Promise<IApiResponse<any>> {
    return mapResponseData(
        apiClient.patch(`/chats/${chatId}/messages/${messageId}`, messageData),
        mapChatData
    );
}
