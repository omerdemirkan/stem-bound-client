import Tooltip from "@material-ui/core/Tooltip";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
    paper: {
        boxShadow: "none",
        padding: "3px 3px 3px 8px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        width: "550px",
        maxWidth: "100%",
    },
    text: {
        marginRight: "15px",
        flexGrow: 1,
    },
    divider: {
        margin: "0 10px",
    },
});

export interface ICopyToClipboardProps {
    text: string;
    description: string;
    onCopy?(): any;
    prepend?: any;
    fullWidth?: boolean;
}

const CopyToClipboard: React.FC<ICopyToClipboardProps> = ({
    text,
    description,
    onCopy,
    prepend,
    fullWidth,
}) => {
    const classes = useStyles();
    const { createSnackbar } = useContext(NotificationContext);
    async function handleCopyToClipboard() {
        try {
            await navigator.clipboard.writeText(text);
            createSnackbar({
                text: `${description} copied to clipboard`,
                type: "success",
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
        <Paper
            className={classes.paper}
            style={fullWidth ? { width: "100%" } : null}
        >
            {prepend && (
                <>
                    <span>{prepend}</span>
                    <Divider
                        orientation="vertical"
                        flexItem
                        className={classes.divider}
                    />
                </>
            )}
            <Typography
                component="span"
                noWrap
                className={classes.text}
                color={isEmpty ? "textSecondary" : "textPrimary"}
            >
                {!isEmpty ? text : `No ${description}`}
            </Typography>
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
        </Paper>
    );
};

export default CopyToClipboard;
