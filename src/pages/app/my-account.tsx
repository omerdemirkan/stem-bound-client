import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import PictureInput from "../../components/ui/PictureInput";
import withAuth from "../../components/hoc/withAuth";
import { userFetcher, createUserProfilePicture } from "../../utils/services";
import { useContext, useState, useEffect } from "react";

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser, mutateUser: mutateAuthContextUser } = useContext(
        AuthContext
    );
    const { data: fetchedUser, mutate: mutateFetchedUser } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );
    const user = fetchedUser || storedUser;

    // Because this route has update user functionality,
    // this is to mutate the auth context user
    useEffect(
        function () {
            if (fetchedUser) {
                mutateAuthContextUser(fetchedUser);
            }
        },
        [fetchedUser]
    );

    async function handleFileCreated(file: File) {
        const { data } = await createUserProfilePicture(user._id, file);
        mutateFetchedUser(data, false);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <br />
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <h6>{user.shortDescription}</h6>
            <p>
                {user.longDescription || <button>ADD LONG DESCRIPTION</button>}
            </p>
            <img
                src={user.profilePictureUrl || "/default-profile-picture.svg"}
                alt="profile-pic"
                id="profile-pic"
                className="profile-picture large"
            />
            <PictureInput
                onFileCreated={handleFileCreated}
                baseFileName={`${user._id}-profile-picture`}
                buttonText={`${
                    user.profilePictureUrl ? "Update" : "Add"
                } Profile Picture`}
            />
        </AppLayout>
    );
};

export default withAuth(MyAccountAppPage);
