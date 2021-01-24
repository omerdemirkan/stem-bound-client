import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IMeeting } from "../../utils/types";
import { getMeetingTypeDisplay } from "../../utils/helpers";

export interface IMeetingsTableProps {
    meetings: IMeeting[];
}

const MeetingsTable: React.FC<IMeetingsTableProps> = ({ meetings }) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow style={{ width: "100%" }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Room Number</TableCell>
                        <TableCell>Meeting URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meetings?.map((meeting) => (
                        <TableRow>
                            <TableCell>{meeting.dateString}</TableCell>
                            <TableCell>
                                {meeting.startTimeString} to{" "}
                                {meeting.endTimeString},{" "}
                                {meeting.durationString}
                            </TableCell>
                            <TableCell>
                                {meeting.displayType ||
                                    getMeetingTypeDisplay(meeting.type)}
                            </TableCell>
                            <TableCell>
                                {meeting.roomNum
                                    ? `Room ${meeting.roomNum}`
                                    : "N/A"}
                            </TableCell>
                            <TableCell>{meeting.url || "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </div>
    );
};

export default MeetingsTable;
