import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import useDebounce from "../../hooks/useDebounce";
import { IBreadCrumb, IChatMessage } from "../../utils/types";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ChatList from "../../components/ui/ChatList";
import ChatMessageFeed from "../../components/ui/ChatMessageFeed";
import SplitScreen from "../../components/ui/SplitScreen";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useMessaging from "../../hooks/useMessaging";
import PictureMessage from "../../components/ui/PictureMessage";
import EmptyInboxSVG from "../../components/svg/illustrations/empty-inbox";
import {
    getDefaultSearchField,
    getUserDisplayRole,
    setLastInspectedChatId,
    getLastInspectedChatId,
} from "../../utils/helpers";
import AuthContext from "../../components/contexts/AuthContext";
import Link from "next/link";
import useQueryState from "../../hooks/useQueryState";
import ChatMessageInput from "../../components/util/ChatMessageInput";

const MessagingAppPage: React.FC = () => {
    const [chatId, setChatId] = useQueryState<string>("id");

    const router = useRouter();
    const contactUserId = router.query.contact as string;

    const { user } = useContext(AuthContext);

    const {
        chats,
        messages,
        updateMessage,
        deleteMessage,
        restoreMessage,
        sendMessage,
        chatsLoading,
        usersTyping,
        setInspectedChatId,
        messagesLoading,
        chatsError,
        contactUser,
        loadMoreChats,
        loadMoreMessages,
        hasMoreChats,
        hasMoreMessages,
    } = useMessaging(chatId);

    const inspectedChat = chats?.find((chat) => chat._id === chatId);

    const smallScreen = useMediaQuery("(max-width: 1400px)");

    useEffect(function () {
        let initialChatId = chatId || getLastInspectedChatId();
        if (!smallScreen && initialChatId) setChatId(initialChatId);
    }, []);

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

    const breadCrumbs: IBreadCrumb[] = [
        { label: "Messaging", href: "/app/messaging", shallow: true },
    ];

    if (chatId && inspectedChat) {
        breadCrumbs.push({
            label: inspectedChat.name,
        });
    }

    const chatFeed = !!chatId && (
        <ChatMessageFeed
            chatMessages={messages}
            loading={messagesLoading}
            errorMessage={chatsError && "Couldn't load chats, an error occured"}
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
    );

    const chatList = (!smallScreen || !chatId) && (
        <ChatList
            chats={chats}
            handleInspectChat={setChatId}
            inspectedChatId={chatId as string}
            loading={chatsLoading}
            errorMessage={
                chatsError && "Couldn't load messages, an error occured"
            }
        />
    );

    return (
        <AppLayout
            breadCrumbs={breadCrumbs}
            footerEl={
                inspectedChat && (
                    <ChatMessageInput
                        chatId={chatId}
                        chatName={inspectedChat.name}
                        onSendMessage={(text) =>
                            sendMessage({
                                chatId,
                                text,
                            })
                        }
                    />
                )
            }
        >
            <Head>
                <title>STEM-bound - Messaging</title>
            </Head>

            {!chats?.length && !chatsLoading && (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="Looks like you haven't contacted anyone"
                    subMessage={`You can contact ${getUserDisplayRole(
                        getDefaultSearchField(user.role)
                    ).toLowerCase()}s or other ${getUserDisplayRole(
                        user.role
                    ).toLowerCase()}s on the search page.`}
                    size="lg"
                    footerEl={
                        <Link href="/app/search">
                            <a>
                                <Button color="primary" fullWidth>
                                    Go to Search Page
                                </Button>
                            </a>
                        </Link>
                    }
                />
            )}

            {smallScreen ? (
                chatId ? (
                    chatFeed
                ) : (
                    chatList
                )
            ) : (
                <SplitScreen
                    mainEl={chatFeed}
                    secondaryEl={chatList}
                    order="secondary-first"
                />
            )}
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);
