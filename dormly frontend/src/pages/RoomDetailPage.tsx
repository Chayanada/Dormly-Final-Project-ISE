import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

// Types
interface RoomDetail {
    id: string;
    dormId: string;
    dormName: string;
    roomNumber: string;
    roomType: string;
    images: string[];
    pricePerMonth: number;
    deposit: number;
    advancePayment: number;
    waterRate: number;
    electricityRate: number;
    commonFee: number;
    details: {
        size: string;
        floor: string;
        maxOccupants: number;
        furniture: string;
        included: string[];
        rules: string[];
    };
    facilities: string[];
    status: 'available' | 'occupied';
    owner: {
        name: string;
        username: string;
        phone: string;
        lineId: string;
        rating: number;
        reviewCount: number;
        profileImage: string;
    };
}

export default function RoomDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const roomType = searchParams.get('type');
    const navigate = useNavigate();
    
    const [room, setRoom] = useState<RoomDetail | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        setIsAuthenticated(!!(token || user));
    }, []);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                // Mock data - ในการใช้งานจริงจะดึงจาก API ตาม id และ roomType
                const mockData: RoomDetail = {
                    id: '1',
                    dormId: id || '1',
                    dormName: 'ชื่อหอพัก 1',
                    roomNumber: '3041',
                    roomType: roomType || 'พัดลม/เดี่ยว',
                    images: [
                        '/images/room1.jpg',
                        '/images/room2.jpg',
                        '/images/room3.jpg',
                    ],
                    pricePerMonth: 4000,
                    deposit: 1000,
                    advancePayment: 400,
                    waterRate: 5,
                    electricityRate: 10,
                    commonFee: 399,
                    details: {
                        size: '24 ตร. ม.',
                        floor: '3',
                        maxOccupants: 2,
                        furniture: 'ชาย/หญิง/ไม่จำกัด',
                        included: ['เตียง 2 หลัง', 'ตู้เสื้อผ้า', 'โต๊ะ-เก้าอี้', 'เคาน์เตอร์ครอบครัว', 'เก้าอี้'],
                        rules: ['ไม่อนุญาตให้เลี้ยงสัตว์', 'ห้ามจัดปาร์ตี้']
                    },
                    facilities: [
                        'Wifi',
                        'แอร์',
                        'เครื่องทำน้ำอุ่น',
                        'ตู้เย็น',
                        'ส่วนรวมสิ่งอำนวยความสะดวก',
                        'ที่จอดรถยนต์',
                        'ที่จอดรถมอเตอร์ไซค์',
                        'ลิฟท์',
                        'ฟิตเนส',
                        'สระว่ายน้ำ',
                        'ซักผ้า',
                        'สิ่งเสริม',
                        'ตัวเลือก'
                    ],
                    status: 'available',
                    owner: {
                        name: 'Mr. Somchai Aree',
                        username: '@somchai_dorm',
                        phone: '088-888-8888',
                        lineId: '@somchai_dorm',
                        rating: 10.0,
                        reviewCount: 2093,
                        profileImage: '/images/owner.jpg'
                    }
                };
                
                setRoom(mockData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [id, roomType]);

    const handleFavoriteToggle = () => {
        if (!isAuthenticated) {
            alert('กรุณาเข้าสู่ระบบก่อนเพิ่มหอพักโปรด');
            navigate('/login');
            return;
        }
        setIsFavorite(!isFavorite);
    };

    const handleContactOwner = () => {
        console.log('Contact owner');
    };

    const handleBooking = () => {
        if (!isAuthenticated) {
            alert('กรุณาเข้าสู่ระบบก่อนจองหอพัก');
            navigate('/login');
            return;
        }
        navigate(`/booking/${id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">กำลังโหลด...</div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">ไม่พบข้อมูลห้องพัก</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <div className="flex-1 mr-96">
                <div className="py-8">
                    {/* Header */}
                    <h1 className="text-3xl font-bold mb-8 px-6">{room.dormName} - ห้อง {room.roomNumber}</h1>

                    {/* Images Gallery */}
                    <div className="grid grid-cols-2 gap-4 mb-8 px-6">
                        {/* Main Image */}
                        <div className="col-span-1 row-span-2 bg-gray-200 rounded-xl overflow-hidden h-full">
                            <img 
                                src={room.images[selectedImageIndex]} 
                                alt="Room main" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Side Images */}
                        <div className="bg-gray-200 rounded-xl overflow-hidden h-48">
                            <img 
                                src={room.images[1] || room.images[0]} 
                                alt="Room 2" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="bg-gray-200 rounded-xl overflow-hidden h-48 relative">
                            <img 
                                src={room.images[2] || room.images[0]} 
                                alt="Room 3" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <button className="px-6 py-2 bg-white rounded-full text-sm font-medium hover:bg-gray-100 transition">
                                    ดูรูปภาพเพิ่มเติม
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="grid grid-cols-2 gap-6 px-6">
                    {/* Left Column - Room Info */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-6">เงื่อนไขห้องพัก</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">ขนาดห้อง:</span>
                                <span className="font-medium">{room.details.size}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">ประเภทห้อง:</span>
                                <span className="font-medium">{room.roomType}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">จำนวนผู้อยู่อาศัยสูงสุด:</span>
                                <span className="font-medium">{room.details.maxOccupants} คน</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">เฟอร์นิเจอร์:</span>
                                <span className="font-medium">{room.details.furniture}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">เฟอร์นิเจอร์ในห้อง:</span>
                                <span className="font-medium">{room.details.included.join(', ')}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">ระเบียบข้อบังคับของหอพัก:</span>
                                <span className="font-medium">{room.details.rules.join(' ')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Facilities */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-6">สิ่งอำนวยความสะดวกในหอพัก</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {room.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-sm">• {facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Right Sidebar - Fixed */}
            <div className="w-96 fixed right-0 top-0 h-full overflow-y-auto bg-gray-50 border-l border-gray-200 p-6">
                <div className="space-y-6">
                    {/* Room Price Card */}
                    <div className="bg-purple-50 rounded-xl p-6 shadow-sm border border-purple-200">
                        <h3 className="text-2xl font-bold text-purple-600 mb-6">ห้อง {room.roomNumber}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">รายเดือน:</span>
                                <span className="font-medium">{room.pricePerMonth.toLocaleString()} บาท/เดือน</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">รายวัน:</span>
                                <span className="font-medium">{room.advancePayment} บาท/วัน</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">เงินประกัน:</span>
                                <span className="font-medium">{room.deposit.toLocaleString()} บาท</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">จ่ายล่วงหน้า:</span>
                                <span className="font-medium">{room.details.maxOccupants} เดือน</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">ค่าไฟ:</span>
                                <span className="font-medium">{room.electricityRate} บาท/ยูนิต</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700">อินเตอร์เน็ต:</span>
                                <span className="font-medium">{room.waterRate} บาท/ยูนิต</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-700 ">ค่าบริการอื่นๆ:</span>
                                <span className="font-medium">{room.commonFee} บาท/เดือน</span>
                            </div>
                        </div>
                    </div>

                    {/* Owner Information */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg mb-6">Owner Information</h3>
                        <div className="flex items-start gap-4 mb-6">
                            <img 
                                src={room.owner.profileImage} 
                                alt={room.owner.name} 
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="font-bold text-base mb-1">{room.owner.name}</div>
                                <div className="text-sm text-gray-600 mb-2">{room.owner.username}</div>
                                <div className="flex items-center gap-1 text-sm">
                                    <span className="text-yellow-500">★★★★★</span>
                                    <span className="text-gray-600 ml-1">
                                        {room.owner.rating} ({room.owner.reviewCount.toLocaleString()})
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">ชื่อ:</span>
                                <span className="font-medium">{room.owner.name.split(' ')[1]} {room.owner.name.split(' ')[2]}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">เบอร์โทร:</span>
                                <span className="font-medium">{room.owner.phone}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Line:</span>
                                <span className="font-medium">{room.owner.lineId}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleContactOwner}
                            className="w-full px-4 py-3 border-2 border-gray-800 text-gray-800 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition"
                        >
                            ติดต่อเจ้าของหอพัก
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <button 
                        onClick={handleFavoriteToggle}
                        disabled={!isAuthenticated}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                            !isAuthenticated
                                ? 'bg-gray-200 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                                : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                        }`}
                    >
                        {isAuthenticated ? 'แอดหอพักโปรด' : 'เข้าสู่ระบบเพื่อแอด'}
                    </button>

                    <button 
                        onClick={handleBooking}
                        disabled={!isAuthenticated}
                        className={`w-full px-4 py-4 rounded-lg font-medium text-lg transition ${
                            isAuthenticated
                                ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        จองหอพัก
                    </button>
                </div>
            </div>
        </div>
    );
}