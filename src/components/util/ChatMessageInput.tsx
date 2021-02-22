import { useEffect, useState } from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { getChatsCache, setChatsCache } from "../../utils/helpers";
import useCalculateOnce from "../../hooks/useCalculateOnce";
import useDebounce from "../../hooks/useDebounce";
import useMessaging from "../../hooks/useMessaging";

export type IChatMessageInput = TextFieldProps & {
    initialValue?: string;
    chatId: string;
    chatName: string;
    onSendMessage(value: string): any;
};

export const ChatMessageInput: React.FC<IChatMessageInput> = ({
    initialValue,
    chatId,
    onSendMessage,
    chatName,
    ...textFieldProps
}) => {
    const chatsCache = useCalculateOnce(getChatsCache);
    const [textField, setTextField] = useState<string>(
        chatsCache[chatId]?.textField || ""
    );
    const { setUserIsTyping } = useMessaging();

    const debouncedTextField = useDebounce(textField, 3000);

    const userIsTyping = textField && debouncedTextField !== textField;

    useEffect(function () {
        // updates chats cache on unmount
        return () => setChatsCache(chatsCache);
    }, []);

    useEffect(
        function () {
            setTextField(chatsCache[chatId]?.textField || "");
        },
        [chatId]
    );

    useEffect(
        function () {
            setUserIsTyping(userIsTyping);
        },
        [userIsTyping]
    );

    function handleSendClicked() {
        if (textField.length > 0) {
            onSendMessage(textField);
            handleUpdateTextField("");
        }
    }

    function handleUpdateTextField(e: any) {
        let value: string = typeof e === "string" ? e : e.target.value;
        setTextField(value);
        if (chatsCache[chatId]) chatsCache[chatId].textField = value;
        else chatsCache[chatId] = { textField: value };
    }

    return (
        <TextField
            variant="outlined"
            autoFocus
            fullWidth
            multiline
            placeholder={`Send a message to ${chatName}`}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" onClick={handleSendClicked}>
                        <IconButton disabled={textField.length === 0}>
                            <SendIcon
                                color={
                                    textField.length === 0
                                        ? "disabled"
                                        : "primary"
                                }
                            />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...textFieldProps}
            value={textField}
            onChange={handleUpdateTextField}
        />
    );
};

export default ChatMessageInput;
