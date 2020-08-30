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

    const [profilePictureRawImage, setProfilePictureRawImage] = useState<
        string | ArrayBuffer
    >();

    async function handleFileCreated(file: File) {
        const { data } = await createUserProfilePicture(user._id, file);
        mutateFetchedUser(data);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <img
                src={user.profilePictureUrl || "/default-profile-picture.svg"}
                alt="profile-pic"
                id="profile-pic"
            />
            <PictureInput
                onFileCreated={handleFileCreated}
                onRawImageCreated={setProfilePictureRawImage}
                baseFileName={`${user._id}-profile-picture`}
                buttonText={`${
                    user.profilePictureUrl ? "Update" : "Add"
                } Profile Picture`}
            />

            <style jsx>{`
                #profile-pic {
                    width: 160px;
                    height: 160px;
                    border-radius: 80px;
                }
            `}</style>
        </AppLayout>
    );
};

export default withAuth(MyAccountAppPage);
