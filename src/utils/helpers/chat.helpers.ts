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
        messages: chat.messages.map(mapMessageData),
        meta: chat.meta,
    };
}
