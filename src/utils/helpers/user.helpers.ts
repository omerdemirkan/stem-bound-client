import { IUserOriginal, IUser } from "../types";

export function mapUserData(users: IUserOriginal[]): IUser[] {
    return users.map((user: IUserOriginal) => ({
        _id: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        location: {
            city: user.location.city,
            geoJSON: user.location.geoJSON,
            state: user.location.state,
            zip: user.location.zip,
            longitude: user.location.geoJSON.coordinates[0],
            latitude: user.location.geoJSON.coordinates[1],
        },
        longDescription: user.longDescription,
        shortDescription: user.shortDescription,
        meta: user.meta as any,
        position: (user as any).position || undefined,
        interests: (user as any).interests || undefined,
        specialties: (user as any).specialties || undefined,
    }));
}
