import { useContext } from "react";
import { getDisplayMeetingType } from "../../utils/helpers";
import { IMeeting, EMeetingTypes } from "../../utils/types";
import NotificationContext from "../contexts/NotificationContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card, { CardProps } from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CopyToClipboard from "../util/CopyToClipboard";

const useStyles = makeStyles({
    card: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "10px 5px",
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

export interface IMeetingCardProps {
    meeting: IMeeting;
    courseTitle: string;
    schoolName: string;
    CardProps?: CardProps;
    renderActions?(meeting: IMeeting): any;
}

const MeetingCard: React.FC<IMeetingCardProps> = ({
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
                    meeting.displayType || getDisplayMeetingType(meeting.type)
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
                        description="Meeting URL"
                    />
                    // <CopyToClipboard
                    //     text={meeting.url}
                    //     onCopy={() =>
                    //         createSnackbar({
                    //             text: "Meeting URL Copied to Clipboard",
                    //             type: "success",
                    //         })
                    //     }
                    // >
                    //     <Typography
                    //         paragraph
                    //         className={classes.cardContentParagraph}
                    //         style={{ cursor: "pointer" }}
                    //     >
                    //         {meeting.url}
                    //     </Typography>
                    // </CopyToClipboard>
                )}
            </CardContent>

            <CardActions className={classes.cardActions}>
                {renderActions && renderActions(meeting)}
            </CardActions>
        </Card>
    );
};

export default MeetingCard;
