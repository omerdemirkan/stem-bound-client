import Card, { CardProps } from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    formCard: {
        width: "90%",
        maxWidth: "500px",
        margin: "5vh auto",
    },
});

type Props = CardProps & {
    header?: any;
};

const FormCard: React.FC<Props> = ({ children, header, ...CardProps }) => {
    const classes = useStyles();
    return (
        <Card className={classes.formCard} {...CardProps}>
            {header}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default FormCard;
