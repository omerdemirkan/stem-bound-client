import { fetchLocations } from "../../utils/services";
import { ISelectInputOption } from "../../utils/types";
import AsyncSelect, { IAsyncSelectProps } from "./AsyncSelect";

export interface ILocationAsyncSelectProps extends Partial<IAsyncSelectProps> {}

const LocationAsyncSelect: React.FC<ILocationAsyncSelectProps> = ({
    ...asyncSelectProps
}) => {
    async function handleFetchLocationOptions(
        text: string
    ): Promise<ISelectInputOption[]> {
        try {
            const { data } = await fetchLocations({ text });
            const locationSelectOptions = data.map((location) => ({
                display: `${location.city}, ${location.state}`,
                value: location,
            }));
            return locationSelectOptions;
        } catch (e) {
            return [];
        }
    }

    return (
        <AsyncSelect
            delay={400}
            fetchOptions={handleFetchLocationOptions}
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
