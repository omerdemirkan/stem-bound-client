import Link from "next/link";
import UserCard, { UserCardProps } from "../ui/UserCard";
import { ESearchFields, ISearchData } from "../../utils/types/search.types";
import { searchFieldInputOptions } from "../../utils/constants";
import { appendQueriesToUrl, getDisplaySearchField } from "../../utils/helpers";
import { useRouter } from "next/router";
import { EUserRoles, IUser } from "../../utils/types";
import Grid from "@material-ui/core/Grid";
import ActionBar from "../ui/ActionBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { a11yProps } from "../../utils/helpers";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    tabs: {
        width: "100%",
    },
});

interface SearchProps {
    searchField: ESearchFields;
    searchData: ISearchData[];
    shallow?: boolean;
    UserCardProps?: Partial<UserCardProps>;
}

const Search: React.FC<SearchProps> = ({
    searchField,
    searchData,
    shallow,
    UserCardProps,
}) => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <div>
            <Tabs
                aria-label="search field tabs"
                indicatorColor="primary"
                onChange={console.log}
                value={searchField}
                className={classes.tabs}
            >
                {searchFieldInputOptions.map((option, index) => (
                    <Tab
                        label={option.display}
                        value={option.searchField}
                        onClick={() =>
                            router.push(
                                {
                                    pathname: router.pathname,
                                    query: { q: option.searchField },
                                },
                                {
                                    pathname: router.pathname,
                                    query: { q: option.searchField },
                                },
                                { shallow: true }
                            )
                        }
                        {...a11yProps("search-field-tab", index)}
                    />
                ))}
            </Tabs>
            <PaginatedSearchData
                searchDataArray={searchData || []}
                searchField={searchField}
                UserCardProps={UserCardProps}
            />
        </div>
    );
};

interface PaginatedSearchDataProps {
    searchDataArray: ISearchData[];
    searchField: ESearchFields;
    UserCardProps?: Partial<UserCardProps>;
}

const PaginatedSearchData: React.FC<PaginatedSearchDataProps> = ({
    searchDataArray,
    searchField,
    UserCardProps,
}) => {
    if (!Object.values(EUserRoles).includes(searchField as any)) return null;
    return (
        <Grid container spacing={2}>
            {searchDataArray.map((searchData: IUser) => (
                <Grid item xs={12} lg={6} xl={4}>
                    <UserCard
                        user={searchData}
                        key={searchData._id}
                        {...UserCardProps}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Search;
