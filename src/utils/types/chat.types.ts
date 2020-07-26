export interface IMessageOriginal {
    text: string;
    meta: {
        from: string;
        readBy: string[];
    };
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
}

export interface IMessage {
    text: string;
    meta: {
        from: string;
        readBy: string[];
    };
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IChat {
    _id: string;
    messages: IMessage[];
    meta: {
        users: string[];
    };
}

// SERVICE TYPES

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
