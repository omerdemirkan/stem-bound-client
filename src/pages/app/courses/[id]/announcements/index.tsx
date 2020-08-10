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
    updateAnnouncementById,
} from "../../../../../utils/services";
import { useContext, useState } from "react";
import { EUserRoles } from "../../../../../utils/types";
import Modal from "../../../../../components/ui/Modal";
import Input from "../../../../../components/ui/Input";
import { clone } from "../../../../../utils/helpers";

interface EditState {
    announcementId: null | string;
    announcementText: string;
    modalIsOpen: boolean;
    loading: boolean;
}

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

    const [editState, setEditState] = useState<EditState>({
        announcementId: null,
        announcementText: "",
        modalIsOpen: false,
        loading: false,
    });
    const updateEditState = (updates: Partial<EditState>) =>
        setEditState((previous) => ({ ...previous, ...updates }));

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

    function handleEditAnnouncement(announcementId: string) {
        if (editState.loading) return;
        updateEditState({
            announcementText: "",
            modalIsOpen: false,
            loading: true,
        });

        updateAnnouncementById(
            { text: editState.announcementText },
            { announcementId, courseId: course._id }
        ).then(function (res) {
            const newAnnouncements = clone(announcements);
            const announcementIndex = announcements.findIndex(
                (announcement) => announcement._id === announcementId
            );
            newAnnouncements[announcementIndex] = res.data;
            mutateCourseAnnouncements(newAnnouncements);
        });
    }

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
                    onEditButtonClicked={(announcementId: string) =>
                        updateEditState({
                            announcementId,
                            modalIsOpen: true,
                            announcementText: announcements.find(
                                (announcement) =>
                                    announcement._id === announcementId
                            ).text,
                        })
                    }
                />
            ))}

            <Modal open={editState.modalIsOpen}>
                <Input
                    id="editedAnnouncement"
                    type="text"
                    label="Edit Announcement"
                    value={editState.announcementText}
                    onChange={(announcementText: string) =>
                        updateEditState({ announcementText })
                    }
                    eventTargetValue
                />
                <button
                    onClick={() =>
                        updateEditState({
                            modalIsOpen: false,
                            announcementText: "",
                        })
                    }
                >
                    CANCEL
                </button>
                <button
                    onClick={() =>
                        handleEditAnnouncement(editState.announcementId)
                    }
                >
                    EDIT
                </button>
            </Modal>
        </AppLayout>
    );
};

export default withAuth(AnnouncementsAppPage);
