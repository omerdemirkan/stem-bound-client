import React from "react";
import { ISocketContextState } from "../../utils/types";
import useSocket from "../hooks/useSocket";

const initialSocketContextState: ISocketContextState = {
    emit: (...args) => null,
    on: (...args) => null,
    connected: false,
};

const SocketContext = React.createContext(initialSocketContextState);

export default SocketContext;

export const SocketContextProvider: React.FC = ({ children }) => {
    const socket = useSocket();
    return (
        <SocketContext.Provider
            value={{
                emit: socket?.emit,
                on: socket?.on,
                connected: socket?.connected,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
