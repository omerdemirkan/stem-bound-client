import { IChat, IChatOriginal, IMessageOriginal, IMessage } from "../types";
import moment from "moment";

export function mapMessageData(message: IMessageOriginal): IMessage {
    return {
        meta: message.meta,
        text: message.text,
        _id: message._id,
        isDeleted: message.isDeleted,
        createdAt: moment(message.createdAt),
        updatedAt: moment(message.updatedAt),
        typing: [],
    };
}

export function mapChatData(chat: IChatOriginal): IChat {
    return {
        _id: chat._id,
        messages: chat.messages.map(mapMessageData),
        meta: chat.meta,
        createdAt: moment(chat.createdAt),
        updatedAt: moment(chat.updatedAt),
    };
}
