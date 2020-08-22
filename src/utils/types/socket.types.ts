export enum ESocketEvents {
    CHAT_USER_STARTED_TYPING = "CHAT_USER_STARTED_TYPING",
    CHAT_USER_STOPPED_TYPING = "CHAT_USER_STOPPED_TYPING",
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
}

export interface ISocketContextState {
    on(event: string, fn: Function): SocketIOClient.Emitter;
    emit(event: string, ...args: any[]): SocketIOClient.Socket;
    connected: boolean;
}
