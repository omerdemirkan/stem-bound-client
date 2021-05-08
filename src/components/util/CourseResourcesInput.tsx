import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { ICourseResourceOriginal } from "../../utils/types";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import ActionBar from "../ui/ActionBar";
import { clone, deleteEmptyStrings } from "../../utils/helpers";

export interface ICourseResourcesInputProps {
    onChange(resources: ICourseResourceOriginal[]): any;
    value: ICourseResourceOriginal[];
}

const emptyCourseResource: ICourseResourceOriginal = {
    label: "",
    url: "",
    description: "",
};

const CourseResourcesInput: React.FC<ICourseResourcesInputProps> = ({
    value,
    onChange,
}) => {
    const [
        newResource,
        setNewResource,
    ] = useState<null | ICourseResourceOriginal>(null);

    function handleAddCourseResourceClicked() {
        setNewResource(emptyCourseResource);
    }

    function handleAddCourseResource() {
        const resource = clone(newResource);
        deleteEmptyStrings(newResource);
        onChange([...value, resource]);
        setNewResource(null);
    }

    function handleCancelAddCourseResource() {
        setNewResource(null);
    }

    return (
        <div>
            <Table aria-label="Course Resources">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">URL</TableCell>
                        <TableCell align="left">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {value.map(({ url, description, label }) => (
                        <TableRow key={url}>
                            <TableCell>{label}</TableCell>
                            <TableCell>{url}</TableCell>
                            <TableCell>{description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {newResource && (
                    <CourseResourceTableRowInput
                        value={newResource}
                        onChange={setNewResource}
                    />
                )}
            </Table>
            <ActionBar
                startEl={
                    <>
                        {newResource ? (
                            <>
                                <Tooltip
                                    title="Cancel New Resource"
                                    className="spaced-horizontal"
                                >
                                    <IconButton
                                        color="secondary"
                                        onClick={handleCancelAddCourseResource}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="Add New Resource"
                                    className="spaced-horizontal"
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={handleAddCourseResource}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <Tooltip
                                title="Add Resource"
                                className="spaced-horizontal"
                            >
                                <IconButton
                                    color="primary"
                                    onClick={handleAddCourseResourceClicked}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </>
                }
            ></ActionBar>
        </div>
    );
};

export default CourseResourcesInput;

export interface ICourseResourceTableRowInputProps {
    value: ICourseResourceOriginal;
    onChange(resource: ICourseResourceOriginal): any;
}

export const CourseResourceTableRowInput: React.FC<ICourseResourceTableRowInputProps> = ({
    value,
    onChange,
}) => {
    const handleChange = (field: keyof ICourseResourceOriginal) => (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        onChange({ ...value, [field]: e.target.value });
    };

    return (
        <TableRow>
            <TableCell>
                <TextField
                    value={value.label}
                    placeholder="Name"
                    required
                    autoFocus
                    onChange={handleChange("label")}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        maxLength: 100,
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={value.url}
                    placeholder="URL"
                    required
                    onChange={handleChange("url")}
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        maxLength: 1000,
                    }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={value.description}
                    placeholder="Description"
                    onChange={handleChange("description")}
                    multiline
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        maxLength: 1000,
                    }}
                />
            </TableCell>
        </TableRow>
    );
};
