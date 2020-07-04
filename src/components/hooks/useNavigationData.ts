import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getNavigationDataByUserRole } from "../../utils/helpers/navigation.helpers";
import { INavigationData, IUser } from "../../utils/types";

export default function useNavigationData() {
    const user: IUser = useSelector((state: any) => state.auth.user);
    const [navigationData, setNavigationData] = useState<INavigationData>(
        getNavigationDataByUserRole(user.role)
    );
    useEffect(
        function () {
            setNavigationData(getNavigationDataByUserRole(user.role));
        },
        [user.role]
    );
    return navigationData;
}
