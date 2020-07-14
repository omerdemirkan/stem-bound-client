import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ESearchQueries } from "../../utils/types/search.types";
import { isSearchQuery } from "../../utils/helpers/search.helpers";

const SearchAppPage: React.FC = () => {
    const router = useRouter();
    const defaultQuery = ESearchQueries.INSTRUCTOR;
    const [query, setQuery] = useState<ESearchQueries>(
        isSearchQuery(router.query.q) ? (router.query.q as any) : defaultQuery
    );

    useEffect(
        function () {
            if (query !== (router.query.q as any)) {
                if (isSearchQuery(router.query.q)) {
                    setQuery(router.query.q as any);
                } else {
                    router.push(
                        router.pathname,
                        {
                            query: { ...router.query, q: defaultQuery },
                        },
                        {
                            shallow: true,
                        }
                    );
                }
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
