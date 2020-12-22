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
import Button from "@material-ui/core/Button";

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

    async function handleContactUser(contacted: IUser) {
        await createChat({ meta: { users: [user._id, contacted._id] } });
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
                    renderFooter: (user) => (
                        <Button onClick={() => handleContactUser(user)}>
                            Contact
                        </Button>
                    ),
                }}
            />
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(withUserCoordinates(SearchAppPage));
