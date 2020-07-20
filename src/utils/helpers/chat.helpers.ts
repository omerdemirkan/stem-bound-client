import { IChat, IChatOriginal } from "../types";

export function mapChatData(chats: IChatOriginal[]): IChat[] {
    return chats.map((chat) => ({
        messages: chat.messages,
        meta: chat.meta,
    }));
}
