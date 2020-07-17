import Modal, { ModalFooter } from "../ui/Modal";
import { useState, useEffect } from "react";
import { ICoordinates, IUser } from "../../utils/types";
import { getCurrentLocation } from "../../utils/helpers";
import { useSelector } from "react-redux";

export default function withUserCoordinates(Component): React.FC {
    return function (props) {
        const [permissionStatus, setPermissionStatus] = useState<
            PermissionState
        >();
        const [permissionModalOpen, setPermissionModalOpen] = useState<
            boolean | null
        >(null);
        const [coordinates, setCoordinates] = useState<ICoordinates>();
        const { user }: { user: IUser } = useSelector(
            (state: any) => state.auth
        );

        useEffect(function () {
            handleSetCoordinates();
        }, []);

        useEffect(
            function () {
                if (permissionStatus === "denied" && user) {
                    setCoordinatesByUserState();
                }
            },
            [user, permissionStatus]
        );

        async function handleSetCoordinates() {
            const permissionStatus = await getGeolocationPermissionStatus();

            switch (permissionStatus) {
                case "granted":
                    setCoordinatesByGeolocationApi();
                    break;
                case "denied":
                    setCoordinatesByUserState();
                    break;
                case "prompt":
                    setPermissionModalOpen(true);
                    break;
            }
        }

        async function getGeolocationPermissionStatus(): Promise<
            PermissionState
        > {
            const status = (
                await navigator.permissions.query({
                    name: "geolocation",
                })
            ).state;
            setPermissionStatus(status);
            return status;
        }

        async function setCoordinatesByGeolocationApi() {
            setCoordinates(await getCurrentLocation());
        }

        function setCoordinatesByUserState() {
            try {
                const geoJSON = user.location.geoJSON;
                setCoordinates({
                    longitude: geoJSON[0],
                    latitude: geoJSON[1],
                });
            } catch (e) {}
        }

        return (
            <>
                <Component {...props} coordinates={coordinates} />
                <Modal
                    open={permissionModalOpen === true}
                    headerText="geo-location permission"
                    bodyText="STEM-bound uses geo-location to make search results as relevant as possible. Sensitive information like your exact location is not stored."
                    onClose={() => setPermissionModalOpen(false)}
                    hideCloseIcon
                >
                    <ModalFooter>
                        <button
                            onClick={() => {
                                setCoordinatesByGeolocationApi();
                                setPermissionModalOpen(false);
                            }}
                        >
                            OK
                        </button>
                    </ModalFooter>
                </Modal>
            </>
        );
    };
}
