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
    const { user } = useContext(AuthContext);
    useEffect(
        function () {
            if (user?._id) {
                const socket = io(SERVER_BASE_URL, {
                    reconnection: true,
                    query: { userId: user._id },
                });

                setSocket(socket);

                return () => socket.disconnect();
            }
        },
        [user]
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
