import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getLocation } from '../utils/helpers/geolocation.helpers';

const Home: React.FC = function() {

  async function fetchSchools() {
    const { latitude, longitude } = await getLocation();
    const schools = await fetch(`http://localhost:8080/api/school?long=${longitude}&lat=${latitude}`).then(res => res.json());
    console.log(schools);
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return <div>Initial commit</div>
}

export default Home;
