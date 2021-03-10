import { fetchLocationZipcodeInputOptions } from "../../utils/helpers";
import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";

export interface ILocationZipcodeInputProps
    extends Partial<IAsyncSelectProps> {}

const LocationZipcodeInput: React.FC<ILocationZipcodeInputProps> = ({
    ...asyncSelectProps
}) => {
    return (
        <AsyncSelect
            delay={400}
            fetchOptions={fetchLocationZipcodeInputOptions}
            {...asyncSelectProps}
            TextFieldProps={{
                fullWidth: true,
                label: "Location",
                placeholder: "e.g Northridge",
                margin: "normal",
                ...asyncSelectProps?.TextFieldProps,
            }}
        />
    );
};

export default LocationZipcodeInput;
