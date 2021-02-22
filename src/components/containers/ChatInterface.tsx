import withAuth from "../../components/hoc/withAuth";
import { IChatMessage } from "../../utils/types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ChatMessageFeed from "../../components/ui/ChatMessageFeed";
import useMessaging from "../../hooks/useMessaging";
import { setLastInspectedChatId } from "../../utils/helpers";
import ChatMessageInput from "../../components/util/ChatMessageInput";

export interface IChatInterfaceProps {
    chatId: string;
}

const ChatInterface: React.FC<IChatInterfaceProps> = ({ chatId }) => {
    const router = useRouter();
    const contactUserId = router.query.contact as string;

    const {
        messages,
        updateMessage,
        deleteMessage,
        restoreMessage,
        sendMessage,
        usersTyping,
        messagesLoading,
        chatsError,
        contactUser,
        loadMoreMessages,
        hasMoreMessages,
        inspectedChat,
    } = useMessaging(chatId);

    useEffect(
        function () {
            if (contactUserId) contactUser(contactUserId);
        },
        [contactUserId]
    );

    useEffect(
        function () {
            if (!chatId) return;
            setLastInspectedChatId(chatId);
        },
        [chatId]
    );

    function handleEditMessage(updatedMessage: IChatMessage) {
        updateMessage({
            chatId,
            messageId: updatedMessage._id,
            text: updatedMessage.text,
        });
    }

    return (
        <div className="chat-interface-root">
            <div className="chat-message-feed-wrapper">
                <ChatMessageFeed
                    chatMessages={messages}
                    loading={messagesLoading}
                    errorMessage={
                        chatsError && "Couldn't load chats, an error occured"
                    }
                    chatId={chatId}
                    hasMore={hasMoreMessages}
                    onLoadMore={loadMoreMessages}
                    chatPictureUrl={inspectedChat?.pictureUrl}
                    isTyping={usersTyping[chatId] || []}
                    onDeleteClicked={(messageId) =>
                        deleteMessage({ chatId, messageId })
                    }
                    onEdit={handleEditMessage}
                    onRestoreClicked={(messageId) =>
                        restoreMessage({ chatId, messageId })
                    }
                />
            </div>

            <div className="chat-message-input-wrapper">
                <ChatMessageInput
                    chatId={chatId}
                    chatName={inspectedChat?.name}
                    onSendMessage={(text) =>
                        sendMessage({
                            chatId,
                            text,
                        })
                    }
                />
            </div>
            <style jsx>{`
                .chat-interface-root {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 100%;
                }
                .chat-message-feed-wrapper {
                    overflow-y: auto;
                    height: 100%;
                }
                .chat-message-input-wrapper {
                    padding-top: 10px;
                    margin-top: auto;
                }
            `}</style>
        </div>
    );
};

export default withAuth(ChatInterface);
