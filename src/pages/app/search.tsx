import AppLayout from "../../components/layouts/AppLayout";
import AuthContext from "../../components/contexts/AuthContext";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import useSWR from "swr";
import { searchDataFetcher } from "../../utils/services";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    getClientQueryParams,
    getDefaultSearchField,
    getDisplaySearchField,
    isSearchField,
} from "../../utils/helpers";
import {
    ESearchFields,
    EUserRoles,
    ISearchData,
    ISearchQuery,
    IUser,
    IWithAuthProps,
} from "../../utils/types";
import ContactUserButton from "../../components/util/ContactUserButton";
import useQueryState from "../../hooks/useQueryState";
import UserCard, { IUserCardProps } from "../../components/ui/UserCard";
import RelativeGrid from "../../components/ui/RelativeGrid";
import PictureMessage from "../../components/ui/PictureMessage";
import NoResultsSVG from "../../components/svg/illustrations/no-results";
import { Typography } from "@material-ui/core";
import ActionBar from "../../components/ui/ActionBar";
import SearchQueryInput from "../../components/containers/SearchQueryInput";

const SearchAppPage: React.FC<IWithAuthProps> = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [searchField, setSearchField] = useQueryState<ESearchFields>(
        "search-field",
        {
            defaultValue:
                getClientQueryParams()["search-field"] ||
                getDefaultSearchField(user.role),
        }
    );

    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
        searchField,
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
            else if (
                isSearchField(searchQuery.searchField) &&
                searchField !== searchQuery.searchField
            )
                setSearchField(searchQuery.searchField);
        },
        [searchQuery.searchField]
    );

    return (
        <AppLayout header="Search">
            <Head>
                <title>Search - STEM-bound</title>
            </Head>
            <ActionBar
                startEl={
                    <Typography color="textPrimary" variant="h6">
                        {getDisplaySearchField(searchQuery.searchField)}
                    </Typography>
                }
            >
                {isSearchField(searchQuery.searchField) && (
                    <SearchQueryInput
                        value={searchQuery}
                        onSearchQueryChanged={setSearchQuery}
                    />
                )}
            </ActionBar>
            {paginateSearchData({
                searchData,
                searchQuery,
                UserCardProps: {
                    renderFooter: (user) => (
                        <ContactUserButton userId={user._id} color="primary">
                            CONTACT
                        </ContactUserButton>
                    ),
                },
            })}
        </AppLayout>
    );
};

function paginateSearchData({
    searchData,
    searchQuery,
    UserCardProps,
}: {
    searchData: ISearchData[];
    searchQuery: ISearchQuery;
    UserCardProps?: Partial<IUserCardProps>;
}) {
    if (
        !searchData ||
        !Object.values(EUserRoles).includes(searchQuery.searchField as any)
    )
        return null;

    if (!searchData.length)
        return (
            <PictureMessage
                Svg={NoResultsSVG}
                size="sm"
                message="No results found"
            />
        );

    return (
        <RelativeGrid minWidthInPixels={450}>
            {searchData.map((searchData: IUser) => (
                <UserCard
                    key={searchData._id}
                    user={searchData}
                    fullWidth
                    noMargin
                    {...UserCardProps}
                />
            ))}
        </RelativeGrid>
    );
}

export default withAuth(SearchAppPage);
