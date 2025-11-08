// src/utils/dormAdapter.ts
// แปลงข้อมูลจาก Backend format เป็น Frontend format

import { DormDetail, DormRoom } from '../services/dormService';

/**
 * แปลงข้อมูลหอพักจาก Backend เป็น Frontend format
 */
export const adaptDormDetail = (backendDorm: any): DormDetail => {
    // 1. แปลงรูปภาพจาก media array
    const images = backendDorm.media && backendDorm.media.length > 0
        ? backendDorm.media.map((m: any) => {
            // ถ้ามี file_url ใช้เลย ไม่งั้นต่อกับ base URL
            if (m.file_url && m.file_url.startsWith('http')) {
                return m.file_url;
            } else if (m.file_path) {
                return `http://localhost:3001${m.file_path}`;
            }
            return 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
        })
        : [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'
        ];

    // 2. แปลง room_types เป็น flat rooms array
    const rooms: DormRoom[] = [];
    
    if (backendDorm.room_types && Array.isArray(backendDorm.room_types)) {
        backendDorm.room_types.forEach((roomType: any) => {
            if (roomType.rooms && Array.isArray(roomType.rooms)) {
                roomType.rooms.forEach((room: any) => {
                    rooms.push({
                        id: (room.room_id || room.id)?.toString() || '0',
                        roomNumber: room.room_name || room.room_number || 'N/A',
                        roomType: roomType.room_type_name || 'ไม่ระบุ',
                        price: roomType.price_per_month || 0,
                        status: room.status === 'available' ? 'available' : 'occupied',
                        imageUrl: images[0] || 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop'
                    });
                });
            }
        });
    }

    // ถ้าไม่มีห้อง ให้สร้างตัวอย่าง
    if (rooms.length === 0) {
        rooms.push({
            id: '1',
            roomNumber: 'N/A',
            roomType: 'ไม่มีข้อมูลห้อง',
            price: 0,
            status: 'occupied',
            imageUrl: images[0]
        });
    }

    // 3. แปลง facilities
    let facilities: string[] = [];
    
    if (backendDorm.room_types && backendDorm.room_types[0]?.facilities) {
        const facilityString = backendDorm.room_types[0].facilities;
        if (typeof facilityString === 'string') {
            facilities = facilityString.split(',').map((f: string) => f.trim()).filter(Boolean);
        }
    }
    
    // ถ้าไม่มี facilities ใช้ค่า default
    if (facilities.length === 0) {
        facilities = ['แอร์', 'Wifi', 'เครื่องซักผ้า', 'ที่จอดรถ'];
    }

    // 4. คำนวณจำนวนห้อง
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.status === 'available').length;

    // 5. แปลงข้อมูลเจ้าของ
    const owner = backendDorm.owner ? {
        name: backendDorm.owner.owner_name || 'ไม่ระบุ',
        phone: backendDorm.owner.owner_phone || '-',
        email: backendDorm.owner.owner_email || '-',
        lineId: backendDorm.owner.owner_line_id || '-',
        rating: 4.5,
        reviewCount: 285,
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    } : {
        name: 'ไม่ระบุ',
        phone: '-',
        email: '-',
        lineId: '-',
        rating: 4.5,
        reviewCount: 0,
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    };

    // 6. Return ข้อมูลที่แปลงแล้ว
    return {
        id: (backendDorm.dorm_id || backendDorm.id)?.toString() || '0',
        name: backendDorm.dorm_name || backendDorm.name || 'ไม่ระบุชื่อ',
        images,
        description: backendDorm.description || 'ไม่มีรายละเอียด',
        facilities,
        totalRooms,
        availableRooms,
        owner,
        rooms
    };
};

export default {
    adaptDormDetail
};