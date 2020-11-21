import { useContext, useEffect } from "react";
import { IMessagingContextState } from "../../utils/types";
import MessagingContext from "../contexts/MessagingContext";

export default function useMessaging(
    chatId: string = null
): IMessagingContextState {
    const messagingContextState = useContext(MessagingContext);
    useEffect(
        function () {
            messagingContextState.setInspectedChat(chatId);

            return () => messagingContextState.setInspectedChat(null);
        },
        [chatId]
    );

    return messagingContextState;
}
