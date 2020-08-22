import io from "socket.io-client";
import { SERVER_BASE_URL } from "../../config";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any),
    options?: { url?: string } & SocketIOClient.ConnectOpts
): SocketIOClient.Socket {
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const { user } = useContext(AuthContext);
    useEffect(function () {
        const socket = io(options?.url || SERVER_BASE_URL, {
            reconnection: true,
            query: { userId: user._id },
            ...options,
        });

        socket.emit;

        const cleanup = (initializer && initializer(socket)) || (() => {});
        setSocket(socket);
        return function () {
            cleanup();
            socket.disconnect();
        };
    }, []);
    return socket;
}
