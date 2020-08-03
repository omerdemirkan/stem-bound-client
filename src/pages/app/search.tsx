import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import withUserCoordinates from "../../components/hoc/withUserCoordinates";
import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import { searchDataFetcher, createChat } from "../../utils/services";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import {
    isSearchField,
    SearchField,
    getClientQueryParams,
} from "../../utils/helpers";
import {
    ESearchFields,
    IWithUserCoordinates,
    IWithAuthProps,
    IUser,
} from "../../utils/types";

const SearchAppPage: React.FC<IWithUserCoordinates & IWithAuthProps> = ({
    coordinates,
}) => {
    const router = useRouter();

    const searchFieldQuery = isSearchField(router.query.q)
        ? SearchField(router.query.q)
        : null;

    const { user } = useContext(AuthContext);

    const { data: searchData, revalidate } = useSWR(
        searchFieldQuery ? `/api/v1/search/${searchFieldQuery}` : null,
        searchDataFetcher({ field: searchFieldQuery })
    );

    const [searchField, setSearchField] = useState<ESearchFields>();

    useEffect(function () {
        if (!isSearchField(getClientQueryParams().q)) {
            router.push("/app/dashboard");
        }
    }, []);

    useEffect(
        function () {
            if (
                coordinates &&
                searchFieldQuery &&
                searchFieldQuery !== (searchField as any)
            ) {
                revalidate();
                setSearchField(searchFieldQuery as any);
            }
        },
        [searchFieldQuery, coordinates]
    );

    function handleSendMessage(searchedUser: IUser) {
        createChat(
            { meta: { users: [searchedUser._id, user._id] } },
            { duplicateFallback: true }
        )
            .then(function ({ data: chat }) {
                router.push(`/app/messaging`, {
                    query: { id: chat._id },
                });
            })
            .catch(console.error);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Search</title>
            </Head>
            <h4>search</h4>
            <Search
                searchField={searchField}
                searchData={searchData}
                handleSendMessage={handleSendMessage}
                shallow
            />
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(withUserCoordinates(SearchAppPage));
