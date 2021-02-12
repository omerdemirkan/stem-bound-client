import { searchFieldInputOptions } from "../../utils/constants";
import {
    ESearchFields,
    ISearchQuery,
    IWithUserCoordinatesProps,
} from "../../utils/types";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import withUserCoordinates from "../hoc/withUserCoordinates";
import Paper from "@material-ui/core/Paper";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    paper: {
        padding: "8px 16px",
    },
});

export interface ISearchFormProps {
    searchField: ESearchFields;
    onSearchQueryChanged: (query: ISearchQuery) => any;
    noPaper?: boolean;
}

const SearchForm: React.FC<
    ISearchFormProps & Partial<IWithUserCoordinatesProps>
> = ({ searchField, onSearchQueryChanged, noPaper }) => {
    const { register, handleSubmit, control } = useForm();

    const classes = useStyles();

    const Wrapper = noPaper ? ({ children }) => <div>{children}</div> : Paper;

    return (
        <Wrapper className={classes.paper}>
            <form
                onSubmit={handleSubmit(onSearchQueryChanged)}
                className="form"
            >
                <Controller
                    control={control}
                    name="searchField"
                    defaultValue={searchField}
                    render={(props) => (
                        <Select labelId="Search Fields" {...props}>
                            {searchFieldInputOptions.map((option) => (
                                <MenuItem
                                    value={option.searchField}
                                    key={option.searchField}
                                >
                                    {option.display}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <TextField
                    inputRef={register}
                    name="text"
                    placeholder="Search"
                />
                <Button type="submit" variant="contained" color="primary">
                    SEARCH
                </Button>
            </form>

            <style jsx>{`
                .form {
                    display: grid;
                    grid-template-columns: auto auto auto;
                    grid-gap: 15px;
                }

                @media (max-width: 900px) {
                    .form {
                        width: 100%;
                        grid-template-columns: 100%;
                    }
                }
            `}</style>
        </Wrapper>
    );
};

export default withUserCoordinates(SearchForm);
