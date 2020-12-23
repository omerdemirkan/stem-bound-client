import { IUser } from "./user.types";

export enum EChatTypes {
    PRIVATE = "PRIVATE",
    GROUP = "GROUP",
}

export interface IChatMessageOriginal {
    text: string;
    meta: {
        from: string;
        readBy: string[];
        chat: string;
    };
    isDeleted: boolean;
    isEdited: boolean;
    _id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IChatOriginal {
    type: EChatTypes;
    meta: {
        users: string[];
    };
    name?: string;
    pictureUrl?: string;
    lastMessageSentAt?: Date | string;
    privateChatKey?: string;
    _id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: IChatMessageOriginal[];
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
    type: EChatTypes;
    _id: string;
    messages: IChatMessage[];
    meta: {
        users: string[];
    };
    name?: string;
    pictureUrl?: string;
    createdAt?: string;
    lastMessageSentAt?: string;
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
    refetchChats(): any;
}

// SERVICE TYPES

export interface IFetchChatsOptions {
    limit?: number;
    skip?: number;
    userIds?: string[];
    exact?: number;
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
