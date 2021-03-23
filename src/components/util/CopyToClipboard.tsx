import Tooltip from "@material-ui/core/Tooltip";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

export interface ICopyToClipboardProps {
    text: string;
    description: string;
    onCopy?(): any;
}

const useStyles = makeStyles({
    paper: {
        boxShadow: "none",
        padding: "3px 3px 3px 8px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        maxWidth: "450px",
    },
    text: {
        marginRight: "15px",
    },
});

const CopyToClipboard: React.FC<ICopyToClipboardProps> = ({
    text,
    description,
    onCopy,
}) => {
    const classes = useStyles();
    const { createSnackbar } = useContext(NotificationContext);
    async function handleCopyToClipboard() {
        try {
            await navigator.clipboard.writeText(text);
            createSnackbar({
                text: `${description} copied to clipboard`,
                type: "info",
            });
            onCopy?.();
        } catch (e) {
            createSnackbar({
                text: "Couldn't copy to clipboard",
                type: "error",
            });
        }
    }

    const isEmpty = text == null;

    return (
        <Paper className={classes.paper}>
            <Typography
                component="span"
                noWrap
                className={classes.text}
                color={isEmpty ? "textSecondary" : "textPrimary"}
            >
                {!isEmpty ? text : `No ${description}`}
            </Typography>
            <span>
                <Tooltip title={`Copy ${description}`}>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={handleCopyToClipboard}
                        disabled={isEmpty}
                    >
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
            </span>
        </Paper>
    );
};

export default CopyToClipboard;
