import { differenceInMinutes, isSameDay } from "date-fns";
import {
    IChat,
    IChatOriginal,
    IChatMessageOriginal,
    IChatMessage,
    IChatMessageGroup,
    IUser,
} from "../types";

export function mapMessageData(message: IChatMessageOriginal): IChatMessage {
    return {
        meta: message.meta,
        text: message.text,
        _id: message._id,
        isDeleted: message.isDeleted,
        isEdited: message.isEdited,
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
        lastMessageSentAt: chat.lastMessageSentAt,
        typingUsers: [],
    };
}

export function getChatMessageGroups(
    chatMessages: IChatMessage[],
    userHashTable: { [userId: string]: IUser } = {}
): IChatMessageGroup[] {
    if (!chatMessages) return null;
    const chatMessageGroups: IChatMessageGroup[] = [];
    let i = chatMessages.length - 1;
    let groupStartIndex = i;
    let startDate: Date, currentDate: Date;
    while (i--) {
        if (
            chatMessages[groupStartIndex].meta.from !==
                chatMessages[i].meta.from ||
            !isSameDay(
                (startDate = new Date(chatMessages[groupStartIndex].createdAt)),
                (currentDate = new Date(chatMessages[i].createdAt))
            ) ||
            differenceInMinutes(startDate, currentDate) > 20
        ) {
            chatMessageGroups.push({
                messages: chatMessages.slice(i + 1, groupStartIndex + 1),
                senderId: chatMessages[groupStartIndex].meta.from,
            });
            groupStartIndex = i;
        }
    }
    chatMessageGroups.push({
        messages: chatMessages.slice(0, groupStartIndex + 1),
        senderId: chatMessages[groupStartIndex].meta.from,
    });
    chatMessageGroups.reverse();
    return chatMessageGroups;
}
