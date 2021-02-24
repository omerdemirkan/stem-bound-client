import { fetchLocationInputOptions } from "../../utils/helpers";
import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";

export interface ILocationInputProps extends Partial<IAsyncSelectProps> {}

const LocationInput: React.FC<ILocationInputProps> = ({
    ...asyncSelectProps
}) => {
    return (
        <AsyncSelect
            delay={400}
            fetchOptions={fetchLocationInputOptions}
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

export default LocationInput;
