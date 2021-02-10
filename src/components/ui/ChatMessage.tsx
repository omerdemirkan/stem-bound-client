import { IChatMessage, IChatMessageEventHandlers } from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AuthContext from "../contexts/AuthContext";
import { memo, useContext, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuWrapper from "../util/MenuWrapper";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Tooltip from "@material-ui/core/Tooltip";

export interface IChatMessageProps extends IChatMessageEventHandlers {
    chatMessage: IChatMessage;
}

const ChatMessage: React.FC<IChatMessageProps> = ({
    chatMessage,
    onDeleteClicked,
    onRestoreClicked,
    onEdit,
}) => {
    const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(chatMessage.text);

    const { user } = useContext(AuthContext);
    const userIsSender = user._id === chatMessage.meta.from;

    if (chatMessage.isDeleted && !userIsSender)
        return (
            <div className="chat-message-root">
                <Typography color="textSecondary">
                    <Box
                        component="span"
                        fontSize="0.8rem"
                        color="primary"
                        style={{ opacity: "0.5" }}
                    >
                        DELETED
                    </Box>
                </Typography>
            </div>
        );

    if (isBeingEdited)
        return (
            <OutlinedInput
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                endAdornment={
                    <InputAdornment position="end" component="div">
                        <Tooltip
                            title="Cancel message edit"
                            onClick={() => setIsBeingEdited(false)}
                        >
                            <IconButton
                                size="small"
                                color="secondary"
                                style={{ marginRight: "10px" }}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit message">
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={function () {
                                    onEdit({ ...chatMessage, text: editValue });
                                    setIsBeingEdited(false);
                                }}
                            >
                                <CheckIcon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
                autoFocus
                type="text"
                fullWidth
            />
        );

    return (
        <div className="chat-message-root">
            <Typography color="textPrimary">
                {chatMessage.text}
                {chatMessage.isEdited &&
                !isBeingEdited &&
                !chatMessage.isDeleted ? (
                    <Box
                        component="span"
                        fontSize="0.7rem"
                        marginLeft="20px"
                        style={{ opacity: "0.5" }}
                    >
                        EDITED
                    </Box>
                ) : null}
                {chatMessage.isDeleted ? (
                    <Box
                        component="span"
                        fontSize="0.7rem"
                        marginLeft="20px"
                        color="primary"
                        style={{ opacity: "0.5" }}
                    >
                        DELETED - ONLY VISIBLE TO YOU
                    </Box>
                ) : null}
            </Typography>

            <span className="options-container">
                {userIsSender && (
                    <MenuWrapper
                        menuItems={[
                            {
                                display: "DELETE",
                                onClick: () => onDeleteClicked(chatMessage._id),
                                visible:
                                    onDeleteClicked && !chatMessage.isDeleted,
                            },
                            {
                                display: "EDIT",
                                onClick: () => setIsBeingEdited(true),
                                visible: onEdit && !chatMessage.isDeleted,
                            },
                            {
                                display: "RESTORE",
                                onClick: () =>
                                    onRestoreClicked(chatMessage._id),
                                visible:
                                    onRestoreClicked && chatMessage.isDeleted,
                            },
                        ]}
                    >
                        <IconButton
                            size="small"
                            color="primary"
                            aria-label="Message Actions"
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </MenuWrapper>
                )}
            </span>

            <style jsx>{`
                .chat-message-root {
                    display: grid;
                    grid-template-columns: auto 40px;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0);
                    transition: background-color 0.2s ease;
                    padding: 0 0 0 3px;
                    border-radius: 4px;
                }
                ${userIsSender
                    ? `
                    .chat-message-root:hover {
                        background-color: rgba(0, 0, 0, var(--shadow-opacity));
                    }
                    .chat-message-root:hover .options-container {
                        opacity: 1;
                    }
                `
                    : null}
                .options-container {
                    text-align: end;
                    opacity: 0.5;
                }
            `}</style>
        </div>
    );
};

export default memo(ChatMessage);
