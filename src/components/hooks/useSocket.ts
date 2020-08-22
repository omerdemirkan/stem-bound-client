import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect } from "react";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any)
): SocketIOClient.Socket {
    const { socket } = useContext(SocketContext);

    useEffect(
        function () {
            if (socket?.connected && initializer) {
                initializer(socket);
            }
        },
        [socket?.connected]
    );

    return socket;
}
