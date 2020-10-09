import { IAnnouncement } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import InputButton from "./InputButton";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { format } from "date-fns";

interface Props {
    announcement: IAnnouncement;
    onEditAnnouncement?: (
        announcementId: string,
        newAnnouncementText: string
    ) => any;
    onDeleteAnnouncement?: (announcementId: string) => any;
}

const CourseAnnouncement: React.FC<Props> = ({
    announcement,
    onDeleteAnnouncement,
    onEditAnnouncement,
}) => {
    const { user } = useContext(AuthContext);
    const userIsAuthorizedToEdit = user._id === announcement.meta.from;

    return (
        <Alert severity="info">
            <AlertTitle>
                Announcement -{" "}
                {announcement?.createdAt &&
                    format(
                        new Date(announcement.createdAt),
                        "EEEE, MMMM do yyyy"
                    )}
            </AlertTitle>
            {announcement.text}
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
                        <TextField
                            id="edit-announcement"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            multiline
                            fullWidth
                        />
                    )}
                >
                    EDIT
                </InputButton>
            )}
        </Alert>
    );
};

export default CourseAnnouncement;
