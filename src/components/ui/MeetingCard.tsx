import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardProps,
    Divider,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useContext, useRef } from "react";
import { getMeetingDateDisplayData } from "../../utils/helpers";
import {
    IMeeting,
    IMeetingDateDisplayData,
    EMeetingTypes,
    ENotificationTypes,
} from "../../utils/types";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NotificationContext from "../contexts/NotificationContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
    card: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "15px 0",
    },

    cardContent: {
        paddingTop: "20px",
    },

    cardActions: {
        justifySelf: "end",
        paddingRight: "30px",
    },

    cardContentParagraph: {
        margin: "5px",
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

    const { createSnackbar } = useContext(NotificationContext);

    const classes = useStyles();

    const smallScreen = useMediaQuery("(max-width: 1200px)");

    return (
        <Card
            className={classes.card}
            style={smallScreen ? { flexDirection: "column" } : null}
            {...CardProps}
        >
            <CardHeader
                title={meetingDateDisplayData.dateString}
                subheader={`${meeting.displayType}, from ${meetingDateDisplayData.startTimeString} to ${meetingDateDisplayData.endTimeString}, ${meetingDateDisplayData.durationString}`}
            />
            <Divider orientation={smallScreen ? "horizontal" : "vertical"} />

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

            <CardActions className={classes.cardActions}>
                <div className="actions-wrapper">
                    <div className="action-buttons-box">
                        {meeting.type === EMeetingTypes.REMOTE ? (
                            <CopyToClipboard
                                text={meeting.url}
                                onCopy={() =>
                                    createSnackbar({
                                        text: "Meeting URL Copied to Clipboard",
                                        type: ENotificationTypes.SUCCESS,
                                    })
                                }
                            >
                                <IconButton>
                                    <FileCopyIcon />
                                </IconButton>
                            </CopyToClipboard>
                        ) : null}
                        {renderActions && renderActions()}
                    </div>
                    <Typography
                        paragraph
                        align="right"
                        className={classes.cardContentParagraph}
                    >
                        <strong>
                            {meeting.type === EMeetingTypes.IN_PERSON
                                ? `Room Number: ${meeting.roomNum}`
                                : meeting.url}
                        </strong>
                    </Typography>
                </div>
            </CardActions>

            <style jsx>{`
                .actions-wrapper {
                    display: flex;
                    flex-direction: column;
                }
                .action-buttons-box {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        </Card>
    );
};

export default MeetingCard;
