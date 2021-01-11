import { ECourseTypes } from "./course.types";
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
    pictureUrl?: string;
}

export interface IChatOriginal {
    type: EChatTypes;
    meta: {
        users: string[];
    };
    numMessages: number;
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
    pictureUrl?: string;
}

export interface IChat {
    type: EChatTypes;
    _id: string;
    meta: {
        users: string[];
    };
    numMessages: number;
    messages?: IChatMessage[];
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
    contactUser(userId: string): any;
    chatsLoading: boolean;
    messagesLoading: boolean;
    chatsError: Error | null;
    messagesError: Error | null;
}

// SERVICE TYPES

export interface IFetchChatArrayOptions {
    userIds?: string[];
    exactMatch?: number;
    type?: ECourseTypes;
    skip?: number;
    limit?: number;
    before?: Date;
    after?: Date;
}

export interface IFetchMessageArrayOptions {
    skip?: number;
    limit?: number;
    before?: Date;
    after?: Date;
    unread?: boolean;
    text?: string;
}
