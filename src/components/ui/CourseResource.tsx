import { ICourseResource } from "../../utils/types";
import Tooltip from "@material-ui/core/Tooltip";

export interface ICourseResourceProps extends ICourseResource {}

const CourseResource: React.FC<ICourseResourceProps> = ({
    label,
    url,
    description,
}) => {
    let courseResource = <a href={url}>{label}</a>;
    if (description)
        courseResource = (
            <Tooltip title={description}>{courseResource}</Tooltip>
        );
    return courseResource;
};

export default CourseResource;
