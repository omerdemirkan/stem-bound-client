import { useContext } from "react";
import { getMeetingTypeDisplay } from "../../utils/helpers";
import { IMeeting, EMeetingTypes, ENotificationTypes } from "../../utils/types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NotificationContext from "../contexts/NotificationContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card, { CardProps } from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
                title={meeting.dateString}
                subheader={`${
                    meeting.displayType || getMeetingTypeDisplay(meeting.type)
                }, from ${meeting.startTimeString} to ${
                    meeting.endTimeString
                }, ${meeting.durationString}`}
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
                {meeting.type === EMeetingTypes.IN_PERSON ? (
                    <Typography
                        paragraph
                        className={classes.cardContentParagraph}
                    >
                        Room {meeting.roomNum}
                    </Typography>
                ) : (
                    <CopyToClipboard
                        text={meeting.url}
                        onCopy={() =>
                            createSnackbar({
                                text: "Meeting URL Copied to Clipboard",
                                type: "success",
                            })
                        }
                    >
                        <Typography
                            paragraph
                            className={classes.cardContentParagraph}
                            style={{ cursor: "pointer" }}
                        >
                            {meeting.url}
                        </Typography>
                    </CopyToClipboard>
                )}
            </CardContent>

            <CardActions className={classes.cardActions}>
                {renderActions && renderActions()}
            </CardActions>
        </Card>
    );
};

export default MeetingCard;
