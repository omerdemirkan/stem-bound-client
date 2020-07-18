import AppLayout from "../../components/ui/AppLayout";
import withAuth from "../../components/hoc/withAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCoursesAsync } from "../../store/course";
import { IUser } from "../../utils/types";

const CoursesAppPage: React.FC = () => {
    const dispatch = useDispatch();
    const { user, loading }: { user: IUser; loading: boolean } = useSelector(
        (state: any) => state.auth
    );
    useEffect(
        function () {
            if (user?._id) {
                dispatch(fetchUserCoursesAsync(user._id));
            }
        },
        [user?._id]
    );
    return (
        <AppLayout>
            <h4>courses</h4>
            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);
