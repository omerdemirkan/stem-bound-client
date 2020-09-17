import { Card, CardProps, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    formCard: {
        width: "90%",
        maxWidth: "500px",
        margin: "5vh auto",
        padding: "30px",
    },
});

const FormCard: React.FC<CardProps> = ({ children, ...CardProps }) => {
    const classes = useStyles();
    return (
        <Card className={classes.formCard} {...CardProps}>
            {children}
        </Card>
    );
};

export default FormCard;
