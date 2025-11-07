export interface Booking {
    booking_id: number;
    dorm_id: number;
    dorm_name: string;
    room_id: number;
    room_number: string;
    room_type: string;
    price: number;
    booking_date: string;
    check_in_date: string;
    check_out_date: string | null;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    payment_status: 'pending' | 'paid' | 'failed';
    cover_image: string;
}