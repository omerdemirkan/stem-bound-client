import AppLayout from "../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../components/hoc/withAuth";
import Search from "../../components/containers/Search";
import withUserCoordinates from "../../components/hoc/withUserCoordinates";
import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import { searchDataFetcher, createChat } from "../../utils/services";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { isSearchField, SearchField } from "../../utils/helpers";
import {
    ESearchFields,
    IWithUserCoordinates,
    IWithAuthProps,
    IUser,
} from "../../utils/types";

const SearchAppPage: React.FC<IWithUserCoordinates & IWithAuthProps> = ({
    coordinates,
}) => {
    const router = useRouter();

    const searchFieldQuery = isSearchField(router.query.q)
        ? SearchField(router.query.q)
        : null;

    const { user } = useContext(AuthContext);

    const { data: searchData, revalidate } = useSWR(
        searchFieldQuery ? `/search/${searchFieldQuery}` : null,
        searchDataFetcher({ field: searchFieldQuery })
    );

    const [searchField, setSearchField] = useState<ESearchFields>();
    const [contactedUser, setContactedUser] = useState<IUser | null>(null);
    const [contactedModalOpen, setContactedModalOpen] = useState(false);
    const [contactUserMessageInput, setContactUserMessageInput] = useState<
        string
    >("");

    useEffect(
        function () {
            if (
                coordinates &&
                searchFieldQuery &&
                searchFieldQuery !== (searchField as any)
            ) {
                revalidate();
                setSearchField(searchFieldQuery as any);
            } else if (!searchFieldQuery) {
                router.push("/app/dashboard");
            }
        },
        [searchFieldQuery, coordinates]
    );

    function handleSendMessage() {
        createChat(
            {
                meta: { users: [contactedUser._id, user._id] },
                messages: [
                    {
                        text: contactUserMessageInput,
                        meta: { from: user._id },
                    } as any,
                ],
            },
            { duplicateFallback: true }
        )
            .then(function ({ data: chat }) {
                router.push(`/app/messaging`, {
                    query: { id: chat._id },
                });
            })
            .catch(console.error);
    }

    function handleCancelContact() {
        setContactedModalOpen(false);
        setContactedUser(null);
        setContactUserMessageInput("");
    }

    function handleContactUserModalOpen(user: IUser) {
        setContactedModalOpen(true);
        setContactedUser(user);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Search</title>
            </Head>
            <h4>search</h4>
            <Search
                searchField={searchField}
                searchData={searchData}
                onContactUser={handleContactUserModalOpen}
                shallow
            />
            <Modal open={contactedModalOpen}>
                <Input
                    id="message"
                    onChange={setContactUserMessageInput}
                    value={contactUserMessageInput}
                    type="text"
                    eventTargetValue
                />
                <button
                    onClick={handleSendMessage}
                    disabled={contactUserMessageInput.length === 0}
                >
                    SEND
                </button>
                <button onClick={handleCancelContact}>CANCEL</button>
            </Modal>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(withUserCoordinates(SearchAppPage));
