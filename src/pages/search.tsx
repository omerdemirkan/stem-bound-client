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
import { Container } from "@material-ui/core";
import FadeIn from "../components/ui/FadeIn";

interface ISearchPageProps {
    query: ISearchQuery;
    searchData: ISearchData[];
    count: number;
}

const SearchPage: React.FC<ISearchPageProps> = ({ query, searchData }) => {
    const router = useRouter();
    return (
        <StaticLayout header="Search">
            <Head>
                <title>
                    {getDisplaySearchField(query.searchField)} - STEM-bound
                </title>
            </Head>
            <Container maxWidth="lg">
                <ActionBar
                    startEl={
                        <Typography variant="h5" gutterBottom>
                            {getDisplaySearchField(query.searchField)}{" "}
                            {query.text
                                ? `matching "${query.text}"`
                                : "near me"}
                        </Typography>
                    }
                >
                    <SearchQueryInput
                        value={query}
                        onSearchQueryChanged={(query) =>
                            router.push(
                                appendQueriesToUrl(router.pathname, query)
                            )
                        }
                    />
                </ActionBar>
                {paginateSearchData({
                    searchData,
                    searchQuery: query,
                })}
            </Container>
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
        <Grid
            container
            spacing={3}
            style={{
                width: "calc(100% + 20px)",
                margin: "0, -10px",
            }}
        >
            {searchData.map((searchData: IUser, i) => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    {/* <FadeIn delayMs={i * 50}> */}
                    <UserCard
                        key={searchData._id}
                        user={searchData}
                        fullWidth
                        noMargin
                        {...UserCardProps}
                    />
                    {/* </FadeIn> */}
                </Grid>
            ))}
        </Grid>
    );
}

export async function getServerSideProps({ query, res, req }: NextPageContext) {
    let props: ISearchPageProps = {
        query: query as any,
        searchData: [],
        count: 0,
    };
    if (!isSearchField(query.searchField)) {
        props.query.searchField = ESearchFields.INSTRUCTOR;
    }

    try {
        let { data, count } = await fetchSearchData(
            SearchField(query.searchField),
            query
        );
        deleteUndefined(data);
        props.searchData = data;
        props.count = count;
    } catch (e) {
        console.error(`An error occured in fetching search data`, e);
    }
    return { props };
}

export default SearchPage;
