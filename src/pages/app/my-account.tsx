import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import { userFetcher, createUserProfilePicture } from "../../utils/services";
import { useContext, useState } from "react";
import PictureInput from "../../components/ui/PictureInput";
import withAuth from "../../components/hoc/withAuth";
import { blobToFile } from "../../utils/helpers";

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

    async function handleFileCreated(file: File) {
        const res = await createUserProfilePicture(user._id, file);
        console.log(res);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <PictureInput
                onFileCreated={handleFileCreated}
                onRawImageCreated={setProfilePictureRawImage}
                baseFileName={`${user._id}-profile-picture`}
            />
            {profilePictureRawImage && (
                <img src={profilePictureRawImage as string} alt="profile-pic" />
            )}
        </AppLayout>
    );
};

export default withAuth(MyAccountAppPage);
