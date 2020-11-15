import { IUser } from "./user.types";

export interface IChatMessageOriginal {
    text: string;
    meta: {
        from: string;
        readBy: string[];
    };
    isDeleted: boolean;
    isEdited: boolean;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IChatOriginal {
    _id: string;
    messages: IChatMessageOriginal[];
    meta: {
        users: string[];
    };
    isGroupChat: boolean;
    name?: string;
    pictureUrl?: string;
    createdAt?: string;
    lastMessageSentAt?: string;
}

export interface IChatMessage {
    text: string;
    meta: {
        from: string;
        readBy: string[];
    };
    isDeleted: boolean;
    isEdited: boolean;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IChat {
    _id: string;
    messages: IChatMessage[];
    meta: {
        users: string[];
    };
    isGroupChat: boolean;
    name?: string;
    pictureUrl?: string;
    createdAt?: string;
    lastMessageSentAt?: string;
}

// SERVICE TYPES

export interface IFetchChatsOptions {
    includeUnreadMessages?: boolean;
    limit?: number;
    skip?: number;
    userIds?: string[];
    exact?: number;
}

export interface IFetchChatOptions {
    limit?: number;
    skip?: number;
}

export interface ICreateChatOptions {
    duplicateFallback?: boolean;
}

export interface IFetchMessagesOptions {
    chatId: string;
    limit?: number;
    skip?: number;
}

export interface IFetchMessageOptions {
    messageId: string;
    chatId: string;
}

export interface ICreateMessageOptions {
    chatId: string;
    text: string;
}

export interface IUpdateMessageOptions {
    chatId: string;
    messageId: string;
    text: string;
}

export interface IDeleteMessageOptions {
    chatId: string;
    messageId: string;
}

export interface IChatMessageGroup {
    senderId: string;
    messages: IChatMessage[];
}

export interface IChatMessageEventHandlers {
    onDeleteMessageClicked?: (messageId: string) => any;
    onEditMessageClicked?: (messageId: string) => any;
    onRestoreMessageClicked?: (messageId: string) => any;
}

export interface IMessagingContextState {
    chats: IChat[];
    usersTypingHashTable: {
        [chatId: string]: string[];
    };
    chatsLoading: boolean;
    messages: IChatMessage[];
    setUserIsTyping(isTyping: boolean): void;
    setInspectedChat(chatId: string): void;
    sendMessage(data: { text: string; chatId: string }): void;
    updateMessage(data: {
        text: string;
        messageId: string;
        chatId: string;
    }): void;
    deleteMessage(data: { chatId: string; messageId: string });
    restoreMessage(data: { chatId: string; messageId: string });
}
