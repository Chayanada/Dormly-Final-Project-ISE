import { Room, RoomType } from '../types/room';

const API_URL = 'http://localhost:3001/api';

export const roomService = {
    // ดึงข้อมูลประเภทห้องทั้งหมดของหอพัก
    async getRoomTypes(dormId: number): Promise<RoomType[]> {
        try {
            const response = await fetch(`${API_URL}/dorms/${dormId}/room-types`);
            if (!response.ok) {
                throw new Error('Failed to fetch room types');
            }
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching room types:', error);
            return [];
        }
    },

    // ดึงข้อมูลห้องทั้งหมดของหอพัก
    async getRooms(dormId: number): Promise<Room[]> {
        try {
            const response = await fetch(`${API_URL}/dorms/${dormId}/rooms`);
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching rooms:', error);
            return [];
        }
    },

    // ดึงข้อมูลห้องตาม room ID
    async getRoom(dormId: number, roomId: number): Promise<Room | null> {
        try {
            const response = await fetch(`${API_URL}/dorms/${dormId}/rooms/${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch room');
            }
            const data = await response.json();
            return data.data || null;
        } catch (error) {
            console.error('Error fetching room:', error);
            return null;
        }
    },

    // ดึงข้อมูลห้องที่ว่างของประเภทห้องนั้นๆ
    async getAvailableRooms(dormId: number, roomTypeId: number): Promise<Room[]> {
        try {
            const response = await fetch(`${API_URL}/dorms/${dormId}/room-types/${roomTypeId}/available-rooms`);
            if (!response.ok) {
                throw new Error('Failed to fetch available rooms');
            }
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            return [];
        }
    }
};