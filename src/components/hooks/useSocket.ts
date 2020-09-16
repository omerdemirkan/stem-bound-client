import SocketContext from "../contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";
import { ISocketContextState, ESocketEvents } from "../../utils/types";

interface IListenerHashTable {
    [key: string]: {
        event: string;
        startIndex: number;
        endIndex: number;
        listeners: Function[];
    };
}

type IListenerRemovers = (() => void)[];

type Initializer = (socket: SocketIOClient.Socket) => any;

type InitializerCreator = () => Initializer;

export default function useSocket(
    init: Initializer | InitializerCreator,
    events?: ESocketEvents[]
): ISocketContextState & { reinitializeListeners } {
    const context = useContext(SocketContext);
    const initRef = useRef<boolean>(false);
    const listenerRemoversRef = useRef<IListenerRemovers>();

    const { socket } = context;

    function initializeListeners(): () => void {
        if (!socket?.connected || initRef.current) return;

        let cleanup = () => null;

        const listenerHashTable: IListenerHashTable = {};
        const listenerRemovers: IListenerRemovers = [];

        events?.forEach(function (event) {
            listenerHashTable[event] = {
                event,
                listeners: [],
                startIndex: socket.listeners(event).length,
                endIndex: 0,
            };
        });

        if (socket?.connected && init) {
            try {
                // If user passed initializer creator:
                // @ts-ignore
                cleanup = init()(socket) || cleanup;
            } catch {
                cleanup = init(socket) || cleanup;
            }
            initRef.current = true;
        }

        events?.forEach(function (event) {
            listenerHashTable[event].endIndex =
                socket.listeners(event).length - 1;
            listenerHashTable[event].listeners = socket.listeners(event);
        });

        Object.values(listenerHashTable).forEach(function ({
            event,
            endIndex,
            startIndex,
            listeners,
        }) {
            listenerRemovers.push(function () {
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

    function reinitializeListeners() {
        if (!initRef.current) return;
        listenerRemoversRef.current.forEach((listenerRemover) =>
            listenerRemover()
        );
        initRef.current = false;
        initializeListeners();
    }

    useEffect(
        function () {
            return initializeListeners();
        },
        [socket?.connected, init]
    );

    return { ...context, reinitializeListeners };
}
