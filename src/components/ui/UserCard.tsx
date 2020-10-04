import TextField from "@material-ui/core/TextField";
import { IUser } from "../../utils/types";
import InputButton from "./InputButton";

export interface UserCardProps {
    user: IUser;
    onContactUser?: (user: IUser, message: string) => void;
    contactUserEnabled?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    onContactUser,
    contactUserEnabled,
}) => {
    return (
        <div>
            {contactUserEnabled ? (
                <InputButton
                    onSubmit={(message) => onContactUser(user, message)}
                    renderInput={(value, setValue) => (
                        <TextField
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            fullWidth
                            autoFocus
                        />
                    )}
                >
                    Contact
                </InputButton>
            ) : null}

            <img
                src={user.profilePictureUrl || "/default-profile-picture.svg"}
                alt={`${user.firstName} ${user.lastName} Profile Picture`}
                className="profile-picture small"
            />
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default UserCard;
