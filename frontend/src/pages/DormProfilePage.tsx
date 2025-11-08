import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Types
interface DormRoom {
    id: string;
    roomNumber: string;
    roomType: string;
    price: number;
    status: 'available' | 'occupied';
    imageUrl: string;
}

interface DormDetail {
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
    rooms: DormRoom[];
}

type TabType = 'overview' | 'rooms' | 'booking' | 'facilities' | 'terms' | 'reviews' | 'map' | 'others';

export default function DormDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [dorm, setDorm] = useState<DormDetail | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // (NEW 2) State สำหรับ filter ประเภทห้อง
    const [selectedRoomTypeFilter, setSelectedRoomTypeFilter] = useState<string>('all');
    
    // (NEW 3 & 4) State สำหรับ Image Gallery Modal
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImageIndex, setGalleryImageIndex] = useState(0);

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        setIsAuthenticated(!!(token || user));
    }, []);

    useEffect(() => {
        const fetchDormDetails = async () => {
            try {
                const mockData: DormDetail = {
                    id: id || '1',
                    name: 'ชื่อหอพัก 1',
                    images: [
                        '/images/dorm1.jpg',
                        '/images/dorm2.jpg',
                        '/images/dorm3.jpg',
                        '/images/dorm4.jpg',
                        '/images/dorm5.jpg',
                    ],
                    description: 'หอพักใกล้มหาวิทยาลัย สะอาด ปลอดภัย มีกล้องวงจรปิด และ เจ้าหน้าที่รักษาความปลอดภัย 24 ชั่วโมง',
                    facilities: ['แอร์', 'สัตว์เลี้ยง', 'Wifi', 'ฟิตเนส', 'สระว่ายน้ำ', 'เครื่องซักผ้า'],
                    totalRooms: 50,
                    availableRooms: 12,
                    owner: {
                        name: 'Mr. Somchai Aree',
                        phone: '088-888-8888',
                        email: 'somchai@email.com',
                        lineId: '@somchai_dorm',
                        rating: 4.5,
                        reviewCount: 285,
                        profileImage: '/images/owner.jpg'
                    },
                    rooms: [
                        {
                            id: '1',
                            roomNumber: '3041',
                            roomType: 'พัดลม/เดี่ยว',
                            price: 2700,
                            status: 'available',
                            imageUrl: '/images/room1.jpg'
                        },
                        {
                            id: '2',
                            roomNumber: '3042',
                            roomType: 'พัดลม/เดี่ยว',
                            price: 2700,
                            status: 'available',
                            imageUrl: '/images/room2.jpg'
                        },
                        {
                            id: '3',
                            roomNumber: '3043',
                            roomType: 'แอร์/เดี่ยว',
                            price: 3200,
                            status: 'available',
                            imageUrl: '/images/room3.jpg'
                        },
                        {
                            id: '4',
                            roomNumber: '3044',
                            roomType: 'แอร์/เดี่ยว',
                            price: 3200,
                            status: 'available',
                            imageUrl: '/images/room4.jpg'
                        },
                        {
                            id: '5',
                            roomNumber: '3045',
                            roomType: 'แอร์/คู่',
                            price: 4500,
                            status: 'available',
                            imageUrl: '/images/room5.jpg'
                        },
                        {
                            id: '6',
                            roomNumber: '3046',
                            roomType: 'แอร์/คู่',
                            price: 4500,
                            status: 'occupied',
                            imageUrl: '/images/room6.jpg'
                        },
                    ]
                };
                
                setDorm(mockData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dorm details:', error);
                setLoading(false);
            }
        };

        fetchDormDetails();
    }, [id]);

    // (NEW 2) ฟังก์ชันดึงประเภทห้องที่ไม่ซ้ำกัน
    const getUniqueRoomTypes = () => {
        if (!dorm) return [];
        const types = new Set(dorm.rooms.map(room => room.roomType));
        return Array.from(types);
    };

    // (NEW 2) ฟังก์ชัน filter ห้องตามประเภท
    const getFilteredRooms = () => {
        if (!dorm) return [];
        if (selectedRoomTypeFilter === 'all') return dorm.rooms;
        return dorm.rooms.filter(room => room.roomType === selectedRoomTypeFilter);
    };

    // (NEW 3) ฟังก์ชันเปิด Gallery Modal
    const openGallery = (index: number) => {
        setGalleryImageIndex(index);
        setIsGalleryOpen(true);
    };

    // (NEW 3) ฟังก์ชันปิด Gallery Modal
    const closeGallery = () => {
        setIsGalleryOpen(false);
    };

    // (NEW 3) ฟังก์ชันเลื่อนรูปภาพถัดไป
    const nextImage = () => {
        if (!dorm) return;
        setGalleryImageIndex((prev) => (prev + 1) % dorm.images.length);
    };

    // (NEW 3) ฟังก์ชันเลื่อนรูปภาพก่อนหน้า
    const prevImage = () => {
        if (!dorm) return;
        setGalleryImageIndex((prev) => (prev - 1 + dorm.images.length) % dorm.images.length);
    };

    // (NEW 3) Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isGalleryOpen) return;
            
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeGallery();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGalleryOpen]);

    const handleFavoriteToggle = () => {
        if (!isAuthenticated) {
            alert('กรุณาเข้าสู่ระบบก่อนเพิ่มหอพักโปรด');
            navigate('/login');
            return;
        }
        setIsFavorite(!isFavorite);
    };

    const handleRoomDetailClick = (roomType: string) => {
        navigate(`/dorm/${id}/room-detail?type=${encodeURIComponent(roomType)}`);
    };

    const handleContactOwner = () => {
        console.log('Contact owner');
    };

    const tabs = [
        { id: 'overview' as TabType, label: 'รายละเอียดหอพัก' },
        { id: 'rooms' as TabType, label: 'ห้องพัก' },
        { id: 'booking' as TabType, label: 'การจอง' },
        { id: 'facilities' as TabType, label: 'สิ่งอำนวยความสะดวก' },
        { id: 'terms' as TabType, label: 'ข้อกำหนด/เงื่อนไข' },
        { id: 'reviews' as TabType, label: 'รีวิว' },
        { id: 'map' as TabType, label: 'แผนที่' },
        { id: 'others' as TabType, label: 'อื่นๆ' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">กำลังโหลด...</div>
            </div>
        );
    }

    if (!dorm) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">ไม่พบข้อมูลหอพัก</div>
            </div>
        );
    }

    // (NEW 2) Component สำหรับแสดงห้องพัก พร้อม filter
    const RoomsList = () => {
        const uniqueRoomTypes = getUniqueRoomTypes();
        const filteredRooms = getFilteredRooms();

        return (
            <div>
                <div className="flex flex-col gap-4 mb-6">
                    <h2 className="text-xl font-bold">ประเภทห้องพัก</h2>
                    
                    {/* (NEW 2) Room Type Filter */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedRoomTypeFilter('all')}
                            className={`px-3 py-2 text-sm rounded-lg font-medium transition ${
                                selectedRoomTypeFilter === 'all'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            ทั้งหมด ({dorm.rooms.length})
                        </button>
                        {uniqueRoomTypes.map((roomType) => {
                            const count = dorm.rooms.filter(r => r.roomType === roomType).length;
                            return (
                                <button
                                    key={roomType}
                                    onClick={() => setSelectedRoomTypeFilter(roomType)}
                                    className={`px-3 py-2 text-sm rounded-lg font-medium transition ${
                                        selectedRoomTypeFilter === roomType
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {roomType} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Room Cards */}
                <div className="grid grid-cols-2 gap-6">
                    {filteredRooms.map((room) => (
                        <div key={room.id} className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition">
                            <div className="bg-gray-300 h-56 flex items-center justify-center relative">
                                <img src={room.imageUrl} alt={room.roomType} className="w-full h-full object-cover" />
                                {room.status === 'occupied' && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        ไม่ว่าง
                                    </div>
                                )}
                                {room.status === 'available' && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        ว่าง
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="text-sm text-gray-600 mb-2">ห้อง: {room.roomNumber}</div>
                                <div className="text-sm text-gray-700 mb-2 font-medium">ประเภท: {room.roomType}</div>
                                <div className="text-lg font-bold text-purple-600 mb-4">
                                    ฿{room.price.toLocaleString()}/เดือน
                                </div>
                                <button 
                                    onClick={() => handleRoomDetailClick(room.roomType)}
                                    disabled={room.status === 'occupied'}
                                    className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                                        room.status === 'occupied'
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-800 text-white hover:bg-gray-700'
                                    }`}
                                >
                                    {room.status === 'occupied' ? 'ไม่ว่าง' : 'ดูรายละเอียด'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRooms.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        ไม่พบห้องพักประเภทนี้
                    </div>
                )}
            </div>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="bg-gray-100 rounded-lg p-6">
                            <h2 className="font-bold text-lg mb-4">รายละเอียดหอพัก</h2>
                            <p className="text-gray-700">{dorm.description}</p>
                        </div>

                        {/* Room Types in Overview Tab */}
                        <RoomsList />
                    </div>
                );
            
            case 'rooms':
                return <RoomsList />;
            
            case 'booking':
                return (
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">การจอง</h2>
                        <p className="text-gray-700">ข้อมูลการจอง...</p>
                    </div>
                );
            
            case 'facilities':
                return (
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">สิ่งอำนวยความสะดวก</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {dorm.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base">{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 'terms':
                return (
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">ข้อกำหนด/เงื่อนไข</h2>
                        <p className="text-gray-700">ข้อกำหนดและเงื่อนไขการเช่าหอพัก...</p>
                    </div>
                );
            
            case 'reviews':
                return (
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">รีวิว</h2>
                        <p className="text-gray-700">รีวิวจากผู้เช่า...</p>
                    </div>
                );
            
            case 'map':
                return (
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">แผนที่</h2>
                        <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
                            <span className="text-gray-600">Google Map</span>
                        </div>
                    </div>
                );
            
            default:
                return (
                    <div className="bg-gray-100 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">อื่นๆ</h2>
                        <p className="text-gray-700">ข้อมูลเพิ่มเติม...</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* (NEW 3 & 4) Image Gallery Modal */}
            {isGalleryOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
                    onClick={closeGallery}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeGallery}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-medium z-50">
                        {galleryImageIndex + 1} / {dorm.images.length}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                        className="absolute left-4 text-white hover:text-gray-300 z-50"
                    >
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Main Image */}
                    <div 
                        className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={dorm.images[galleryImageIndex]}
                            alt={`Gallery ${galleryImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                        className="absolute right-4 text-white hover:text-gray-300 z-50"
                    >
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
                        {dorm.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryImageIndex(index);
                                }}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                                    index === galleryImageIndex
                                        ? 'border-white'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Left Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 fixed h-full left-0 top-0 overflow-y-auto">
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-black rounded-lg"></div>
                        <span className="font-bold text-lg">Dormly</span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 mb-8">
                        <a href="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </a>
                        <a href="/search" className="flex items-center gap-3 px-4 py-3 bg-purple-100 text-purple-600 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </a>
                        <a href="/favorites" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Favorites
                        </a>
                        <a href="/chat" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg relative">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Chat
                            <span className="absolute right-4 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </a>
                        <a href="/reserved" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Reserved
                        </a>
                        <a href="/review" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Review
                        </a>
                    </nav>

                    {/* Bottom Navigation */}
                    <div className="space-y-2 border-t border-gray-200 pt-4">
                        <a href="/notifications" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg relative">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="text-sm">Notifications</span>
                            <span className="absolute right-4 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">10</span>
                        </a>
                        <a href="/support" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="text-sm">Support</span>
                        </a>
                        <a href="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">Settings</span>
                        </a>
                    </div>

                    {/* User Profile */}
                    <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg">
                        <img src="/images/profile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <div className="font-medium text-sm">Frankie Sullivan</div>
                            <div className="text-xs text-gray-500">@frankie</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 mr-96">
                <div className="py-8">
                    <h1 className="text-4xl font-bold mb-6 px-6">{dorm.name}</h1>

                    {/* Image Gallery (NEW 3: เพิ่มการคลิกดูรูปภาพขยาย) */}
                    <div className="grid grid-cols-2 gap-4 mb-8 px-6">
                        {/* Main Image */}
                        <div 
                            className="col-span-2 bg-gray-200 rounded-xl overflow-hidden h-96 cursor-pointer"
                            onClick={() => openGallery(selectedImageIndex)}
                        >
                            <img 
                                src={dorm.images[selectedImageIndex]} 
                                alt="Dorm main" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {/* Thumbnail Images */}
                        {dorm.images.slice(1, 3).map((image, index) => (
                            <div 
                                key={index}
                                onClick={() => {
                                    setSelectedImageIndex(index + 1);
                                    openGallery(index + 1);
                                }}
                                className="bg-gray-200 rounded-xl overflow-hidden h-48 cursor-pointer relative group"
                            >
                                <img 
                                    src={image} 
                                    alt={`Dorm ${index + 2}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                                {/* (NEW 4) ปุ่มดูรูปภาพทั้งหมด */}
                                {index === 1 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openGallery(0);
                                            }}
                                            className="px-8 py-3 bg-white rounded-full font-medium hover:bg-gray-100 transition"
                                        >
                                            ดูรูปภาพทั้งหมด ({dorm.images.length})
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-x-auto mx-6">
                        <div className="flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-4 text-base font-medium whitespace-nowrap transition ${
                                        activeTab === tab.id
                                            ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="pb-8 px-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Fixed */}
            <div className="w-96 fixed right-0 top-0 h-full overflow-y-auto bg-gray-50 border-l border-gray-200 p-6">
                <div className="space-y-6">
                    {/* Occupancy Status */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg mb-6">Occupancy Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 rounded-xl p-6 text-center">
                                <div className="text-3xl font-bold mb-2">{dorm.availableRooms}</div>
                                <div className="text-sm text-gray-600">ห้องว่าง</div>
                            </div>
                            <div className="bg-gray-100 rounded-xl p-6 text-center">
                                <div className="text-3xl font-bold mb-2">{dorm.totalRooms - dorm.availableRooms}</div>
                                <div className="text-sm text-gray-600">ห้องมีผู้เช่าแล้ว</div>
                            </div>
                        </div>
                    </div>

                    {/* Owner Information */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg mb-6">Owner Information</h3>
                        <div className="flex items-start gap-4 mb-6">
                            <img 
                                src={dorm.owner.profileImage} 
                                alt={dorm.owner.name} 
                                className="w-20 h-20 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="font-bold text-base mb-2">{dorm.owner.name}</div>
                                <div className="flex items-center gap-1 text-sm text-yellow-500">
                                    {'★'.repeat(Math.floor(dorm.owner.rating))}
                                    {'☆'.repeat(5 - Math.floor(dorm.owner.rating))}
                                    <span className="text-gray-600 ml-1">
                                        {dorm.owner.rating} ({dorm.owner.reviewCount})
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">ติดต่อ:</span>
                                <span className="font-medium">{dorm.owner.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">เบอร์โทร:</span>
                                <span className="font-medium">{dorm.owner.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Line:</span>
                                <span className="font-medium">{dorm.owner.lineId}</span>
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
                        className={`w-full px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                            !isAuthenticated
                                ? 'bg-gray-200 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                                : isFavorite 
                                ? 'bg-red-50 text-red-600 border-2 border-red-600' 
                                : 'bg-white text-gray-800 border-2 border-gray-300 hover:border-gray-400'
                        }`}
                    >
                        <svg className={`w-6 h-6 ${isFavorite ? 'fill-red-600' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {isAuthenticated ? (isFavorite ? 'ลบออกจากหอพักโปรด' : 'แอดเป็นหอพักโปรด') : 'เข้าสู่ระบบเพื่อแอด'}
                    </button>

                    <button 
                        onClick={() => {
                            if (isAuthenticated) {
                                navigate(`/booking/${id}`);
                            }
                        }}
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