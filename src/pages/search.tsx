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
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";

const NUM_ITEMS_PER_PAGE = 12;

interface ISearchPageProps {
    query: ISearchQuery;
    searchData: ISearchData;
    page: number;
    numPages: number;
}

const SearchPage: React.FC<ISearchPageProps> = ({
    query,
    searchData,
    page,
    numPages,
}) => {
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
                {numPages > 1 && (
                    <div className="pagination-container">
                        <Pagination
                            page={page}
                            count={numPages}
                            color="primary"
                            onChange={(e, page) =>
                                router.push(
                                    appendQueriesToUrl(router.pathname, {
                                        ...query,
                                        page,
                                    })
                                )
                            }
                        />
                    </div>
                )}
            </Container>
            <style jsx>{`
                .pagination-container {
                    display: flex;
                    justify-content: center;
                    padding-top: 60px;
                }
            `}</style>
        </StaticLayout>
    );
};

function paginateSearchData({
    searchData,
    searchQuery,
    UserCardProps,
}: {
    searchData: ISearchData;
    searchQuery: ISearchQuery;
    UserCardProps?: Partial<IUserCardProps>;
}) {
    if (!Object.values(EUserRoles).includes(searchQuery.searchField as any))
        return null;

    if (!searchData.data.length)
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
                marginLeft: "-10px",
                marginRight: "-10px",
            }}
        >
            {searchData.data.map((searchData: IUser, i) => (
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
        searchData: { data: [], count: 0 },
        page: +query?.page ? Math.max(+query?.page, 1) : 1,
        numPages: 1,
    };
    if (!isSearchField(query.searchField)) {
        props.query.searchField = ESearchFields.INSTRUCTOR;
    }

    try {
        let searchData = await fetchSearchData(SearchField(query.searchField), {
            ...query,
            skip: (props.page - 1) * NUM_ITEMS_PER_PAGE,
            limit: NUM_ITEMS_PER_PAGE,
        });
        deleteUndefined(searchData);
        props.searchData = searchData;
        props.numPages =
            searchData.count > NUM_ITEMS_PER_PAGE
                ? Math.ceil(searchData.count / NUM_ITEMS_PER_PAGE)
                : 1;
    } catch (e) {
        console.error(`An error occured in fetching search data`, e);
    }
    return { props };
}

export default SearchPage;
