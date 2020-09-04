import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect, useState } from "react";
import { ISocketContextState, ESocketEvents } from "../../utils/types";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any),
    events?: ESocketEvents[]
): ISocketContextState {
    const context = useContext(SocketContext);
    const [initialized, setInitialized] = useState<boolean>(false);

    const { socket } = context;

    useEffect(
        function () {
            if (socket?.connected && !initialized) {
                let cleanup = () => null;

                if (socket?.connected && initializer) {
                    cleanup = initializer(socket) || (() => null);
                    setInitialized(true);
                }
                return cleanup;
            }
        },
        [socket?.connected, initializer]
    );

    return context;
}
