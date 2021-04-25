import AppLayout from "../../components/layouts/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import { IBreadCrumb } from "../../utils/types";
import { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ChatList from "../../components/ui/ChatList";
import SplitScreen from "../../components/ui/SplitScreen";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PictureMessage from "../../components/ui/PictureMessage";
import EmptyInboxSVG from "../../components/svg/illustrations/empty-inbox";
import {
    getDefaultSearchField,
    getLastInspectedChatId,
    getDisplayUserRole,
} from "../../utils/helpers";
import AuthContext from "../../components/contexts/AuthContext";
import Link from "next/link";
import useQueryState from "../../hooks/useQueryState";
import ChatInterface from "../../components/containers/ChatInterface";
import MessagingContext from "../../components/contexts/MessagingContext";
import { useRouter } from "next/router";
import useCalculateOnce from "../../hooks/useCalculateOnce";

const MessagingAppPage: React.FC = () => {
    const smallScreen = useMediaQuery("(max-width: 1400px)");

    const lastInspectedChatId = useCalculateOnce(getLastInspectedChatId);
    const [chatId, setChatId] = useQueryState<string>("id", {
        defaultValue: !smallScreen ? lastInspectedChatId : null,
    });
    const [contactUserId, setContactUserId] = useQueryState<string>("contact");

    const { user } = useContext(AuthContext);
    const {
        chats,
        chatsLoading,
        chatsError,
        inspectedChat,
        contactUser,
        refetchChats,
    } = useContext(MessagingContext);

    useEffect(
        function () {
            if (contactUserId) contactUser(contactUserId);
        },
        [contactUserId]
    );

    const breadCrumbs: IBreadCrumb[] = [
        { label: "Messaging", href: "/app/messaging", shallow: true },
    ];

    if (chatId && inspectedChat) {
        breadCrumbs.push({
            label: inspectedChat.name,
        });
    }

    const chatInterface = !!chatId && <ChatInterface chatId={chatId} />;

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
        <AppLayout breadCrumbs={breadCrumbs}>
            <Head>
                <title>{inspectedChat?.name || "Messaging"} - STEM-bound</title>
            </Head>

            {!chats?.length && !chatsLoading ? (
                <PictureMessage
                    Svg={EmptyInboxSVG}
                    message="Looks like you haven't contacted anyone"
                    subMessage={`You can contact ${getDisplayUserRole(
                        getDefaultSearchField(user.role)
                    ).toLowerCase()}s or other ${user.displayRole.toLowerCase()}s on the search page.`}
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
            ) : smallScreen ? (
                chatId ? (
                    chatInterface
                ) : (
                    chatList
                )
            ) : (
                <SplitScreen
                    mainEl={chatInterface}
                    secondaryEl={chatList}
                    order="secondary-first"
                />
            )}
        </AppLayout>
    );
};

export default withAuth(MessagingAppPage);
