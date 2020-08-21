export interface IMessageOriginal {
    text: string;
    meta: {
        from: string;
        readBy: string[];
    };
    isDeleted: boolean;
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IChatOriginal {
    _id: string;
    messages: IMessageOriginal[];
    meta: {
        users: string[];
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessage {
    text: string;
    meta: {
        from: string;
        readBy: string[];
    };
    isDeleted: boolean;
    _id?: string;
    createdAt?: moment.Moment;
    updatedAt?: moment.Moment;
    typing?: string[];
}

export interface IChat {
    _id: string;
    messages: IMessage[];
    meta: {
        users: string[];
    };
    createdAt?: moment.Moment;
    updatedAt?: moment.Moment;
}

// SERVICE TYPES

export interface IFetchChatsOptions {
    includeUnreadMessages?: boolean;
    limit?: number;
    skip?: number;
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
