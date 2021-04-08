import StaticLayout from "../components/layouts/StaticLayout";
import Head from "next/head";
import { NextPageContext } from "next";
import { fetchSearchData } from "../utils/services";
import {
    ESearchFields,
    EUserRoles,
    ISearchData,
    ISearchQuery,
    IUser,
} from "../utils/types";
import {
    serverRedirect,
    isSearchField,
    SearchField,
    deleteUndefined,
    getDisplaySearchField,
    appendQueriesToUrl,
} from "../utils/helpers";
import { useRouter } from "next/router";
import UserCard, { IUserCardProps } from "../components/ui/UserCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ActionBar from "../components/ui/ActionBar";
import SearchQueryInput from "../components/containers/SearchQueryInput";
import PictureMessage from "../components/ui/PictureMessage";
import NoResultsSVG from "../components/svg/illustrations/no-results";

interface Props {
    query: ISearchQuery;
    searchData: ISearchData[];
}

const SearchPage: React.FC<Props> = ({ query, searchData }) => {
    const router = useRouter();
    return (
        <StaticLayout>
            <Head>
                <title>
                    {getDisplaySearchField(query.searchField)} - STEM-bound
                </title>
            </Head>
            <ActionBar
                startEl={
                    <Typography variant="h6" gutterBottom>
                        {getDisplaySearchField(query.searchField)}
                    </Typography>
                }
            >
                <SearchQueryInput
                    value={query}
                    onSearchQueryChanged={(query) =>
                        router.push(appendQueriesToUrl(router.pathname, query))
                    }
                />
            </ActionBar>

            {paginateSearchData({
                searchData,
                searchQuery: query,
            })}
        </StaticLayout>
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
    if (!Object.values(EUserRoles).includes(searchQuery.searchField as any))
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
        <Grid container spacing={3} style={{ margin: 0, width: "100%" }}>
            {searchData.map((searchData: IUser) => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <UserCard
                        key={searchData._id}
                        user={searchData}
                        fullWidth
                        noMargin
                        {...UserCardProps}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    try {
        const query = ctx.query as any;
        if (!isSearchField(query.searchField)) throw new Error();
        let searchData = (
            await fetchSearchData(SearchField(query.searchField), query)
        ).data;
        deleteUndefined(searchData);
        const props: Props = { query, searchData };
        return { props };
    } catch (e) {
        return serverRedirect(
            ctx,
            `search?searchField=${ESearchFields.INSTRUCTOR}`
        );
    }
}

export default SearchPage;
