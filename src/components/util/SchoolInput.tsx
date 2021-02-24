import { fetchSchoolInputOptions } from "../../utils/helpers";
import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";

export interface ISchoolInputProps extends Partial<IAsyncSelectProps> {}

const SchoolInput: React.FC<ISchoolInputProps> = ({ ...asyncSelectProps }) => {
    return (
        <AsyncSelect
            fetchOptions={fetchSchoolInputOptions}
            {...asyncSelectProps}
            TextFieldProps={{
                fullWidth: true,
                label: "School",
                placeholder: "e.g Reseda High School",
                margin: "normal",
                ...asyncSelectProps?.TextFieldProps,
            }}
        />
    );
};
export default SchoolInput;
