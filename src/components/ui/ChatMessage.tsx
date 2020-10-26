import { IChatMessage } from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AuthContext from "../contexts/AuthContext";
import { useContext, useRef, useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { messagesFetcher } from "../../utils/services";

interface Props {
    chatMessage: IChatMessage;
    onDeleteMessageClicked?: (messageId: string) => any;
    onEditMessageClicked?: (messageId: string) => any;
    onRestoreMessageClicked?: (messageId: string) => any;
    isBeingEdited?: boolean;
    editValue?: string;
}

const ChatMessage: React.FC<Props> = ({
    chatMessage,
    onDeleteMessageClicked,
    onEditMessageClicked,
    onRestoreMessageClicked,
    isBeingEdited,
    editValue,
}) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const menuIconButtonRef = useRef();
    const { user } = useContext(AuthContext);
    const userIsSender = user._id === chatMessage.meta.from;
    return (
        <div
            className={`chat-message-root ${
                isBeingEdited ? "being-edited" : ""
            }`}
        >
            <Typography>
                {editValue || chatMessage.text}
                {chatMessage.createdAt !== chatMessage.updatedAt &&
                !isBeingEdited ? (
                    <Box
                        component="span"
                        fontSize="0.7rem"
                        marginLeft="20px"
                        style={{ opacity: "0.5" }}
                    >
                        EDITED
                    </Box>
                ) : null}
                {isBeingEdited ? (
                    <Box
                        component="span"
                        fontSize="0.7rem"
                        marginLeft="20px"
                        color="primary"
                        style={{ opacity: "0.5" }}
                    >
                        BEING EDITED
                    </Box>
                ) : null}
            </Typography>

            <span className="options-container">
                {userIsSender &&
                    (onDeleteMessageClicked || onEditMessageClicked) && (
                        <>
                            <IconButton
                                size="small"
                                className="dropdown-icon-button"
                                color="primary"
                                ref={menuIconButtonRef}
                                onClick={toggleMenu}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                            <Menu
                                open={menuOpen}
                                anchorEl={menuIconButtonRef.current}
                                onClose={toggleMenu}
                            >
                                {onDeleteMessageClicked &&
                                    !chatMessage.isDeleted && (
                                        <MenuItem
                                            onClick={() => {
                                                onDeleteMessageClicked(
                                                    chatMessage._id
                                                );
                                                toggleMenu();
                                            }}
                                        >
                                            DELETE
                                        </MenuItem>
                                    )}
                                {onEditMessageClicked &&
                                    !chatMessage.isDeleted && (
                                        <MenuItem
                                            onClick={() => {
                                                onEditMessageClicked(
                                                    chatMessage._id
                                                );
                                                toggleMenu();
                                            }}
                                        >
                                            EDIT
                                        </MenuItem>
                                    )}
                                {onRestoreMessageClicked &&
                                    chatMessage.isDeleted && (
                                        <MenuItem
                                            onClick={() => {
                                                onRestoreMessageClicked(
                                                    chatMessage._id
                                                );
                                                toggleMenu();
                                            }}
                                        >
                                            RESTORE
                                        </MenuItem>
                                    )}
                            </Menu>
                        </>
                    )}
            </span>

            <style jsx>{`
                .chat-message-root {
                    display: grid;
                    grid-template-columns: auto 30px;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0);
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                    transition: background-color 0.2s ease;
                    padding: 0 0 0 3px;
                }
                .options-container {
                }
                .being-edited {
                    border: var(--accent-light) 2px solid;
                }
                .dropdown-icon-button {
                    opacity: 0;
                    transition: opacity 0.1s ease;
                }
                .chat-message-root:hover {
                    background-color: rgba(0, 0, 0, var(--shadow-opacity));
                }
                .chat-message-root:hover .dropdown-icon-button {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default ChatMessage;
