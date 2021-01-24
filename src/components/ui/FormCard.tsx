import Divider from "@material-ui/core/Divider";
import Card, { CardProps } from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";

const useStyles = makeStyles({
    formCard: {
        width: "100%",
        maxWidth: "500px",
        margin: "5vh auto",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

interface IFormCardProps extends CardProps {
    header?: string;
    headerEl?: any;
    subheader?: string;
    iconEl?: any;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const FormCard: React.FC<IFormCardProps> = ({
    children,
    header,
    headerEl,
    subheader,
    iconEl,
    Icon,
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
                            className={classes.header}
                            gutterBottom
                        >
                            {Icon ? (
                                <Icon
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                />
                            ) : (
                                iconEl
                            )}
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
