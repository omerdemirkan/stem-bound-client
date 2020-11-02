import Divider from "@material-ui/core/Divider";
import Card, { CardProps } from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    formCard: {
        width: "100%",
        maxWidth: "500px",
        margin: "5vh auto",
    },
});

type Props = CardProps & {
    header?: string;
    headerEl?: any;
    subheader?: string;
    iconEl?: any;
};

const FormCard: React.FC<Props> = ({
    children,
    header,
    headerEl,
    subheader,
    iconEl,
    ...CardProps
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.formCard} {...CardProps}>
            {header && (
                <>
                    <CardContent>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            {iconEl}
                            {header}
                        </Typography>
                        <Typography
                            paragraph
                            color="textSecondary"
                            align="center"
                        >
                            {subheader}
                        </Typography>
                        {headerEl}
                    </CardContent>
                    <Divider />
                </>
            )}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default FormCard;
