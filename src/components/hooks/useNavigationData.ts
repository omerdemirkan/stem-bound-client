import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getNavigationDataByUserRole } from "../../utils/helpers";
import { INavigationData, IUser } from "../../utils/types";

export default function useNavigationData(): INavigationData {
    const user: IUser = useSelector((state: any) => state.auth.user);
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
