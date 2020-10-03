import {
    IMeetingOriginal,
    EMeetingTypes,
    IMeetingDateDisplayData,
    ENotificationTypes,
    IAlertData,
    IMeetingInput,
    IMeeting,
} from "../../utils/types";
import {
    clone,
    getMeetingDateDisplayData,
    getMeetingTypeDisplay,
} from "../../utils/helpers";
import { TimePicker } from "@material-ui/pickers";
import {
    CardActions,
    CardProps,
    IconButton,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import InputButton from "./InputButton";
import { useContext, useRef } from "react";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationContext from "../contexts/NotificationContext";
import MeetingCard from "./MeetingCard";

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

interface Props {
    meeting: IMeetingInput | IMeeting;
    courseTitle: string;
    schoolName: string;
    onChange: (meeting: IMeetingOriginal) => any;
    onDelete: (dateKey: string) => any;
    availableMeetingTypes?: EMeetingTypes[];
    CardProps?: CardProps;
    DeleteAlertData?: Partial<IAlertData>;
}

const MeetingInput: React.FC<Props> = ({
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

    let { current: meetingDateDisplayData } = useRef<IMeetingDateDisplayData>();

    const { createAlert } = useContext(NotificationContext);

    meetingDateDisplayData =
        meetingDateDisplayData || getMeetingDateDisplayData(meeting);

    const classes = useStyles();

    return (
        <MeetingCard
            CardProps={CardProps}
            meeting={meeting as any}
            schoolName={schoolName}
            courseTitle={courseTitle}
            renderActions={() => (
                <>
                    <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() =>
                            createAlert({
                                headerText:
                                    "Are you sure you want to delete this event?",
                                bodyText: `This will not delete an existing meeting, but will require you to go back to step 2 to create a meeting on ${meetingDateDisplayData.dateString}.`,
                                type: ENotificationTypes.DANGER,
                                onOk: () =>
                                    onDelete(
                                        (meeting as any).dateKey || meeting._id
                                    ),
                                onCancel: () => {},
                                ...DeleteAlertData,
                            })
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
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
                                        {meetingDateDisplayData.dateString}
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
                                                    {getMeetingTypeDisplay(
                                                        meetingType
                                                    )}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>

                                    {value.type === EMeetingTypes.IN_PERSON ? (
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
                </>
            )}
        />
    );
};

export default MeetingInput;
