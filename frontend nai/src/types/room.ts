export interface Room {
    room_id: number;
    room_type: string;
    description: string;
    price: number;
    size: number;
    floor: number;
    room_number: string;
    available: boolean;
    facilities: {
        facility_id: number;
        facility_name: string;
    }[];
    images: string[];
}

export interface RoomType {
    type_id: number;
    name: string;
    description: string;
    price: number;
    size: number;
    facilities: {
        facility_id: number;
        facility_name: string;
    }[];
    available_count: number;
    images: string[];
}