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
    messages: IMessageOriginal[];
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
    messageData: Partial<IMessageOriginal>;
}

export interface IUpdateMessageOptions {
    chatId: string;
    messageId: string;
    messageData: Partial<IMessageOriginal>;
}
