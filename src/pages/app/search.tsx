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
import {
    isSearchField,
    SearchField,
    appendQueriesToUrl,
} from "../../utils/helpers";
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
    const searchStringQuery = router.query.text as string;

    const { user } = useContext(AuthContext);

    const { data: searchData, revalidate } = useSWR(
        searchFieldQuery
            ? `/search/${searchFieldQuery}${
                  searchStringQuery ? `?text=${searchStringQuery}` : ""
              }`
            : null,
        searchDataFetcher({
            field: searchFieldQuery,
            exclude: [user._id],
            text: searchStringQuery,
        })
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
            router.push(
                appendQueriesToUrl("/app/messaging", { id: existingChat })
            );
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
            router.push(appendQueriesToUrl("/app/messaging", { id: chat._id }));
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
                        appendQueriesToUrl(router.pathname, {
                            ...router.query,
                            q: searchField,
                        }),
                        undefined,
                        {
                            shallow: true,
                        }
                    )
                }
                onSearchStringChanged={(searchString) =>
                    router.push(
                        appendQueriesToUrl(router.pathname, {
                            ...router.query,
                            text: searchString,
                        }),
                        undefined,
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
