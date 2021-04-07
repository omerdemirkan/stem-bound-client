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
import { makeStyles, Tooltip } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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

    const { createAlert } = useContext(NotificationContext);

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
                        <InputButton
                            onSubmit={onChange}
                            initialValue={clone(meeting)}
                            renderButton={(props) => (
                                <IconButton
                                    aria-label="edit"
                                    color="primary"
                                    {...props}
                                >
                                    <CreateIcon />
                                </IconButton>
                            )}
                            renderInput={function (
                                value,
                                setValue,
                                { updateFields, handleChange }
                            ) {
                                return (
                                    <>
                                        <Typography variant="h5" align="center">
                                            {meeting.dateString}
                                        </Typography>
                                        <TimePicker
                                            onChange={(date) =>
                                                updateFields({ start: date })
                                            }
                                            name="start"
                                            label="Start"
                                            value={value.start}
                                            className={classes.halfWidth}
                                            margin="normal"
                                        />
                                        <TimePicker
                                            onChange={(date) =>
                                                updateFields({ end: date })
                                            }
                                            name="end"
                                            label="End"
                                            value={value.end}
                                            className={classes.halfWidth}
                                            margin="normal"
                                        />

                                        <Select
                                            onChange={handleChange}
                                            name="type"
                                            defaultValue={value.type}
                                            fullWidth
                                            className={classes.select}
                                        >
                                            {availableMeetingTypes.map(
                                                (meetingType) => (
                                                    <MenuItem
                                                        value={meetingType}
                                                        key={meetingType}
                                                    >
                                                        {getDisplayMeetingType(
                                                            meetingType
                                                        )}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>

                                        {value.type ===
                                        EMeetingTypes.IN_PERSON ? (
                                            <TextField
                                                onChange={handleChange}
                                                value={value.roomNum || ""}
                                                name="roomNum"
                                                label="Room"
                                                margin="normal"
                                                fullWidth
                                            />
                                        ) : (
                                            <TextField
                                                onChange={handleChange}
                                                value={value.url || ""}
                                                name="url"
                                                label="Meeting Url"
                                                margin="normal"
                                                fullWidth
                                            />
                                        )}

                                        <TextField
                                            onChange={handleChange}
                                            name="message"
                                            value={value.message}
                                            label="Message"
                                            margin="normal"
                                            fullWidth
                                            multiline
                                        />
                                    </>
                                );
                            }}
                        >
                            Edit Meeting
                        </InputButton>
                    </Tooltip>
                </>
            )}
        />
    );
};

export default MeetingInput;
