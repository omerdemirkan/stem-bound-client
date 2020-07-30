import io from "socket.io-client";
import { SOCKET_BASE_URL } from "../../config";
import { useEffect, useState } from "react";

export default function useSocket(url?: string) {
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    useEffect(function () {
        const socket = io(url || SOCKET_BASE_URL, {
            reconnection: true,
        });
        setSocket(socket);

        return () => socket.disconnect();
    }, []);
    return socket;
}
