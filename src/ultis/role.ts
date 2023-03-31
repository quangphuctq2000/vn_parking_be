import { User } from '@/database/models/users';

export enum Role {
    'admin' = 1,
    'vehicle_owner' = 2,
    'parking_station_owner' = 3,
}

export function isParkingStationOwner(user: User) {
    if (user.role != Role.parking_station_owner) return false;
    return true;
}
