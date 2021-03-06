export enum ESocketEvents {
    CHAT_USER_STARTED_TYPING = "CHAT_USER_STARTED_TYPING",
    CHAT_USER_STOPPED_TYPING = "CHAT_USER_STOPPED_TYPING",
    CHAT_MESSAGE_CREATED = "CHAT_MESSAGE_CREATED",
    CHAT_MESSAGE_DELETED = "CHAT_MESSAGE_DELETED",
    CHAT_MESSAGE_RESTORED = "CHAT_MESSAGE_RESTORED",
    CHAT_MESSAGE_UPDATED = "CHAT_MESSAGE_UPDATED",

    COURSE_ANNOUNCEMENT_CREATED = "COURSE_ANNOUNCEMENT_CREATED",

    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
}

export interface ISocketContextState {
    socket: SocketIOClient.Socket;
}
