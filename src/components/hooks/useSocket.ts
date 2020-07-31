import io from "socket.io-client";
import { SERVER_BASE_URL } from "../../config";
import { useEffect, useState } from "react";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any),
    options?: { url?: string }
): SocketIOClient.Socket {
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    useEffect(function () {
        const socket = io(options?.url || SERVER_BASE_URL, {
            reconnection: true,
        });

        if (initializer) {
            initializer(socket);
        }
        setSocket(socket);
        return () => socket.disconnect();
    }, []);
    return socket;
}
