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
    IChatMessage,
    IFetchMessageArrayOptions,
    IChatOriginal,
    IFetchChatArrayOptions,
} from "../types";

export function createChat(
    chatData: Partial<IChatOriginal>
): Promise<IApiResponse<IChat>> {
    return mapResponseData(apiClient.post("/chats", chatData), mapChatData);
}

export function fetchChats(
    options: IFetchChatArrayOptions = {}
): Promise<IApiResponse<IChat[]>> {
    console.log(options);
    return mapResponseData(
        apiClient.get(
            appendQueriesToUrl(`/chats`, {
                user_ids: options.userIds?.join(","),
                exact_match: options.exactMatch,
                type: options.type,
                skip: options.skip,
                limit: options.limit,
                before: options.before?.toString(),
                after: options.after?.toString(),
            })
        ),
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

export function fetchMessagesByChatId(
    chatId,
    options?: IFetchMessageArrayOptions
): Promise<IApiResponse<IChatMessage[]>> {
    const path = appendQueriesToUrl(`/chats/${chatId}/messages`, {
        skip: options?.skip,
        limit: options?.limit,
        before: options?.before.toString(),
        after: options?.after.toString(),
        unread: options?.unread,
        text: options?.text,
    });
    return mapResponseData(apiClient.get(path), mapMessageData);
}

export function fetchMessageById({
    chatId,
    messageId,
}: {
    chatId: string;
    messageId: string;
}): Promise<IApiResponse<IChatMessage>> {
    return mapResponseData(
        apiClient.get(`/chats/${chatId}/messages/${messageId}`),
        mapChatData
    );
}

export function createMessage(
    text,
    chatId: string
): Promise<IApiResponse<IChatMessage>> {
    return mapResponseData(
        apiClient.post(`/chats/${chatId}/messages`, { text }),
        mapMessageData
    );
}

export function updateMessage(
    text,
    { chatId, messageId }: { chatId: string; messageId: string }
): Promise<IApiResponse<IChatMessage>> {
    return mapResponseData(
        apiClient.patch(`/chats/${chatId}/messages/${messageId}`, { text }),
        mapMessageData
    );
}

export function deleteMessage({
    chatId,
    messageId,
}: {
    chatId: string;
    messageId: string;
}): Promise<IApiResponse<any>> {
    return apiClient.delete(`/chats/${chatId}/messages/${messageId}`);
}

export function restoreMessage({
    chatId,
    messageId,
}: {
    chatId: string;
    messageId: string;
}): Promise<IApiResponse<any>> {
    return apiClient.delete(`/chats/${chatId}/messages/${messageId}?restore=1`);
}
