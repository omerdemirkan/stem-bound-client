import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";
import { getDisplayUserRole } from "../../utils/helpers";
import {
    EUserRoles,
    IFetchUserArrayOptions,
    ISelectInputOption,
} from "../../utils/types";
import { fetchUsers } from "../../utils/services";
export interface IUserSelectProps extends Partial<IAsyncSelectProps> {
    userRole: EUserRoles;
    options?: IFetchUserArrayOptions;
}

const UserSelect: React.FC<IUserSelectProps> = ({
    userRole,
    options,
    ...asyncSelectProps
}) => {
    async function handleFetchOptions(): Promise<ISelectInputOption[]> {
        const { data: users } = await fetchUsers(userRole, options);
        return users.map((user) => ({
            value: user,
            display: `${user.fullName} - ${user.location.city}, ${user.location.state}`,
            avatar: {
                src: user.profilePictureUrl,
                alt: `${user.fullName} profile picture`,
            },
        }));
    }

    return (
        <AsyncSelect
            delay={400}
            fetchOptions={handleFetchOptions}
            {...asyncSelectProps}
            TextFieldProps={{
                fullWidth: true,
                label: userRole ? getDisplayUserRole(userRole) : "User",
                placeholder: "e.g David Aguira",
                margin: "normal",
                autoFocus: true,
                ...asyncSelectProps?.TextFieldProps,
            }}
        />
    );
};

export default UserSelect;
