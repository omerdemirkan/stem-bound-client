import AppLayout from "../../../../../components/containers/AppLayout";
import Head from "next/head";
import Link from "next/link";
import withAuth from "../../../../../components/hoc/withAuth";
import AuthContext from "../../../../../components/contexts/AuthContext";
import useSWR from "swr";
import AnnouncementCard from "../../../../../components/ui/AnnouncementCard";
import { useRouter } from "next/router";
import {
    courseFetcher,
    announcementsFetcher,
    deleteAnnouncementById,
} from "../../../../../utils/services";
import { useContext, useState } from "react";
import { EUserRoles } from "../../../../../utils/types";
import Modal from "../../../../../components/ui/Modal";
import Input from "../../../../../components/ui/Input";

const AnnouncementsAppPage: React.FC = () => {
    const router = useRouter();
    const queryCourseId = router.query.id;
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const {
        data: announcements,
        error: fetchAnnouncementsError,
        mutate: mutateCourseAnnouncements,
    } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}/announcements` : null,
        announcementsFetcher(queryCourseId as any),
        { initialData: course?.announcements }
    );

    const { user } = useContext(AuthContext);
    const [editedAnnouncementId, setEditedAnnouncementId] = useState<
        string | null
    >(null);
    const [editedAnnouncementText, setEditedAnnouncementText] = useState<
        string | null
    >(null);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    function handleDeleteAnnouncement(announcementId: string) {
        deleteAnnouncementById({ announcementId, courseId: course._id }).then(
            function (res) {
                mutateCourseAnnouncements(
                    announcements.filter(
                        (announcement) => announcement._id !== announcementId
                    )
                );
            }
        );
    }

    function handleEditAnnouncement(announcementId: string) {}

    return (
        <AppLayout>
            <Head>
                <title>STEM-bound - Announcements</title>
            </Head>
            <h4>announcements</h4>
            {user.role === EUserRoles.INSTRUCTOR ? (
                <Link
                    href="/app/courses/[id]/announcements/create"
                    as={`/app/courses/${course?._id}/announcements/create`}
                >
                    <a>
                        <button>CREATE</button>
                    </a>
                </Link>
            ) : null}

            {announcements?.map((announcement) => (
                <AnnouncementCard
                    key={announcement._id}
                    announcement={announcement}
                    onDeleteButtonClicked={handleDeleteAnnouncement}
                    onEditButtonClicked={(announcementId: string) => {
                        setEditedAnnouncementId(announcementId);
                        setEditModalOpen(true);
                    }}
                />
            ))}

            <Modal open={editModalOpen}>
                <Input
                    id="editedAnnouncement"
                    type="text"
                    label="Edit Announcement"
                    onChange={setEditedAnnouncementText}
                    eventTargetValue
                />
                <button
                    onClick={() => {
                        setEditModalOpen(false);
                        setEditedAnnouncementText("");
                    }}
                >
                    CANCEL
                </button>
                <button
                    onClick={() => {
                        handleEditAnnouncement(editedAnnouncementId);
                        setEditModalOpen(false);
                        setEditedAnnouncementText("");
                    }}
                >
                    EDIT
                </button>
            </Modal>
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);
