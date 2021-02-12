import AppLayout from "../../components/containers/AppLayout";
import AuthContext from "../../components/contexts/AuthContext";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import useSWR from "swr";
import { searchDataFetcher } from "../../utils/services";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDefaultSearchField, isSearchField } from "../../utils/helpers";
import { ISearchQuery, IWithAuthProps } from "../../utils/types";
import ContactUserButton from "../../components/util/ContactUserButton";

const SearchAppPage: React.FC<IWithAuthProps> = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
        searchField: getDefaultSearchField(user.role),
    });

    const { data: searchData, isValidating: loading } = useSWR(
        isSearchField(searchQuery?.searchField)
            ? `/search/${searchQuery.searchField}?query=${JSON.stringify(
                  searchQuery
              )}`
            : null,
        searchDataFetcher(searchQuery?.searchField as any, {
            ...searchQuery,
            exclude: [user._id],
        })
    );

    useEffect(
        function () {
            if (
                searchQuery.searchField &&
                !isSearchField(searchQuery.searchField)
            )
                router.push("/app/dashboard");
        },
        [searchQuery]
    );

    return (
        <AppLayout header="Search">
            <Head>
                <title>STEM-bound - Search</title>
            </Head>
            <Search
                searchData={searchData}
                query={searchQuery}
                onSearchQueryChanged={setSearchQuery}
                loading={loading}
                UserCardProps={{
                    renderFooter: (user) => (
                        <ContactUserButton userId={user._id} color="primary">
                            Contact
                        </ContactUserButton>
                    ),
                }}
            />
        </AppLayout>
    );
};

export default withAuth(SearchAppPage);
