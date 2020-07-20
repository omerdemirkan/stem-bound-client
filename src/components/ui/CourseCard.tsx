import Link from "next/link";
import { ICourse } from "../../utils/types";

interface Props {
    course: ICourse;
}

const CourseCard: React.FC<Props> = ({ course }) => {
    return (
        <div key={course._id}>
            <Link href="/app/courses/[id]" as={`/app/courses/${course._id}`}>
                <a>{course.title}</a>
            </Link>
            <pre>{JSON.stringify(course, null, 2)}</pre>
        </div>
    );
};

export default CourseCard;
