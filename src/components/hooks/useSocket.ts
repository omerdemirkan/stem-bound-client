import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";
import { ISocketContextState, ESocketEvents } from "../../utils/types";

export default function useSocket(
    initializer?: null | ((socket: SocketIOClient.Socket) => any),
    events?: ESocketEvents[]
): ISocketContextState & { reinitializeListeners } {
    const context = useContext(SocketContext);
    const initRef = useRef<boolean>(false);
    const listenerRemoversRef = useRef<(() => void)[]>();

    const { socket } = context;

    function reinitializeListeners() {
        listenerRemoversRef.current.forEach((listenerRemover) =>
            listenerRemover()
        );
        initializer(socket);
    }

    useEffect(
        function () {
            if (socket?.connected && !initRef.current) {
                let cleanup = () => null;

                const listenerHashTable: {
                    [key: string]: {
                        event: string;
                        startIndex: number;
                        endIndex: number;
                        listeners: Function[];
                    };
                } = {};
                const listenerRemovers = [];

                events?.forEach(function (event) {
                    listenerHashTable[event] = {
                        event,
                        listeners: socket.listeners(event),
                        startIndex: socket.listeners(event).length,
                        endIndex: 0,
                    };
                });

                if (socket?.connected && initializer) {
                    cleanup = initializer(socket) || (() => null);
                    initRef.current = true;
                }

                events?.forEach(function (event) {
                    listenerHashTable[event].endIndex =
                        socket.listeners(event).length - 1;
                });

                Object.values(listenerHashTable).forEach(function ({
                    event,
                    endIndex,
                    startIndex,
                }) {
                    listenerRemovers.push(function () {
                        let listeners = socket.listeners(event);
                        for (let i = startIndex; i <= endIndex; i++) {
                            listenerRemovers.push(() =>
                                socket.removeEventListener(event, listeners[i])
                            );
                        }
                    });
                });

                listenerRemoversRef.current = listenerRemovers;

                return cleanup;
            }
        },
        [socket?.connected, initializer]
    );

    return { ...context, reinitializeListeners };
}
