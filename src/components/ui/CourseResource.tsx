import { ICourseResource } from "../../utils/types";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";

export interface ICourseResourceProps extends ICourseResource {}

const CourseResource: React.FC<ICourseResourceProps> = ({
    label,
    url,
    description,
}) => {
    let courseResource = (
        <Link>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {label}
            </a>
        </Link>
    );
    if (description)
        courseResource = (
            <Tooltip title={description}>{courseResource}</Tooltip>
        );
    return <div>{courseResource}</div>;
};

export default CourseResource;
