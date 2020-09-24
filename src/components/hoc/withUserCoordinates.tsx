import AuthContext from "../contexts/AuthContext";
import NotificationContext from "../contexts/NotificationContext";
import { useState, useEffect, useContext } from "react";
import { ICoordinates, ENotificationTypes } from "../../utils/types";
import { getCurrentLocation } from "../../utils/helpers";

export default function withUserCoordinates(Component): React.FC {
    return function (props) {
        const [permissionStatus, setPermissionStatus] = useState<
            PermissionState
        >();
        const [coordinates, setCoordinates] = useState<ICoordinates>();

        const { user } = useContext(AuthContext);
        const { createAlert } = useContext(NotificationContext);

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
                    handleOpenPermissionModal();
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

        function handleOpenPermissionModal() {
            createAlert({
                headerText: "geo-location permission",
                bodyText:
                    "STEM-bound uses geo-location to make search results as relevant as possible. Sensitive information like your exact location is not stored.",
                type: ENotificationTypes.INFO,
                onOk: setCoordinatesByGeolocationApi,
            });
        }

        return <Component {...props} coordinates={coordinates} />;
    };
}
