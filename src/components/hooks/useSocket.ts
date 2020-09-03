import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect } from "react";
import { ISocketContextState, ESocketEvents } from "../../utils/types";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any),
    events?: ESocketEvents[]
): ISocketContextState & { reinitialize(): void } {
    const context = useContext(SocketContext);

    const { socket } = context;

    useEffect(
        function () {
            if (socket?.connected) {
                let cleanup = () => null;

                // @ts-ignore
                console.log(socket.listeners());
                if (socket?.connected && initializer) {
                    cleanup = initializer(socket) || (() => null);
                }
                // @ts-ignore
                console.log(
                    socket.listeners(ESocketEvents.CHAT_MESSAGE_RESTORED)
                );
                return cleanup;
            }
        },
        [socket?.connected]
    );

    return { ...context, reinitialize: () => initializer(socket) };
}
