import { IAnnouncement } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import InputButton from "../util/InputButton";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import format from "date-fns/format";
import Button from "@material-ui/core/Button";
import AnnouncementIcon from "@material-ui/icons/Announcement";

export interface ICourseAnnouncementProps {
    announcement: IAnnouncement;
    onEditAnnouncement?: (
        announcementId: string,
        newAnnouncementText: string
    ) => any;
    onDeleteAnnouncement?: (announcementId: string) => any;
    noMargin?: boolean;
}

const CourseAnnouncement: React.FC<ICourseAnnouncementProps> = ({
    announcement,
    onDeleteAnnouncement,
    onEditAnnouncement,
    noMargin,
}) => {
    const { user } = useContext(AuthContext);
    const userIsAuthorizedToEdit = user._id === announcement.meta.from;

    return (
        <Alert
            severity="info"
            icon={<AnnouncementIcon />}
            style={{ margin: noMargin ? "0px" : "10px 0" }}
            action={
                <>
                    {userIsAuthorizedToEdit && onDeleteAnnouncement && (
                        <Button
                            onClick={() =>
                                onDeleteAnnouncement(announcement._id)
                            }
                            color="secondary"
                            variant="text"
                            style={{ float: "right" }}
                        >
                            DELETE
                        </Button>
                    )}
                    {userIsAuthorizedToEdit && onEditAnnouncement && (
                        <InputButton
                            onSubmit={(newAnnouncement) =>
                                onEditAnnouncement(
                                    announcement._id,
                                    newAnnouncement
                                )
                            }
                            initialValue={announcement.text}
                            renderInput={(value, setValue) => (
                                <TextField
                                    id="edit-announcement"
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    fullWidth
                                />
                            )}
                            ButtonProps={{
                                variant: "text",
                                color: "primary",
                            }}
                        >
                            EDIT
                        </InputButton>
                    )}
                </>
            }
        >
            <AlertTitle>
                Announcement -{" "}
                {announcement?.createdAt &&
                    format(
                        new Date(announcement.createdAt),
                        "EEEE, MMMM do yyyy"
                    )}
            </AlertTitle>
            {announcement.text}
        </Alert>
    );
};

export default CourseAnnouncement;
