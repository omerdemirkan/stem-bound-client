import AuthContext from "../../components/contexts/AuthContext";
import useSWR from "swr";
import Head from "next/head";
import AppLayout from "../../components/containers/AppLayout";
import PictureInput from "../../components/ui/PictureInput";
import withAuth from "../../components/hoc/withAuth";
import { fetchLocationInputOptions } from "../../utils/helpers";
import {
    userFetcher,
    updateUserProfilePicture,
    updateUserById,
    updateUserLocation,
} from "../../utils/services";
import { useContext, useEffect } from "react";
import InputButton from "../../components/ui/InputButton";
import {
    IUserOriginal,
    IStudent,
    EUserRoles,
    IInstructor,
} from "../../utils/types";
import AsyncSelect from "../../components/ui/AsyncSelect";
import TextField from "@material-ui/core/TextField";
import ChipInput from "../../components/ui/ChipInput";

const MyAccountAppPage: React.FC = () => {
    const { user: storedUser, mutateUser: mutateAuthContextUser } = useContext(
        AuthContext
    );
    const { data: fetchedUser, mutate: mutateFetchedUser } = useSWR(
        storedUser?._id ? `/user/${storedUser?._id}` : null,
        userFetcher(storedUser?._id)
    );
    const user = fetchedUser || storedUser;

    // Because this route has update user functionality,
    // this is to mutate the auth context user
    useEffect(
        function () {
            if (fetchedUser) {
                mutateAuthContextUser(fetchedUser);
            }
        },
        [fetchedUser]
    );

    async function handleProfilePictureCreated(file: File) {
        const { data: updatedUser } = await updateUserProfilePicture(
            user._id,
            file
        );
        mutateFetchedUser(updatedUser, false);
    }

    async function handleUpdateUser(update: Partial<IUserOriginal>) {
        const { data: updatedUser } = await updateUserById(user._id, update);
        console.log(updatedUser);
        mutateFetchedUser(updatedUser, false);
    }

    async function handleUpdateUserLocationByZip(zip: string) {
        const { data: updatedUser } = await updateUserLocation(user._id, {
            zip,
        });
        mutateFetchedUser(updatedUser, false);
    }

    return (
        <AppLayout header="My Account">
            <Head>
                <title>STEM-bound - My Account</title>
            </Head>
            <h3>My Account</h3>
            <br />
            <h3>{`${user.firstName} ${user.lastName}`}</h3>

            <img
                src={user.profilePictureUrl || "/default-profile-picture.svg"}
                alt="profile-pic"
                id="profile-pic"
                className="profile-picture large"
            />
            <PictureInput
                onFileCreated={handleProfilePictureCreated}
                baseFileName={`${user._id}-profile-picture`}
                buttonText={`${
                    user.profilePictureUrl ? "UPDATE" : "ADD"
                } PROFILE PICTURE`}
            />

            <p>{`${user.location.city}, ${user.location.state}`}</p>
            <InputButton
                initialValue={user.location.zip}
                onSubmit={handleUpdateUserLocationByZip}
                renderInput={(value, setValue) => (
                    <AsyncSelect
                        TextFieldProps={{
                            fullWidth: true,
                            label: "Location",
                            placeholder: "e.g Reseda",
                            id: "location",
                        }}
                        delay={400}
                        onChange={(e) => setValue(e.target.value)}
                        fetchOptions={fetchLocationInputOptions}
                    />
                )}
            >
                UPDATE LOCATION
            </InputButton>

            <p>{user.shortDescription}</p>
            <InputButton
                initialValue={user.shortDescription}
                onSubmit={(value) =>
                    handleUpdateUser({ shortDescription: value })
                }
                renderInput={(value, setValue) => (
                    <TextField
                        id="short-description"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        fullWidth
                        multiline
                    />
                )}
            >
                UPDATE SHORT DESCRIPTION
            </InputButton>

            <p>{user.longDescription}</p>
            <InputButton
                initialValue={user.longDescription || ""}
                onSubmit={(value) =>
                    handleUpdateUser({ longDescription: value })
                }
                renderInput={(value, setValue) => (
                    <TextField
                        id="long-description"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        multiline
                        fullWidth
                    />
                )}
            >
                {`${user.longDescription ? "UPDATE" : "ADD"} LONG DESCRIPTION`}
            </InputButton>

            {user.role === EUserRoles.STUDENT ? (
                <>
                    <p>Interests:</p>
                    {(user as IStudent).interests.map((interest) => (
                        <p key={interest}>{interest}</p>
                    ))}

                    <InputButton
                        initialValue={(user as IStudent).interests}
                        onSubmit={(interests) =>
                            handleUpdateUser({ interests })
                        }
                        renderInput={(value, setValue) => (
                            <ChipInput
                                onChange={setValue}
                                value={value}
                                TextFieldProps={{
                                    fullWidth: true,
                                    id: "interests",
                                }}
                            />
                        )}
                    >
                        UPDATE INTERESTS
                    </InputButton>
                </>
            ) : null}

            {user.role === EUserRoles.INSTRUCTOR ? (
                <>
                    <p>Specialties:</p>
                    {(user as IInstructor).specialties.map((specialty) => (
                        <p key={specialty}>{specialty}</p>
                    ))}

                    <InputButton
                        initialValue={(user as IInstructor).specialties}
                        onSubmit={(specialties) =>
                            handleUpdateUser({ specialties })
                        }
                        renderInput={(value, setValue) => (
                            <ChipInput
                                onChange={setValue}
                                value={value}
                                TextFieldProps={{
                                    fullWidth: true,
                                    id: "specialties",
                                }}
                            />
                        )}
                    >
                        UPDATE SPECIALTIES
                    </InputButton>
                </>
            ) : null}
        </AppLayout>
    );
};

export default withAuth(MyAccountAppPage);
