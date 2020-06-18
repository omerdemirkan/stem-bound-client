

export async function fetchSchools({ latitude, longitude }: {
    latitude: number,
    longitude: number
}) {

    const res = fetch(`http://localhost:8080/api/school?long=${longitude}&lat=${latitude}`)
    return await res.then(res => res.json())
}