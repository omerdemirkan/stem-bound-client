import { useEffect, useState } from "react";
import { IChat } from "../../utils/types";
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
    chat: IChat;
    onSendMessage(value: string): any;
};

export const ChatMessageInput: React.FC<IChatMessageInput> = ({
    initialValue,
    chat,
    onSendMessage,
    ...textFieldProps
}) => {
    const chatsCache = useCalculateOnce(getChatsCache);
    const [textField, setTextField] = useState<string>(
        chatsCache[chat._id].textField || ""
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
            setUserIsTyping(userIsTyping);
        },
        [userIsTyping]
    );

    function handleSendClicked() {
        onSendMessage(textField);
        handleUpdateTextField("");
    }

    function handleUpdateTextField(e: any) {
        let value: string = typeof e === "string" ? e : e.target.value;
        setTextField(value);
        if (chatsCache[chat._id]) chatsCache[chat._id].textField = value;
        else chatsCache[chat._id] = { textField: value };
    }

    return (
        <TextField
            variant="outlined"
            autoFocus
            fullWidth
            multiline
            placeholder={`Message ${chat?.name}`}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" onClick={handleSendClicked}>
                        <IconButton>
                            <SendIcon color="primary" />
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
