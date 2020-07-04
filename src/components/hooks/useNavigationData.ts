import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getNavigationDataByUserRole } from "../../utils/helpers/navigation.helpers";
import { INavigationData, IUser, EUserRoles } from "../../utils/types";

export default function useNavigationData(): INavigationData {
    const user: IUser = useSelector((state: any) => state.auth.user);
    const [
        navigationData,
        setNavigationData,
    ] = useState<INavigationData | null>(null);
    useEffect(
        function () {
            if (user && user.role) {
                setNavigationData(getNavigationDataByUserRole(user.role));
            }
        },
        [user]
    );
    return (
        navigationData || {
            buttons: [],
            userRole: EUserRoles.GUEST,
        }
    );
}
