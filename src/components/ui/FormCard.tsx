import {
    Card,
    CardContent,
    CardHeader,
    CardProps,
    makeStyles,
} from "@material-ui/core";

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
