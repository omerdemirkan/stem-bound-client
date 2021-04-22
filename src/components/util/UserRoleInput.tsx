import InstructorSVG from "../svg/illustrations/instructor";
import StudentSVG from "../svg/illustrations/student";
import SchoolSVG from "../svg/illustrations/school";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { EUserRoles } from "../../utils/types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        height: "100%",
    },
    cardActionArea: {
        height: "100%",
        padding: "40px 0 60px",
    },
});

export interface IUserRoleInputProps {
    onChange(userRole: EUserRoles): any;
}

const UserRoleInput: React.FC<IUserRoleInputProps> = ({ onChange }) => {
    const classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            alignContent="center"
            alignItems="stretch"
            wrap="wrap"
            style={{
                width: "90%",
                maxWidth: "1300px",
                margin: "auto",
                textAlign: "center",
            }}
            spacing={3}
        >
            <Grid item xs={12} md={6} lg={4}>
                <Card
                    className={classes.card}
                    onClick={() => onChange(EUserRoles.INSTRUCTOR)}
                >
                    <CardActionArea className={classes.cardActionArea}>
                        <Typography variant="h5" gutterBottom>
                            I'm an Instructor
                        </Typography>
                        <InstructorSVG />
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Card
                    className={classes.card}
                    onClick={() => onChange(EUserRoles.SCHOOL_OFFICIAL)}
                >
                    <CardActionArea className={classes.cardActionArea}>
                        <Typography variant="h5" gutterBottom>
                            I'm a School Official
                        </Typography>
                        <SchoolSVG />
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Card
                    className={classes.card}
                    onClick={() => onChange(EUserRoles.STUDENT)}
                >
                    <CardActionArea className={classes.cardActionArea}>
                        <Typography variant="h5" gutterBottom>
                            I'm a Student
                        </Typography>
                        <StudentSVG />
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserRoleInput;
