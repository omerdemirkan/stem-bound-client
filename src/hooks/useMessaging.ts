import { useContext, useEffect } from "react";
import { IMessagingContextState } from "../utils/types";
import MessagingContext from "../components/contexts/MessagingContext";

export default function useMessaging(
    chatId: string = null
): IMessagingContextState {
    const messagingContextState = useContext(MessagingContext);
    useEffect(
        function () {
            if (chatId) messagingContextState.setInspectedChatId(chatId);
        },
        [chatId]
    );

    return messagingContextState;
}
