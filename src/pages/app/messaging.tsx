import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import useDebounce from "../../components/hooks/useDebounce";
import { IBreadCrumb } from "../../utils/types";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ChatList from "../../components/ui/ChatList";
import ChatMessageFeed from "../../components/ui/ChatMessageFeed";
import SplitScreen from "../../components/ui/SplitScreen";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useMessaging from "../../components/hooks/useMessaging";
import PictureMessage from "../../components/ui/PictureMessage";
import EmptyInboxSVG from "../../components/svg/illustrations/empty-inbox";
import { getDefaultSearchField, getUserDisplayRole } from "../../utils/helpers";
import AuthContext from "../../components/contexts/AuthContext";
import Link from "next/link";

const MessagingAppPage: React.FC = () => {
    const router = useRouter();
    const chatId = router.query.id as string;
    const contactUserId = router.query.contact as string;

    const { user } = useContext(AuthContext);

    const {
        chats,
        messages,
        updateMessage,
        deleteMessage,
        restoreMessage,
        sendMessage,
        setUserIsTyping,
        chatsLoading,
        usersTypingHashTable,
        setInspectedChat,
        messagesLoading,
        chatsError,
        contactUser,
    } = useMessaging(chatId);

    const inspectedChat = chats?.find((chat) => chat._id === chatId);

    const [editedMessageId, setEditedMessageId] = useState<null | string>(null);
    const [editedMessageText, setEditedMessageText] = useState<string>("");
    const [textField, setTextField] = useState<string>("");

    const debouncedTextField = useDebounce(textField, 3000);

    const smallScreen = useMediaQuery("(max-width: 1400px)");

    const userIsTyping = textField && debouncedTextField !== textField;

    useEffect(
        function () {
            setUserIsTyping(userIsTyping);
        },
        [userIsTyping]
    );

    useEffect(
        function () {
            if (contactUserId) contactUser(contactUserId);
        },
        [contactUserId]
    );

    useEffect(
        function () {
            if (editedMessageId) {
                setEditedMessageText(
                    messages.find((message) => message._id === editedMessageId)
                        .text
                );
            } else {
                setEditedMessageText("");
            }
        },
        [editedMessageId]
    );

    useEffect(
        function () {
            setTextField("");
            setEditedMessageId(null);
            setEditedMessageText("");
            setInspectedChat(chatId);
        },
        [chatId]
    );

    function handleInspectChat(id: string) {
        router.push(`${router.pathname}?id=${id}`, undefined, {
            shallow: true,
        });
    }

    function handleEditMessage() {
        updateMessage({
            chatId,
            messageId: editedMessageId,
            text: editedMessageText,
        });
        setEditedMessageId(null);
    }

    function handleCreateMessage() {
        sendMessage({
            chatId,
            text: textField,
        });
        setTextField("");
    }

    const breadCrumbs: IBreadCrumb[] = [
        { label: "Messaging", href: "/app/messaging", shallow: true },
    ];

    if (chatId && inspectedChat) {
        breadCrumbs.push({
            label: inspectedChat.name,
        });
    }

    return (
        <AppLayout
            breadCrumbs={breadCrumbs}
            footerEl={
                chatId && (
                    <TextField
                        variant="outlined"
                        autoFocus
                        fullWidth
                        multiline
                        helperText={editedMessageId && "Editing"}
                        placeholder={`Message ${inspectedChat?.name}`}
                        value={editedMessageId ? editedMessageText : textField}
                        onChange={(e) =>
                            (editedMessageId
                                ? setEditedMessageText
                                : setTextField)(e.target.value)
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {editedMessageId ? (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    setEditedMessageId(null)
                                                }
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleEditMessage}
                                                variant="contained"
                                                color="primary"
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={handleCreateMessage}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Send
                                        </Button>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                )
            }
        >
            <Head>
                <title>STEM-bound - Messaging</title>
            </Head>

            {!chats?.length && !chatsLoading ? (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="Looks like you haven't contacted anyone"
                    subMessage={`You can contact ${getUserDisplayRole(
                        getDefaultSearchField(user.role)
                    ).toLowerCase()}s or other ${getUserDisplayRole(
                        user.role
                    ).toLowerCase()}s on the search page.`}
                    size="large"
                    footer={
                        <Link href="/app/search">
                            <a>
                                <Button color="primary" fullWidth>
                                    Go to Search Page
                                </Button>
                            </a>
                        </Link>
                    }
                />
            ) : (
                <SplitScreen
                    mainEl={
                        <>
                            {!!chatId && (
                                <ChatMessageFeed
                                    chatMessages={messages}
                                    loading={messagesLoading}
                                    errorMessage={
                                        chatsError &&
                                        "Couldn't load chats, an error occured"
                                    }
                                    chatId={chatId}
                                    chatPictureUrl={inspectedChat?.pictureUrl}
                                    isTyping={
                                        usersTypingHashTable[chatId] || []
                                    }
                                    onDeleteMessageClicked={(messageId) =>
                                        deleteMessage({ chatId, messageId })
                                    }
                                    onEditMessageClicked={(id) =>
                                        setEditedMessageId(id)
                                    }
                                    onRestoreMessageClicked={(messageId) =>
                                        restoreMessage({ chatId, messageId })
                                    }
                                    editedMessageId={editedMessageId}
                                    editedMessageText={editedMessageText}
                                />
                            )}
                        </>
                    }
                    secondaryEl={
                        (!smallScreen || !chatId) && (
                            <ChatList
                                chats={chats}
                                handleInspectChat={handleInspectChat}
                                inspectedChatId={chatId as string}
                                loading={chatsLoading}
                                errorMessage={
                                    chatsError &&
                                    "Couldn't load messages, an error occured"
                                }
                            />
                        )
                    }
                    order="secondary-first"
                />
            )}
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);
