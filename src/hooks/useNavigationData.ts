import { useState, useEffect, useContext } from "react";
import { getNavigationDataByUserRole } from "../utils/helpers";
import { INavigationData } from "../utils/types";
import AuthContext from "../components/contexts/AuthContext";

export default function useNavigationData(): INavigationData {
    const { user } = useContext(AuthContext);
    const [
        navigationData,
        setNavigationData,
    ] = useState<INavigationData | null>(
        user && user.role ? getNavigationDataByUserRole(user.role) : null
    );
    useEffect(
        function () {
            if (user && !navigationData) {
                setNavigationData(getNavigationDataByUserRole(user.role));
            }
        },
        [user]
    );
    return navigationData;
}
