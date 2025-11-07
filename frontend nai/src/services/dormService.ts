const API_URL = 'http://localhost:3001/api';

export interface DormRoom {
    id: string;
    roomNumber: string;
    roomType: string;
    price: number;
    status: 'available' | 'occupied';
    imageUrl: string;
}

export interface DormDetail {
    id: string;
    name: string;
    images: string[];
    description: string;
    facilities: string[];
    totalRooms: number;
    availableRooms: number;
    owner: {
        name: string;
        phone: string;
        email: string;
        lineId: string;
        rating: number;
        reviewCount: number;
        profileImage: string;
    };
    room_types: {
        room_type_id: number;
        room_type_name: string;
        room_type_desc: string;
        max_occupancy: number;
        deposit_amount: number;
        rent_per_month: number;
        rent_per_day: number;
        total_rooms: number;
        available_rooms: number;
    }[];
    rooms: DormRoom[];
}

// ฟังก์ชันดึงข้อมูลหอพักตาม ID
export const getDormById = async (id: string): Promise<DormDetail> => {
    try {
        console.log('🔍 Fetching dorm details for ID:', id);
        
        const response = await fetch(`${API_URL}/dorms/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📦 Raw API Response:', result);

        // แปลงข้อมูลจาก Backend
        const data = result.success ? result.data : result;
        
        // คำนวณจำนวนห้องทั้งหมดและห้องว่าง
        let totalRooms = 0;
        let availableRooms = 0;
        
        if (data.rooms && Array.isArray(data.rooms)) {
            totalRooms = data.rooms.length;
            availableRooms = data.rooms.filter((room: any) => 
                room.status === 'ห้องว่าง' || room.status === 'available' || room.cur_occupancy === 0
            ).length;
        }
        
        // ถ้า Backend ส่งมาแล้ว ใช้ค่านั้น
        if (data.total_rooms !== undefined) {
            totalRooms = Number(data.total_rooms);
        }
        if (data.available_rooms !== undefined) {
            availableRooms = Number(data.available_rooms);
        }
        
        // Format ข้อมูลให้ตรงกับ DormDetail interface
        const formattedDorm: DormDetail = {
            id: String(data.dorm_id || data.id || id),
            name: data.dorm_name || data.name || 'ไม่ระบุชื่อ',
            images: data.medias || data.images || [
                'https://placehold.co/800x600/e5e7eb/6b7280?text=No+Image+1',
                'https://placehold.co/800x600/e5e7eb/6b7280?text=No+Image+2',
                'https://placehold.co/800x600/e5e7eb/6b7280?text=No+Image+3',
            ],
            description: data.description || data.dorm_desc || 'ไม่มีรายละเอียด',
            facilities: data.facilities?.map((f: any) => 
                typeof f === 'string' ? f : (f.faci_name || f.facility_name || f.name || 'Unknown')
            ) || [],
            totalRooms: totalRooms,
            availableRooms: availableRooms,
            owner: {
                name: data.owner_name || data.owner?.name || data.owner?.f_name + ' ' + data.owner?.l_name || 'ไม่ระบุชื่อ',
                phone: data.tel || data.owner_phone || data.owner?.phone || '-',
                email: data.owner_email || data.owner?.email || '-',
                lineId: data.line_id || data.owner_line || data.owner?.line_id || data.owner?.lineId || '-',
                rating: Number(data.avg_score || data.owner_rating || data.owner?.rating || 0),
                reviewCount: Number(data.likes || data.owner_reviews || data.owner?.review_count || data.owner?.reviewCount || 0),
                profileImage: data.owner_image || data.owner?.profile_path || data.owner?.profile_image || data.owner?.profileImage || 
                    'https://placehold.co/200x200/e5e7eb/6b7280?text=Owner'
            },
            room_types: data.room_types || [],
            rooms: data.rooms?.map((room: any) => ({
                id: String(room.room_id || room.id || Math.random()),
                roomNumber: room.room_name || room.room_number || room.roomNumber || '-',
                roomType: room.room_type_name || room.room_type || room.roomType || 'ไม่ระบุ',
                price: Number(room.rent_per_month || room.price || room.monthly_price || 0),
                status: (room.status === 'ห้องว่าง' || room.status === 'available' || room.cur_occupancy === 0) ? 'available' : 'occupied',
                imageUrl: room.image_url || room.imageUrl || room.medias?.[0] || 
                    'https://placehold.co/400x300/e5e7eb/6b7280?text=Room'
            })) || []
        };

        console.log('✅ Formatted dorm:', formattedDorm);
        console.log('✅ Total Rooms:', totalRooms);
        console.log('✅ Available Rooms:', availableRooms);
        console.log('✅ Owner Info:', formattedDorm.owner);
        console.log('✅ Facilities:', formattedDorm.facilities);
        
        return formattedDorm;

    } catch (error) {
        console.error('❌ Error in getDormById:', error);
        throw error;
    }
};

// ฟังก์ชันเพิ่มหอพักเป็นที่โปรด
export const addToFavorites = async (dormId: string): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        
        const response = await fetch(`${API_URL}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify({ dorm_id: dormId })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add to favorites');
        }

        console.log('✅ Added to favorites:', dormId);
    } catch (error) {
        console.error('❌ Error adding to favorites:', error);
        throw error;
    }
};

// ฟังก์ชันลบหอพักออกจากรายการโปรด
export const removeFromFavorites = async (dormId: string): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        
        const response = await fetch(`${API_URL}/favorites/${dormId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to remove from favorites');
        }

        console.log('✅ Removed from favorites:', dormId);
    } catch (error) {
        console.error('❌ Error removing from favorites:', error);
        throw error;
    }
};

// ฟังก์ชันเช็คว่าหอพักอยู่ในรายการโปรดหรือไม่
export const checkIsFavorite = async (dormId: string): Promise<boolean> => {
    try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            console.warn('⚠️ No auth token, skipping favorite check');
            return false;
        }
        
        const response = await fetch(`${API_URL}/favorites/check/${dormId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.warn('⚠️ Favorites API not available (404)');
            return false;
        }

        const data = await response.json();
        return data.isFavorite || false;

    } catch (error) {
        console.warn('⚠️ Error checking favorite status:', error);
        return false;
    }
};