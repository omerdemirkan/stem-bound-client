import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";
import { ISocketContextState, ESocketEvents } from "../../utils/types";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any),
    events?: ESocketEvents[]
): ISocketContextState {
    const context = useContext(SocketContext);
    const initRef = useRef<boolean>(false);

    const { socket } = context;

    useEffect(
        function () {
            if (socket?.connected && !initRef.current) {
                let cleanup = () => null;

                if (socket?.connected && initializer) {
                    cleanup = initializer(socket) || (() => null);
                    initRef.current = true;
                }
                return cleanup;
            }
        },
        [socket?.connected, initializer]
    );

    return context;
}
