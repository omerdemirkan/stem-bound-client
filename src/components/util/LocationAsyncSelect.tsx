import { fetchLocationAsyncSelectOptions } from "../../utils/helpers";
import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";

export interface ILocationAsyncSelectProps extends Partial<IAsyncSelectProps> {}

const LocationAsyncSelect: React.FC<ILocationAsyncSelectProps> = ({
    ...asyncSelectProps
}) => {
    return (
        <AsyncSelect
            delay={400}
            fetchOptions={fetchLocationAsyncSelectOptions}
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

export default LocationAsyncSelect;
