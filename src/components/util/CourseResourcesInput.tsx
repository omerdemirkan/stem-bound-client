import {
    ChangeEvent,
    KeyboardEvent,
    MutableRefObject,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { ENotificationTypes, ICourseResourceOriginal } from "../../utils/types";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import ActionBar from "../ui/ActionBar";
import { clone, deleteEmptyStrings } from "../../utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import NotificationContext from "../contexts/NotificationContext";

import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

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
    const { createAlert } = useContext(NotificationContext);
    const [newResource, setNewResource] =
        useState<null | ICourseResourceOriginal>();

    const isCreatingNewResource = !!newResource;

    // Hashtable to avoid out of bounds errors
    const [selectedIndices, setSelectedIndices] = useState<{
        [key: string]: boolean;
    }>({});

    const [numSelected, setNumSelected] = useState<number>(0);

    const [editedResource, setEditedResource] =
        useState<null | ICourseResourceOriginal>();

    const [editedResourceIndex, setEditedResourceIndex] =
        useState<null | number>();

    const isEditingResource = !!editedResource;

    const isInputting = isEditingResource || isCreatingNewResource;

    function getConfiguredResource(resource: ICourseResourceOriginal) {
        const configuredResource = clone(resource);
        deleteEmptyStrings(configuredResource);
        return configuredResource;
    }

    // CHECKBOX

    function handleCheckboxClicked(index: number, checked: boolean) {
        setSelectedIndices((prev) => {
            const selectionChanged = prev[index] !== checked;
            const newSelectedLabels = { ...prev, [index]: checked };

            // zero-trust from ui
            if (selectionChanged)
                setNumSelected((prev) => prev + (checked ? 1 : -1));
            return newSelectedLabels;
        });
    }

    // ADD

    function handleAddResourceClicked() {
        setNewResource(emptyCourseResource);
    }

    function handleAddResource() {
        const configuredNewResource = getConfiguredResource(newResource);
        onChange([...value, configuredNewResource]);
        setNewResource(null);
    }

    function handleCancelAddResource() {
        setNewResource(null);
    }

    // DELETE

    function handleDeleteSelectedResourcesClicked() {
        const plural = numSelected > 1;
        createAlert({
            type: ENotificationTypes.DANGER,
            headerText: `Are you sure you want to delete ${
                plural ? "these" : "this"
            } resource${plural ? "s" : ""}?`,
            bodyText: ``,
            onOk: handleDeleteSelectedResources,
            onCancel() {},
        });
    }

    function handleDeleteSelectedResources() {
        onChange(value.filter((resource, i) => !selectedIndices[i]));
        setSelectedIndices({});
        setNumSelected(0);
    }

    // EDIT

    function handleEditSelectedResourceClicked() {
        const index = value.findIndex((resource, i) => selectedIndices[i]);
        setEditedResourceIndex(index);
        setEditedResource(value[index]);
    }

    function handleCancelEditResource() {
        setEditedResource(null);
        setEditedResourceIndex(null);
    }

    function handleEditResource() {
        const configuredEditedResource = getConfiguredResource(editedResource);
        onChange(
            value.map((resource, i) =>
                i === editedResourceIndex ? configuredEditedResource : resource
            )
        );
        setEditedResource(null);
        setEditedResourceIndex(null);
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
                    {value.map(({ url, description, label }, i) => {
                        if (i === editedResourceIndex)
                            return (
                                <CourseResourceTableRowInput
                                    key={i}
                                    value={editedResource}
                                    onChange={setEditedResource}
                                />
                            );
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedIndices[i]}
                                        onChange={(e, checked) =>
                                            handleCheckboxClicked(i, checked)
                                        }
                                        inputProps={{
                                            "aria-label": `${label} resource`,
                                        }}
                                        style={{
                                            padding: 0,
                                            marginRight: "10px",
                                        }}
                                        color="primary"
                                    />
                                    {label}
                                </TableCell>
                                <TableCell>{url}</TableCell>
                                <TableCell>{description}</TableCell>
                            </TableRow>
                        );
                    })}
                    {isCreatingNewResource && (
                        <CourseResourceTableRowInput
                            value={newResource}
                            onChange={setNewResource}
                        />
                    )}
                </TableBody>
            </Table>
            <ActionBar
                startEl={
                    <>
                        {!isInputting && (
                            <Tooltip
                                title="Add Resource"
                                className="spaced-horizontal"
                            >
                                <IconButton
                                    color="primary"
                                    onClick={handleAddResourceClicked}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        {isCreatingNewResource && (
                            <>
                                <Tooltip
                                    title="Cancel New Resource"
                                    className="spaced-horizontal"
                                >
                                    <IconButton
                                        color="secondary"
                                        onClick={handleCancelAddResource}
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
                                        onClick={handleAddResource}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                        {isEditingResource && (
                            <>
                                <Tooltip
                                    title="Cancel Update Resource"
                                    className="spaced-horizontal"
                                >
                                    <IconButton
                                        color="secondary"
                                        onClick={handleCancelEditResource}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="Update Resource"
                                    className="spaced-horizontal"
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={handleEditResource}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </>
                }
            >
                <Tooltip title="Edit Selected Resource">
                    <IconButton
                        color="primary"
                        className="spaced-horizontal"
                        onClick={handleEditSelectedResourceClicked}
                        disabled={isInputting || numSelected !== 1}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Selected Resources">
                    <IconButton
                        color="secondary"
                        className="spaced-horizontal"
                        onClick={handleDeleteSelectedResourcesClicked}
                        disabled={isInputting || !numSelected}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ActionBar>
        </div>
    );
};

export default CourseResourcesInput;

const useStyles = makeStyles({
    tableCell: { paddingTop: "12px", paddingBottom: "12px" },
});

export interface ICourseResourceTableRowInputProps {
    value: ICourseResourceOriginal;
    onChange(resource: ICourseResourceOriginal): any;
    LabelTextFieldProps?: TextFieldProps;
    UrlTextFieldProps?: TextFieldProps;
    DescriptionTextFieldProps?: TextFieldProps;
}

export const CourseResourceTableRowInput: React.FC<ICourseResourceTableRowInputProps> =
    ({
        value,
        onChange,
        LabelTextFieldProps,
        UrlTextFieldProps,
        DescriptionTextFieldProps,
    }) => {
        function handleChange(
            e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) {
            onChange({ ...value, [e.target.name]: e.target.value });
        }

        function handleKeyPress(e: KeyboardEvent<HTMLDivElement>) {
            if (e.key !== "Enter") return;
            e.preventDefault();

            const focusedEl: keyof ICourseResourceOriginal =
                // @ts-ignore
                document.activeElement.name;

            if (focusedEl === "label") {
                urlRef.current.focus();
            } else if (focusedEl === "url") {
                descriptionRef.current.focus();
            }
        }

        const labelRef = useRef<HTMLInputElement>();
        const urlRef = useRef<HTMLInputElement>();
        const descriptionRef = useRef<HTMLInputElement>();

        const classes = useStyles();

        return (
            <TableRow>
                <TableCell className={classes.tableCell}>
                    <TextField
                        value={value.label}
                        placeholder="Name"
                        name="label"
                        required
                        autoFocus
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        InputProps={{ disableUnderline: true }}
                        inputProps={{ maxLength: 100 }}
                        fullWidth
                        inputRef={labelRef}
                        {...LabelTextFieldProps}
                    />
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <TextField
                        value={value.url}
                        placeholder="URL"
                        name="url"
                        required
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        InputProps={{ disableUnderline: true }}
                        inputProps={{ maxLength: 1000 }}
                        fullWidth
                        inputRef={urlRef}
                        {...UrlTextFieldProps}
                    />
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <TextField
                        value={value.description}
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        multiline
                        InputProps={{ disableUnderline: true }}
                        inputProps={{ maxLength: 1000 }}
                        fullWidth
                        inputRef={descriptionRef}
                        {...DescriptionTextFieldProps}
                    />
                </TableCell>
            </TableRow>
        );
    };

const SyllabusTableRowInput: React.FC<ICourseResourceTableRowInputProps> = (
    props
) => {
    return (
        <CourseResourceTableRowInput
            {...props}
            value={{
                ...props.value,
                label: "Syllabus",
                description: "The course Syllabus",
            }}
            LabelTextFieldProps={{ disabled: true }}
            DescriptionTextFieldProps={{ disabled: true }}
        />
    );
};
