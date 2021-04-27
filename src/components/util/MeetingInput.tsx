import {
    IMeetingOriginal,
    EMeetingTypes,
    ENotificationTypes,
    IAlertData,
    IMeeting,
} from "../../utils/types";
import { clone, getDisplayMeetingType } from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import InputButton from "./InputButton";
import { useContext } from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationContext from "../contexts/NotificationContext";
import MeetingCard from "../ui/MeetingCard";
import { CardProps } from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import MeetingForm from "../forms/MeetingForm";
import ScreenLayout from "../layouts/ScreenLayout";

const useStyles = makeStyles({
    card: {
        width: "10000px",
        maxWidth: "100%",
    },
    halfWidth: {
        width: "50%",
    },
    select: {
        margin: "15px 0 10px",
    },
    cardAction: {
        display: "flex",
        justifyContent: "end",
    },
});

export interface IMeetingInputProps {
    meeting: IMeeting;
    courseTitle: string;
    schoolName: string;
    onChange: (meeting: IMeetingOriginal) => any;
    onDelete: (dateKey: string) => any;
    availableMeetingTypes?: EMeetingTypes[];
    CardProps?: CardProps;
    DeleteAlertData?: Partial<IAlertData>;
}

const MeetingInput: React.FC<IMeetingInputProps> = ({
    meeting,
    courseTitle,
    schoolName,
    onChange,
    onDelete,
    availableMeetingTypes,
    CardProps,
    DeleteAlertData,
}) => {
    availableMeetingTypes =
        availableMeetingTypes || Object.values(EMeetingTypes);

    const { createAlert, createScreen } = useContext(NotificationContext);

    const classes = useStyles();

    return (
        <MeetingCard
            CardProps={CardProps}
            meeting={meeting as any}
            schoolName={schoolName}
            courseTitle={courseTitle}
            renderActions={() => (
                <>
                    <Tooltip title="Delete Meeting">
                        <IconButton
                            aria-label="delete"
                            color="secondary"
                            onClick={() =>
                                createAlert({
                                    headerText:
                                        "Are you sure you want to delete this event?",
                                    bodyText: `This will not delete an existing meeting, but will require you to go back to step 2 to create a meeting on ${meeting.dateString}.`,
                                    type: ENotificationTypes.DANGER,
                                    onOk: () =>
                                        onDelete(
                                            (meeting as any).dateKey ||
                                                meeting._id
                                        ),
                                    onCancel: () => {},
                                    ...DeleteAlertData,
                                })
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Meeting">
                        <IconButton
                            aria-label="edit"
                            color="primary"
                            onClick={() =>
                                createScreen({
                                    renderContent: (screenProps) => (
                                        <ScreenLayout
                                            header={meeting.dateString}
                                            {...screenProps}
                                        >
                                            <MeetingForm
                                                onSubmit={function (values) {
                                                    screenProps.onClose();
                                                    onChange({
                                                        ...meeting,
                                                        ...values,
                                                    });
                                                }}
                                                defaultValues={meeting}
                                            />
                                        </ScreenLayout>
                                    ),
                                    DialogProps: { maxWidth: "sm" },
                                })
                            }
                        >
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        />
    );
};

export default MeetingInput;
