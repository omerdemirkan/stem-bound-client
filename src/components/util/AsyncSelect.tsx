import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState, useEffect, Ref } from "react";
import { ISelectInputOption } from "../../utils/types";
import useDebounce from "../../hooks/useDebounce";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface IAsyncSelectProps {
    fetchOptions: (s: string) => Promise<ISelectInputOption[]>;
    TextFieldProps?: TextFieldProps;
    delay?: number;
    onChange?(val: any): void;
    ref?: Ref<unknown>;
    id?: string;
    label?: string;
}

const AsyncSelect: React.FC<IAsyncSelectProps> = ({
    delay,
    fetchOptions,
    TextFieldProps,
    onChange,
    ref,
    id,
    label,
}) => {
    const [search, setSearch] = useState<string>("");
    const [options, setOptions] = useState<ISelectInputOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const debouncedSearch = useDebounce(search, delay || 400);

    async function handleFetchOptions() {
        setLoading(true);
        const options = await fetchOptions(debouncedSearch);
        console.log({ options });
        setOptions(options);
        setLoading(false);
    }

    function handleUpdateTextField(e) {
        setSearch(e.target.value);
        onChange(null);
    }

    useEffect(
        function () {
            if (debouncedSearch) handleFetchOptions();
        },
        [debouncedSearch]
    );

    return (
        <div>
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.display}
                onChange={(event, option: ISelectInputOption) =>
                    onChange(option?.value)
                }
                id={id}
                ref={ref}
                renderInput={(params) => (
                    <TextField
                        onChange={handleUpdateTextField}
                        value={search}
                        label={label}
                        inputProps={{
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        {...params}
                        {...TextFieldProps}
                    />
                )}
            />
        </div>
    );
};

export default AsyncSelect;
