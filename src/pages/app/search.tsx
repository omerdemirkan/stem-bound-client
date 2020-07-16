import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ESearchQueries, ISearchData } from "../../utils/types/search.types";
import {
    isSearchQuery,
    SearchQuery,
    getDefaultSearchQuery,
} from "../../utils/helpers/search.helpers";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchDataAsync } from "../../store/search";
import { getQueryStringParams } from "../../utils/helpers";

const SearchAppPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        auth: { user },
        search: { loading, fields },
    } = useSelector((state: any) => state);
    const [query, setQuery] = useState<ESearchQueries>();

    useEffect(function () {
        if (!isSearchQuery(getQueryStringParams(window.location.search).q)) {
            router.push("/app/dashboard");
        }
    }, []);

    useEffect(
        function () {
            const routerQuery = router.query.q;
            if (
                routerQuery &&
                isSearchQuery(routerQuery) &&
                routerQuery !== (query as any)
            ) {
                dispatch(fetchSearchDataAsync(SearchQuery(routerQuery), {}));
                setQuery(routerQuery as any);
            }
        },
        [router.query.q]
    );

    return (
        <AppLayout>
            <h4>search</h4>
            <h5>{query}</h5>
            <Search query={query} searchData={fields[query]} shallow />
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(SearchAppPage);
