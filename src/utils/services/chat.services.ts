import { apiClient, appendQueriesToUrl } from "../helpers";
import {
    IApiResponse,
    IChatOriginal,
    IFetchMessageOptions,
    IMessageOriginal,
    IFetchMessagesOptions,
    ICreateMessageOptions,
    IUpdateMessageOptions,
} from "../types";

export function fetchChatsByUserId(
    id: string
): Promise<IApiResponse<IChatOriginal[]>> {
    return apiClient.get(`/users/${id}/chats`);
}

export function fetchChatById(
    id: string
): Promise<IApiResponse<IChatOriginal>> {
    return apiClient.get(`/chats/${id}`);
}

export function updateChatById(
    id: string,
    chatData: Partial<IChatOriginal>
): Promise<IApiResponse<IChatOriginal>> {
    return apiClient.patch(`/chats/${id}`, chatData);
}

export function deleteChatById(id: string): Promise<IApiResponse<any>> {
    return apiClient.delete(`/chats/${id}`);
}

// MESSAGES

export function fetchMessagesByChatId({
    chatId,
    limit,
    skip,
}: IFetchMessagesOptions): Promise<IApiResponse<IMessageOriginal[]>> {
    const path = appendQueriesToUrl(`/chats/${chatId}/messages`, {
        limit,
        skip,
    });
    return apiClient.get(path);
}

export function fetchMessageById({
    chatId,
    messageId,
}: IFetchMessageOptions): Promise<IApiResponse<IMessageOriginal>> {
    return apiClient.get(`/chats/${chatId}/messages/${messageId}`);
}

export function createMessage({
    chatId,
    messageData,
}: ICreateMessageOptions): Promise<IApiResponse<IMessageOriginal>> {
    return apiClient.post(`/chats/${chatId}/messages`, messageData);
}

export function updateMessage({
    chatId,
    messageId,
    messageData,
}: IUpdateMessageOptions): Promise<IApiResponse<IMessageOriginal>> {
    return apiClient.patch(
        `/chats/${chatId}/messages/${messageId}`,
        messageData
    );
}

export function deleteMessage({
    chatId,
    messageId,
    messageData,
}: IUpdateMessageOptions): Promise<IApiResponse<any>> {
    return apiClient.patch(
        `/chats/${chatId}/messages/${messageId}`,
        messageData
    );
}
