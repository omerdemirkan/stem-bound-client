import Layout from "../components/Layout";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsAsync } from "../store/search";
import { getLocation } from "../utils/helpers";
import { ISchool } from "../utils/types";
import { useState } from "react";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const { schools, loading } = useSelector((state: any) => state.search);
    const [withSchoolOfficials, setWithSchoolOfficials] = useState<boolean>(
        false
    );

    async function fetchSchools() {
        const { latitude, longitude } = await getLocation();
        dispatch(
            fetchSchoolsAsync({ latitude, longitude, withSchoolOfficials })
        );
    }

    return (
        <Layout>
            <Head>
                <title>Stem-bound - Search</title>
            </Head>
            <h1>Search</h1>
            <button onClick={fetchSchools}>Find Schools</button>
            <h6>
                With SchoolOfficials
                <input
                    onClick={() => setWithSchoolOfficials((a) => !a)}
                    value={withSchoolOfficials ? 1 : 0}
                    type="checkbox"
                />
            </h6>
            {schools.map((school: ISchool) => (
                <div>
                    <p>{school.name}</p>
                    <p>{school.distance.miles} miles away</p>
                </div>
            ))}
        </Layout>
    );
};

export default Search;
