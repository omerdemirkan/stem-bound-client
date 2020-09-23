import {
    Card,
    CardContent,
    CardHeader,
    CardProps,
    Divider,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useContext, useRef } from "react";
import { getMeetingDateDisplayData } from "../../utils/helpers";
import NotificationContext from "../contexts/NotificationContext";
import {
    IMeeting,
    IMeetingDateDisplayData,
    EMeetingTypes,
} from "../../utils/types";

const useStyles = makeStyles({
    card: {
        width: "10000px",
        maxWidth: "100%",
    },
});

interface Props {
    meeting: IMeeting;
    CardProps?: CardProps;
    renderFooter?(): any;
}

const MeetingCard: React.FC<Props> = ({ meeting, renderFooter, CardProps }) => {
    let { current: meetingDateDisplayData } = useRef<IMeetingDateDisplayData>();

    const { createAlert } = useContext(NotificationContext);

    meetingDateDisplayData =
        meetingDateDisplayData || getMeetingDateDisplayData(meeting);

    const classes = useStyles();
    return (
        <Card className={classes.card} {...CardProps}>
            <CardHeader
                title={meetingDateDisplayData.dateString}
                subheader={`From ${meetingDateDisplayData.startTimeString} to ${meetingDateDisplayData.endTimeString}`}
            />

            <Divider />

            <CardContent>
                {meeting.type === EMeetingTypes.IN_PERSON ? (
                    <Typography paragraph>
                        An in-person meeting lasting{" "}
                        {meetingDateDisplayData.durationString} in room{" "}
                        <strong>{meeting.roomNum}</strong>.
                    </Typography>
                ) : (
                    <Typography paragraph>
                        A remote meeting lasting{" "}
                        {meetingDateDisplayData.durationString}. Url:{" "}
                        <strong>{meeting.url}</strong>.
                    </Typography>
                )}
                <Typography paragraph>
                    Message: {meeting.message || "no message"}
                </Typography>
            </CardContent>

            {renderFooter()}

            <style jsx>{`
        .
    `}</style>
        </Card>
    );
};

export default MeetingCard;
