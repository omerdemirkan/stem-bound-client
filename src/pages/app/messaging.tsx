import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import { IBreadCrumb } from "../../utils/types";
import { useContext } from "react";
import Button from "@material-ui/core/Button";
import ChatList from "../../components/ui/ChatList";
import SplitScreen from "../../components/ui/SplitScreen";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PictureMessage from "../../components/ui/PictureMessage";
import EmptyInboxSVG from "../../components/svg/illustrations/empty-inbox";
import { getDefaultSearchField, getUserDisplayRole } from "../../utils/helpers";
import AuthContext from "../../components/contexts/AuthContext";
import Link from "next/link";
import useQueryState from "../../hooks/useQueryState";
import ChatInterface from "../../components/containers/ChatInterface";
import MessagingContext from "../../components/contexts/MessagingContext";

const MessagingAppPage: React.FC = () => {
    const [chatId, setChatId] = useQueryState<string>("id");
    const { user } = useContext(AuthContext);
    const { chats, chatsLoading, chatsError, inspectedChat } = useContext(
        MessagingContext
    );

    const smallScreen = useMediaQuery("(max-width: 1400px)");

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
                <title>{inspectedChat?.name || "STEM-bound"} - Messaging</title>
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
