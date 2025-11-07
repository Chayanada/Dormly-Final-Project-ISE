import { Booking } from '../types/booking';

const API_URL = 'http://localhost:3001/api';

export const bookingService = {
    // ดึงรายการจองทั้งหมดของผู้ใช้
    async getMyBookings(): Promise<Booking[]> {
        try {
            const response = await fetch(`${API_URL}/bookings/my-bookings`, {
                credentials: 'include', // สำหรับส่ง cookies
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching bookings:', error);
            return [];
        }
    },

    // ยกเลิกการจอง
    async cancelBooking(bookingId: number): Promise<boolean> {
        try {
            const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            return true;
        } catch (error) {
            console.error('Error canceling booking:', error);
            return false;
        }
    }
};