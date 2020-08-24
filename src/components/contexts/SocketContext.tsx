import React, { useState, useContext, useEffect } from "react";
import { ISocketContextState } from "../../utils/types";
import AuthContext from "./AuthContext";
import { SERVER_BASE_URL } from "../../config";
import io from "socket.io-client";

const initialSocketContextState: ISocketContextState = {
    socket: null,
};

const SocketContext = React.createContext(initialSocketContextState);

export default SocketContext;

export const SocketContextProvider: React.FC = ({ children }) => {
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const { accessToken } = useContext(AuthContext);
    useEffect(
        function () {
            if (accessToken) {
                const socket = io(SERVER_BASE_URL, {
                    reconnection: true,
                    query: { authorization: accessToken },
                });

                setSocket(socket);

                return () => socket.disconnect();
            }
        },
        [accessToken]
    );

    return (
        <SocketContext.Provider
            value={{
                socket: socket,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
