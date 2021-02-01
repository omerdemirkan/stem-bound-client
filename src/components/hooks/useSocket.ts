import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";
import { ISocketContextState, ESocketEvents } from "../../utils/types";

interface IListenerHashTable {
    [key: string]: number;
}

interface IListener {
    event: string;
    listener: Function;
}

type Initializer = (socket: SocketIOClient.Socket) => any;

const events = Object.keys(ESocketEvents);

export default function useSocket(
    init: Initializer,
    deps: any[] = []
): ISocketContextState & { configureListeners } {
    const context = useContext(SocketContext);
    const listenersRef = useRef<IListener[]>([]);

    const { socket } = context;

    function initializeListeners() {
        if (!socket?.connected) return;
        removeListeners();

        let cleanup = () => null;
        const listenerStartIndices: IListenerHashTable = {};

        for (let event of events)
            listenerStartIndices[event] = socket.listeners(event).length;

        if (socket?.connected && init) cleanup = init(socket) || cleanup;

        events.forEach(function (event) {
            const listeners = socket.listeners(event);
            for (let i = listenerStartIndices[event]; i < listeners.length; i++)
                listenersRef.current.push({ event, listener: listeners[i] });
        });

        return cleanup;
    }

    function removeListeners() {
        for (let { event, listener } of listenersRef.current)
            socket.removeListener(event, listener);
        listenersRef.current = [];
    }

    useEffect(initializeListeners, [socket?.connected, ...deps]);

    return { ...context, configureListeners: initializeListeners };
}
