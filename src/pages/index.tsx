import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLocation, mapSchoolData } from "../utils/helpers";
import { fetchSchoolsByLocation } from "../utils/services";

const Home: React.FC = function () {
  const auth = useSelector((state: any) => state.auth.auth);

  const [schools, setSchools] = useState<any[]>([]);

  async function fetchSchools() {
    const { latitude, longitude } = await getLocation();
    const schools = await fetchSchoolsByLocation({
      latitude,
      longitude,
    });
    setSchools(mapSchoolData(schools));
  }

  return (
    <div>
      <h1>auth: {auth ? "authenticated" : "not authenticated"}</h1>
      <button onClick={() => fetchSchools()}>Get schools</button>
      {schools.map((school) => {
        return (
          <div>
            <pre>{JSON.stringify(school, null, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
