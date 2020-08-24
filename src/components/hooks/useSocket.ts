import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect } from "react";
import { ISocketContextState } from "../../utils/types";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any)
): ISocketContextState {
    const context = useContext(SocketContext);

    useEffect(
        function () {
            let cleanup = () => null;
            if (context.socket?.connected && initializer) {
                cleanup = initializer(context.socket) || (() => null);
            }
            return cleanup;
        },
        [context.socket?.connected]
    );

    return context;
}
