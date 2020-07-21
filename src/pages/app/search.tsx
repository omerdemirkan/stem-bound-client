import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import withUserCoordinates from "../../components/hoc/withUserCoordinates";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isSearchField, SearchField } from "../../utils/helpers/search.helpers";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchDataAsync } from "../../store/search";
import { getClientQueryParams } from "../../utils/helpers";
import {
    ESearchFields,
    IStoreState,
    IWithUserCoordinates,
    IWithAuthProps,
} from "../../utils/types";

const SearchAppPage: React.FC<IWithUserCoordinates & IWithAuthProps> = ({
    coordinates,
    user,
    accessToken,
    authAttempted,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        search: {
            fields,
            status: {
                fetchSearchData: { loading },
            },
        },
    } = useSelector((state: IStoreState) => state);
    const [searchField, setSearchField] = useState<ESearchFields>();

    useEffect(function () {
        // Because I'm using a router hook, it returns an empty searchField object until hydration.
        if (!isSearchField(getClientQueryParams().q)) {
            router.push("/app/dashboard");
        }
    }, []);

    useEffect(
        function () {
            const searchFieldQuery = router.query.q;
            if (
                coordinates &&
                isSearchField(searchFieldQuery) &&
                searchFieldQuery !== (searchField as any)
            ) {
                dispatch(
                    fetchSearchDataAsync({
                        field: SearchField(searchFieldQuery),
                        coordinates,
                    })
                );
                setSearchField(searchFieldQuery as any);
            }
        },
        [router.query.q, coordinates]
    );

    return (
        <AppLayout>
            <h4>search</h4>
            <Search
                searchField={searchField}
                searchData={fields[searchField]}
                shallow
            />
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(withUserCoordinates(SearchAppPage));
