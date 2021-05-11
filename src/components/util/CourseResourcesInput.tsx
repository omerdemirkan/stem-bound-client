import {
    Checkbox,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from "@material-ui/core";
import {
    ChangeEvent,
    KeyboardEvent,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { ICourseResourceOriginal } from "../../utils/types";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import ActionBar from "../ui/ActionBar";
import { clone, deleteEmptyStrings } from "../../utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
    const [newResource, setNewResource] = useState<ICourseResourceOriginal>();

    const [isCreatingNewResource, setIsCreatingNewResource] =
        useState<boolean>(false);

    const [selectedLabels, setSelectedLabels] = useState<{
        [key: string]: boolean;
    }>({});

    const [numSelected, setNumSelected] = useState<number>(0);

    function handleAddCourseResourceClicked() {
        setIsCreatingNewResource(true);
        setNewResource(emptyCourseResource);
    }

    function handleAddCourseResource() {
        const resource = clone(newResource);
        deleteEmptyStrings(newResource);
        onChange([...value, resource]);
        setNewResource(null);
    }

    function handleCancelAddCourseResource() {
        setIsCreatingNewResource(false);
        setNewResource(null);
    }

    function handleCheckboxClicked(label: string, checked: boolean) {
        setSelectedLabels((prev) => {
            const prevChecked = prev[label];
            const newSelectedLabels = { ...prev, [label]: checked };
            const selectionChanged = prevChecked !== checked;

            // zero-trust state management
            if (selectionChanged)
                setNumSelected((prev) => prev + (checked ? 1 : -1));
            return newSelectedLabels;
        });
    }

    function handleDeleteSelectedResources() {
        onChange(value.filter((resource) => !selectedLabels[resource.label]));
        setSelectedLabels({});
        setNumSelected(0);
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
                            <TableCell>
                                <Checkbox
                                    checked={selectedLabels[label]}
                                    onChange={(e, checked) =>
                                        handleCheckboxClicked(label, checked)
                                    }
                                    inputProps={{
                                        "aria-label": `${label} resource`,
                                    }}
                                />
                                {label}
                            </TableCell>
                            <TableCell>{url}</TableCell>
                            <TableCell>{description}</TableCell>
                        </TableRow>
                    ))}
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
                        {isCreatingNewResource ? (
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
            >
                <Tooltip title="Delete Selected Resources">
                    <IconButton
                        color="secondary"
                        onClick={handleDeleteSelectedResources}
                        disabled={isCreatingNewResource || !numSelected}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                {/* <Tooltip title="Edit Selected Resource">
                    <IconButton
                        color="secondary"
                        onClick={handleDeleteSelectedResources}
                        disabled={numSelected !== 1}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip> */}
            </ActionBar>
        </div>
    );
};

export default CourseResourcesInput;

const useStyles = makeStyles({
    tableCell: { paddingTop: "10px", paddingBottom: "10px" },
});

export interface ICourseResourceTableRowInputProps {
    value: ICourseResourceOriginal;
    onChange(resource: ICourseResourceOriginal): any;
}

export const CourseResourceTableRowInput: React.FC<ICourseResourceTableRowInputProps> =
    ({ value, onChange }) => {
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
                    />
                </TableCell>
            </TableRow>
        );
    };