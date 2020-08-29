import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import { userFetcher, createUserProfilePicture } from "../../utils/services";
import { useContext, useState } from "react";
import PictureInput from "../../components/ui/PictureInput";
import withAuth from "../../components/hoc/withAuth";

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser } = useContext(AuthContext);
    const { data: fetchedUser } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );
    const user = fetchedUser || storedUser;

    const [profilePictureRawImage, setProfilePictureRawImage] = useState<
        string | ArrayBuffer
    >();

    async function handleBlobCreated(blob: Blob) {
        const { data } = await createUserProfilePicture(user._id, blob);
        console.log(data);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <PictureInput
                onBlobCreated={handleBlobCreated}
                onRawImageCreated={setProfilePictureRawImage}
                baseFileName={`${user._id}-profile-picture`}
            />
            <img
                src="https://storage.googleapis.com/stem-bound-static/5f1205e56058912af89518fb-profile-picture.jpeg"
                alt="profile-pic"
            />
            {profilePictureRawImage && (
                <img src={profilePictureRawImage as string} alt="profile-pic" />
            )}
        </AppLayout>
    );
};

export default withAuth(MyAccountAppPage);
