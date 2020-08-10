import { IAnnouncement, EUserRoles } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import withAuth from "../hoc/withAuth";

interface Props {
    announcement: IAnnouncement;
    onDeleteButtonClicked?: (announcementId: string) => any;
    onEditButtonClicked?: (announcementId: string) => any;
}

const AnnouncementCard: React.FC<Props> = ({
    announcement,
    onDeleteButtonClicked,
    onEditButtonClicked,
}) => {
    const { user } = useContext(AuthContext);
    const userIsAuthorizedToEdit = user._id === announcement.meta.from;

    return (
        <div>
            {userIsAuthorizedToEdit && onDeleteButtonClicked ? (
                <button onClick={() => onDeleteButtonClicked(announcement._id)}>
                    DELETE
                </button>
            ) : null}
            {userIsAuthorizedToEdit && onEditButtonClicked ? (
                <button onClick={() => onEditButtonClicked(announcement._id)}>
                    EDIT
                </button>
            ) : null}
            <pre>{JSON.stringify(announcement, null, 2)}</pre>
        </div>
    );
};

export default AnnouncementCard;
