import AppLayout from "../../components/containers/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import withUserCoordinates from "../../components/hoc/withUserCoordinates";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchDataAsync } from "../../store/search";
import { createChatAsync } from "../../store/chat";
import {
    isSearchField,
    SearchField,
    getClientQueryParams,
} from "../../utils/helpers";
import {
    ESearchFields,
    IStoreState,
    IWithUserCoordinates,
    IWithAuthProps,
    IUser,
} from "../../utils/types";
import AuthContext from "../../components/contexts/AuthContext";

const SearchAppPage: React.FC<IWithUserCoordinates & IWithAuthProps> = ({
    coordinates,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const {
        search: { fields },
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

    function handleSendMessage(searchedUser: IUser) {
        dispatch(
            createChatAsync(
                { meta: { users: [searchedUser._id, user._id] } },
                { duplicateFallback: true },
                {
                    onSuccess(chat) {
                        router.push(`/app/messaging`, {
                            query: { id: chat._id },
                        });
                    },
                }
            )
        );
    }

    return (
        <AppLayout>
            <h4>search</h4>
            <Search
                searchField={searchField}
                searchData={fields[searchField]}
                shallow
                handleSendMessage={handleSendMessage}
            />
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(withUserCoordinates(SearchAppPage));
