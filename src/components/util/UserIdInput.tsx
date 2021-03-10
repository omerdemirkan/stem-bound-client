import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";
import {
    fetchUserIdInputOptions,
    getUserDisplayRole,
} from "../../utils/helpers";
import { EUserRoles, IFetchUserArrayOptions } from "../../utils/types";
export interface IUserIdInputProps extends IAsyncSelectProps {
    userRole: EUserRoles;
    options?: IFetchUserArrayOptions;
}

const UserIdInput: React.FC<IUserIdInputProps> = ({
    userRole,
    options,
    ...asyncSelectProps
}) => {
    return (
        <AsyncSelect
            delay={400}
            fetchOptions={() => fetchUserIdInputOptions(userRole, options)}
            {...asyncSelectProps}
            TextFieldProps={{
                fullWidth: true,
                label: userRole ? getUserDisplayRole(userRole) : "User",
                placeholder: "e.g David Aguira",
                margin: "normal",
                ...asyncSelectProps?.TextFieldProps,
            }}
        />
    );
};

export default UserIdInput;
