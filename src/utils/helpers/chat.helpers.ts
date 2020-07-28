import { IChat, IChatOriginal, IMessageOriginal, IMessage } from "../types";

export function mapMessageData(message: IMessageOriginal): IMessage {
    return {
        meta: message.meta,
        text: message.text,
        _id: message._id,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
    };
}

export function mapChatData(chat: IChatOriginal): IChat {
    return {
        _id: chat._id,
        messages: chat.messages.map(mapMessageData),
        meta: chat.meta,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
    };
}
