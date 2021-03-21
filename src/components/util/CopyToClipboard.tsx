import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

export interface ICopyToClipboardProps {
    text: string;
    description: string;
    onCopy?(): any;
    variant?: "default" | "outlined";
}

const CopyToClipboard: React.FC<ICopyToClipboardProps> = ({
    text,
    description,
    onCopy,
    variant = "default",
}) => {
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

    return (
        <div className="container">
            <Typography component="span" noWrap style={{ maxWidth: "400px" }}>
                {text}
            </Typography>
            <span>
                <Tooltip title={`Copy ${description}`}>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={handleCopyToClipboard}
                    >
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
            </span>

            <style jsx>{`
                .container {
                    background-color: var(--background-light);
                    border-radius: 4px;
                    padding: 3px 8px;
                    width: 100%;
                    max-width: 450px;
                    border: ${variant === "outlined"
                        ? "1px solid var(--accent-light)"
                        : "none"};

                    display: grid;
                    grid-template-columns: auto 30px;
                    grid-gap: 10px;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default CopyToClipboard;
