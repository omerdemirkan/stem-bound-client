import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import withUserCoordinates from "../../components/hoc/withUserCoordinates";
import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import {
    searchDataFetcher,
    createChat,
    createMessage,
} from "../../utils/services";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { isSearchField, SearchField } from "../../utils/helpers";
import {
    ESearchFields,
    IWithUserCoordinatesProps,
    IWithAuthProps,
    IUser,
} from "../../utils/types";

const SearchAppPage: React.FC<IWithUserCoordinatesProps & IWithAuthProps> = ({
    coordinates,
}) => {
    const router = useRouter();

    const searchFieldQuery = isSearchField(router.query.q)
        ? SearchField(router.query.q)
        : null;

    const { user } = useContext(AuthContext);

    const { data: searchData, revalidate } = useSWR(
        searchFieldQuery ? `/search/${searchFieldQuery}` : null,
        searchDataFetcher({ field: searchFieldQuery, exclude: [user._id] })
    );

    const [searchField, setSearchField] = useState<ESearchFields>();

    useEffect(
        function () {
            if (
                coordinates &&
                searchFieldQuery &&
                searchFieldQuery !== (searchField as any)
            ) {
                revalidate();
                setSearchField(searchFieldQuery as any);
            } else if (!searchFieldQuery) {
                router.push("/app/dashboard");
            }
        },
        [searchFieldQuery, coordinates]
    );

    async function handleContactUser(contactedUser: IUser, message: string) {
        const currentUserChatIdsHashTable = {};
        (user.meta as any).chats.forEach(function (chatId) {
            currentUserChatIdsHashTable[chatId] = true;
        });
        const existingChat = (contactedUser.meta as any).chats.find(
            (chatId) => currentUserChatIdsHashTable[chatId]
        );

        if (existingChat) {
            await createMessage({ chatId: existingChat, text: message });
            router.push(`/app/messaging`, {
                pathname: `/app/messaging`,
                query: { id: existingChat },
            });
        } else {
            const { data: chat } = await createChat(
                {
                    meta: { users: [contactedUser._id, user._id] },
                    messages: [
                        {
                            text: message,
                            meta: { from: user._id },
                        } as any,
                    ],
                },
                { duplicateFallback: true }
            );
            router.push(`/app/messaging`, {
                query: { id: chat._id },
            });
        }
    }

    return (
        <AppLayout header="Search">
            <Head>
                <title>STEM-bound - Search</title>
            </Head>
            <Search
                searchField={searchField}
                searchData={searchData}
                onSearchFieldChanged={(searchField) =>
                    router.push(
                        {
                            pathname: `${router.pathname}`,
                            query: { q: searchField },
                        },
                        {
                            query: { q: searchField },
                            pathname: `${router.pathname}`,
                        },
                        {
                            shallow: true,
                        }
                    )
                }
                UserCardProps={{
                    contactUserEnabled: true,
                    onContactUser: handleContactUser,
                }}
            />
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(withUserCoordinates(SearchAppPage));
