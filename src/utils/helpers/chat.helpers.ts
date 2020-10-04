import { IChat, IChatOriginal, IMessageOriginal, IMessage } from "../types";

export function mapMessageData(message: IMessageOriginal): IMessage {
    return {
        meta: message.meta,
        text: message.text,
        _id: message._id,
        isDeleted: message.isDeleted,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        typing: [],
    };
}

export function mapChatData(chat: IChatOriginal): IChat {
    return {
        _id: chat._id,
        messages: chat.messages.map(mapMessageData),
        meta: chat.meta,
        isGroupChat: chat.isGroupChat,
        name: chat?.name,
        pictureUrl: chat?.pictureUrl,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
    };
}
