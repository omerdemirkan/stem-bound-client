import { schoolFetcher } from "../utils/services";
import { ISchool } from "../utils/types";
import { useFetchOnce } from "./useFetchOnce";

export default function useSchool(
    ncesId: string
): { school: ISchool; loading: boolean } {
    const { data: school, isValidating: loading } = useFetchOnce(
        ncesId ? `/school/${ncesId}` : null,
        schoolFetcher(ncesId)
    );
    return { school, loading };
}
