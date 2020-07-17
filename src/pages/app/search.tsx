import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ESearchFields } from "../../utils/types";
import { isSearchField, SearchField } from "../../utils/helpers/search.helpers";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchDataAsync } from "../../store/search";
import { getClientQueryParams } from "../../utils/helpers";

const SearchAppPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        auth: { user },
        search: { loading, fields },
    } = useSelector((state: any) => state);
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
                searchFieldQuery &&
                isSearchField(searchFieldQuery) &&
                searchFieldQuery !== (searchField as any)
            ) {
                dispatch(
                    fetchSearchDataAsync({
                        field: SearchField(searchFieldQuery),
                    })
                );
                setSearchField(searchFieldQuery as any);
            }
        },
        [router.query.q]
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

export default withAuth(SearchAppPage);
