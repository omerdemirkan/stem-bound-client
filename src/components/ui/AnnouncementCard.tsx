import { IAnnouncement } from "../../utils/types";

interface Props {
    announcement: IAnnouncement;
}

const AnnouncementCard: React.FC<Props> = ({ announcement }) => {
    return (
        <div>
            <pre>{JSON.stringify(announcement, null, 2)}</pre>
        </div>
    );
};

export default AnnouncementCard;
