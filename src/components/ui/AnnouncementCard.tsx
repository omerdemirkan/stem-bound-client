import { IAnnouncement } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import InputButton from "./InputButton";
import TextArea from "./TextArea";

interface Props {
    announcement: IAnnouncement;
    onEditAnnouncement?: (
        announcementId: string,
        newAnnouncementText: string
    ) => any;
    onDeleteAnnouncement?: (announcementId: string) => any;
}

const AnnouncementCard: React.FC<Props> = ({
    announcement,
    onDeleteAnnouncement,
    onEditAnnouncement,
}) => {
    const { user } = useContext(AuthContext);
    const userIsAuthorizedToEdit = user._id === announcement.meta.from;

    return (
        <div>
            {userIsAuthorizedToEdit && onDeleteAnnouncement && (
                <button onClick={() => onDeleteAnnouncement(announcement._id)}>
                    DELETE
                </button>
            )}
            {userIsAuthorizedToEdit && onEditAnnouncement && (
                <InputButton
                    onSubmit={(newAnnouncement) =>
                        onEditAnnouncement(announcement._id, newAnnouncement)
                    }
                    initialValue={announcement.text}
                    renderInput={(value, setValue) => (
                        <TextArea
                            id="edit-announcement"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    )}
                >
                    EDIT
                </InputButton>
            )}
            <pre>{JSON.stringify(announcement, null, 2)}</pre>
        </div>
    );
};

export default AnnouncementCard;
