import Layout from "../components/ui/Layout";
import Head from "next/head";
import classes from "../styles/modules/search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolsAsync } from "../store/search";
import { getCurrentLocation } from "../utils/helpers";
import { ISchool } from "../utils/types";
import { useState } from "react";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const { schools, loading } = useSelector((state: any) => state.search);
    const [withSchoolOfficials, setWithSchoolOfficials] = useState<boolean>(
        false
    );

    async function fetchSchools() {
        const { latitude, longitude } = await getCurrentLocation();
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
            {loading ? <h1>Loading...</h1> : null}
            {schools.map((school: ISchool) => (
                <div>
                    <p>{school.name}</p>
                    <p>{school.distance.miles} miles away</p>
                    <p>_id: {school._id}</p>
                </div>
            ))}
            <style jsx>{``}</style>
        </Layout>
    );
};

export default Search;
