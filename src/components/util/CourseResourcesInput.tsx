import { useState } from "react";
import { ICourseResource, ICourseResourceOriginal } from "../../utils/types";
import CourseResourceForm from "../forms/CourseResourceForm";
import CopyToClipboard from "./CopyToClipboard";

export interface ICourseResourcesInputProps {
    onChange(resources: ICourseResourceOriginal[]): any;
    value: ICourseResourceOriginal[];
}

const CourseResourcesInput: React.FC<ICourseResourcesInputProps> = ({
    value,
    onChange,
}) => {
    function handleAddCourseResource(newResource: ICourseResourceOriginal) {
        onChange([...value, newResource]);
    }

    return (
        <div>
            <CourseResourceForm onSubmit={handleAddCourseResource} />
            {value.map((resource) => (
                <CopyToClipboard
                    key={resource.label + resource.url}
                    prepend={resource.label}
                    text={resource.url}
                    description={resource.description}
                />
            ))}
        </div>
    );
};

export default CourseResourcesInput;
