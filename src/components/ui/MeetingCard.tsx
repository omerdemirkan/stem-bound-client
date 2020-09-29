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
        width: "10000px",
        maxWidth: "100%",
        display: "grid",
        margin: "20px 0",
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

    const { createSnackbar } = useContext(NotificationContext);

    const classes = useStyles();

    const smallScreen = useMediaQuery("(max-width: 1100px)");

    return (
        <Card
            className={classes.card}
            style={
                smallScreen
                    ? { gridTemplateColumns: "100%" }
                    : {
                          gridTemplateColumns: "400px 5px auto auto",
                      }
            }
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
                    {meeting.type === EMeetingTypes.IN_PERSON ? (
                        <Typography
                            paragraph
                            align="right"
                            className={classes.cardContentParagraph}
                        >
                            Room Number: {meeting.roomNum}
                        </Typography>
                    ) : (
                        <>
                            <Typography
                                paragraph
                                align="right"
                                className={classes.cardContentParagraph}
                                style={{ cursor: "pointer" }}
                            >
                                <strong>{meeting.url}</strong>
                            </Typography>
                            <CopyToClipboard
                                text={meeting.url}
                                onCopy={() =>
                                    createSnackbar({
                                        text: "Meeting URL Copied to Clipboard",
                                        type: ENotificationTypes.SUCCESS,
                                    })
                                }
                            >
                                <IconButton className={classes.copyIconButton}>
                                    <FileCopyIcon />
                                </IconButton>
                            </CopyToClipboard>
                        </>
                    )}

                    {renderActions && renderActions()}
                </div>
            </CardActions>

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
