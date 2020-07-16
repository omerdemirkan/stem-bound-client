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

const SearchAppPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        auth: { user },
        search: { loading },
    } = useSelector((state: any) => state);
    const [query, setQuery] = useState<ESearchQueries>();

    useEffect(
        function () {
            const routerQuery = router.query.q;
            if (
                typeof routerQuery !== "undefined" &&
                isSearchQuery(routerQuery) &&
                routerQuery !== (query as any)
            ) {
                console.log(SearchQuery(routerQuery));
                dispatch(fetchSearchDataAsync(SearchQuery(routerQuery), {}));
            }
        },
        [router.query.q]
    );

    return (
        <AppLayout>
            <h4>search</h4>
            <h5>{query}</h5>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(SearchAppPage);
