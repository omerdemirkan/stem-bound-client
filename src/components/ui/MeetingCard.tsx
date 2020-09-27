import {
    Card,
    CardContent,
    CardHeader,
    CardProps,
    Divider,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useRef } from "react";
import { getMeetingDateDisplayData } from "../../utils/helpers";
import {
    IMeeting,
    IMeetingDateDisplayData,
    EMeetingTypes,
} from "../../utils/types";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles({
    card: {
        width: "10000px",
        maxWidth: "100%",
        display: "grid",
        margin: "20px 0",
        gridTemplateColumns: "400px 5px auto auto",
    },

    cardContent: {
        paddingTop: "20px",
    },

    cardContentParagraph: {
        margin: "5px",
    },

    copyIconButton: {
        marginLeft: "30px",
    },
});

interface Props {
    meeting: IMeeting;
    courseTitle: string;
    schoolName: string;
    CardProps?: CardProps;
    renderActions?(): any;
}

const MeetingCard: React.FC<Props> = ({
    meeting,
    schoolName,
    courseTitle,
    renderActions,
    CardProps,
}) => {
    let { current: meetingDateDisplayData } = useRef<IMeetingDateDisplayData>();

    meetingDateDisplayData =
        meetingDateDisplayData || getMeetingDateDisplayData(meeting);

    const classes = useStyles();
    return (
        <Card className={classes.card} {...CardProps}>
            <CardHeader
                title={meetingDateDisplayData.dateString}
                subheader={`${meeting.displayType}, from ${meetingDateDisplayData.startTimeString} to ${meetingDateDisplayData.endTimeString}, ${meetingDateDisplayData.durationString}`}
            />
            <Divider orientation="vertical" />

            <CardContent className={classes.cardContent}>
                <Typography
                    paragraph
                    color="textSecondary"
                    className={classes.cardContentParagraph}
                >
                    {schoolName} / {courseTitle}
                </Typography>
                <Typography paragraph className={classes.cardContentParagraph}>
                    Message:{" "}
                    {meeting.message || (
                        <span style={{ opacity: "0.8" }}>No Message</span>
                    )}
                </Typography>
            </CardContent>

            <CardContent className={classes.cardContent}>
                <div className="actions-wrapper">
                    {meeting.type === EMeetingTypes.IN_PERSON ? (
                        <Typography
                            paragraph
                            align="right"
                            className={classes.cardContentParagraph}
                        >
                            Room Number: {meeting.roomNum}
                        </Typography>
                    ) : (
                        <Typography
                            paragraph
                            align="right"
                            className={classes.cardContentParagraph}
                            style={{ cursor: "pointer" }}
                        >
                            <strong>{meeting.url}</strong>
                        </Typography>
                    )}
                    <IconButton className={classes.copyIconButton}>
                        <FileCopyIcon />
                    </IconButton>
                    {renderActions && renderActions()}
                </div>
            </CardContent>

            <style jsx>{`
                .actions-wrapper {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                }
            `}</style>
        </Card>
    );
};

export default MeetingCard;
