import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import { userFetcher } from "../../utils/services";
import { useContext, useState } from "react";
import PictureInput from "../../components/ui/PictureInput";

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser } = useContext(AuthContext);
    const { data: fetchedUser } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );
    const user = fetchedUser || storedUser;

    const [rawImage, setRawImage] = useState<string | ArrayBuffer>();

    function handleImageCropped(rawImage: string | ArrayBuffer) {
        setRawImage(rawImage);
    }

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <PictureInput onImageCropped={handleImageCropped} />
            <img src={rawImage as string} alt="profile-pic" />
        </AppLayout>
    );
};

export default MyAccountAppPage;
