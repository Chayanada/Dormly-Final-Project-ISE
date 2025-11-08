// import { useRef, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Interface สำหรับข้อมูลหอพักที่มาจาก backend
// interface Dorm {
//     id: number;
//     name: string;
//     location: string;
//     rating: number;
//     reviews: number;
//     price: number;
//     available: boolean;
//     availableRooms: number;
//     imageUrl?: string;
// }

// export default function HomePage() {
//     const navigate = useNavigate();
//     const [recommendedDorms, setRecommendedDorms] = useState<Dorm[]>([]);
//     const [bangkokDorms, setBangkokDorms] = useState<Dorm[]>([]);
//     const [promoDorms, setPromoDorms] = useState<Dorm[]>([]);
//     const [popularDorms, setPopularDorms] = useState<Dorm[]>([]);
//     const [newDorms, setNewDorms] = useState<Dorm[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchDorms = async () => {
//             try {
//                 setLoading(true);
                
//                 const [recommended, bangkok, promo, popular, newList] = await Promise.all([
//                     fetch('/api/dorms/recommended').then(res => res.json()),
//                     fetch('/api/dorms/bangkok').then(res => res.json()),
//                     fetch('/api/dorms/promo').then(res => res.json()),
//                     fetch('/api/dorms/popular').then(res => res.json()),
//                     fetch('/api/dorms/new').then(res => res.json())
//                 ]);

//                 setRecommendedDorms(recommended);
//                 setBangkokDorms(bangkok);
//                 setPromoDorms(promo);
//                 setPopularDorms(popular);
//                 setNewDorms(newList);
//             } catch (error) {
//                 console.error('Error fetching dorms:', error);
//                 const mockDorms = createMockDorms(1, 15);
//                 setRecommendedDorms(mockDorms);
//                 setBangkokDorms(createMockDorms(16, 15));
//                 setPromoDorms(createMockDorms(31, 15));
//                 setPopularDorms(createMockDorms(46, 15));
//                 setNewDorms(createMockDorms(61, 15));
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDorms();
//     }, []);

//     const createMockDorms = (startId: number, count: number): Dorm[] => {
//         return Array.from({ length: count }, (_, i) => ({
//             id: startId + i,
//             name: `ชื่อหอพัก ${startId + i}`,
//             location: `สถานที่ตั้ง ${startId + i}`,
//             rating: parseFloat((8.0 + Math.random() * 2).toFixed(1)),
//             reviews: Math.floor(1000 + Math.random() * 25000),
//             price: Math.floor((3000 + Math.random() * 9000) / 500) * 500,
//             available: Math.random() > 0.2,
//             availableRooms: Math.floor(Math.random() * 5) + 1,
//             imageUrl: undefined
//         }));
//     };

//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         // พาไปหน้า Search พร้อม query parameter
//         navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-xl text-gray-600">กำลังโหลด...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
//             <style>{`
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//             `}</style>

//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="search"
//                         className="w-full px-6 py-4 rounded-full bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//                     />
//                     <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
//                         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </button>
//                 </div>
//             </form>

//             <div className="space-y-8 sm:space-y-10 lg:space-y-12">
//                 <ScrollableSection
//                     title="หอพักแนะนำรีวิวเพียบ"
//                     dorms={recommendedDorms}
//                 />

//                 <ScrollableSection
//                     title="หอพักแนะนำใกล้กลางกรุงเทพฯ"
//                     dorms={bangkokDorms}
//                 />

//                 <ScrollableSection
//                     title="หอพักราคาโปรโมชั่นไม่ควรพลาดเทอม"
//                     dorms={promoDorms}
//                 />

//                 <ScrollableSection
//                     title="หอพักยอดนิยมของเดือนนี้"
//                     dorms={popularDorms}
//                 />

//                 <ScrollableSection
//                     title="หอพักใหม่เปิดให้บริการ"
//                     dorms={newDorms}
//                 />
//             </div>
//         </div>
//     );
// }

// interface ScrollableSectionProps {
//     title: string;
//     dorms: Dorm[];
// }

// function ScrollableSection({ title, dorms }: ScrollableSectionProps) {
//     const scrollContainerRef = useRef<HTMLDivElement>(null);

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         const container = scrollContainerRef.current;
//         if (!container) return;

//         const rect = container.getBoundingClientRect();
//         const x = e.clientX - rect.left;
        
//         const rightThreshold = rect.width * 0.7;
//         const leftThreshold = rect.width * 0.3;

//         if (x > rightThreshold) {
//             const scrollSpeed = ((x - rightThreshold) / (rect.width * 0.3)) * 30;
//             container.scrollLeft += scrollSpeed;
//         } else if (x < leftThreshold) {
//             const scrollSpeed = ((leftThreshold - x) / (rect.width * 0.3)) * 30;
//             container.scrollLeft -= scrollSpeed;
//         }
//     };

//     const scrollLeft = () => {
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.scrollBy({ left: -450, behavior: 'smooth' });
//         }
//     };

//     const scrollRight = () => {
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.scrollBy({ left: 450, behavior: 'smooth' });
//         }
//     };

//     return (
//         <section>
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//                 <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
                
//                 <div className="flex gap-2">
//                     <button
//                         onClick={scrollLeft}
//                         className="bg-white hover:bg-gray-50 shadow-md rounded-full p-2.5 transition-all hover:scale-110"
//                         aria-label="Scroll left"
//                     >
//                         <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                         </svg>
//                     </button>
                    
//                     <button
//                         onClick={scrollRight}
//                         className="bg-white hover:bg-gray-50 shadow-md rounded-full p-2.5 transition-all hover:scale-110"
//                         aria-label="Scroll right"
//                     >
//                         <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             <div
//                 ref={scrollContainerRef}
//                 onMouseMove={handleMouseMove}
//                 className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-pointer"
//                 style={{
//                     scrollBehavior: 'auto',
//                     WebkitOverflowScrolling: 'touch'
//                 }}
//             >
//                 {dorms.map((dorm) => (
//                     <div key={dorm.id} className="flex-shrink-0 w-96">
//                         <DormCard dorm={dorm} />
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }

// interface DormCardProps {
//     dorm: Dorm;
// }

// function DormCard({ dorm }: DormCardProps) {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(`/dorm/${dorm.id}`);
//     };

//     return (
//         <div 
//             onClick={handleClick}
//             className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02]"
//         >
//             <div className="w-full h-[216px] bg-gray-300 rounded-t-2xl overflow-hidden">
//                 {dorm.imageUrl ? (
//                     <img 
//                         src={dorm.imageUrl} 
//                         alt={dorm.name}
//                         className="w-full h-full object-cover"
//                     />
//                 ) : (
//                     <div className="w-full h-full bg-gray-300"></div>
//                 )}
//             </div>

//             <div className="p-4">
//                 <h3 className="font-semibold text-lg mb-1.5">{dorm.name}</h3>
                
//                 <div className="flex items-center justify-between mb-3">
//                     <p className="text-gray-600 text-base">{dorm.location}</p>
//                     <div className="flex items-center gap-1.5">
//                         <span className={`w-2.5 h-2.5 rounded-full ${dorm.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                         <span className="text-sm text-gray-600 font-medium">
//                             {dorm.available ? 'ว่าง' : 'เต็ม'}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-1.5">
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <svg 
//                                     key={i} 
//                                     className={`w-4 h-4 ${i < Math.floor(dorm.rating / 2) ? 'fill-current' : 'fill-gray-300'}`}
//                                     viewBox="0 0 20 20"
//                                 >
//                                     <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                                 </svg>
//                             ))}
//                         </div>
//                         <span className="text-sm text-gray-700 font-medium">
//                             {dorm.rating.toFixed(1)} ({dorm.reviews.toLocaleString()})
//                         </span>
//                     </div>
                    
//                     <p className="font-bold text-lg">{dorm.price.toLocaleString()}/เดือน</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:3001/api';

// Interface สำหรับข้อมูลหอพักที่มาจาก backend
interface Dorm {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    available: boolean;
    availableRooms: number;
    imageUrl?: string;
}

// ฟังก์ชันแปลงข้อมูลจาก Backend เป็นรูปแบบที่ Frontend ใช้
const adaptDormData = (backendDorm: any): Dorm => {
    return {
        id: backendDorm.dorm_id || backendDorm.id,
        name: backendDorm.dorm_name || backendDorm.name,
        location: backendDorm.address || 'ไม่ระบุที่อยู่',
        rating: 4.5, // Backend ไม่มี rating จริง ใช้ค่า default
        reviews: 285, // Backend ไม่มี reviews จริง ใช้ค่า default
        price: backendDorm.min_price || backendDorm.price_per_month || 0,
        available: (backendDorm.total_available_rooms || backendDorm.availableRooms || 0) > 0,
        availableRooms: backendDorm.total_available_rooms || backendDorm.availableRooms || 0,
        imageUrl: backendDorm.thumbnail_url || backendDorm.imageUrl || undefined
    };
};

export default function HomePage() {
    const navigate = useNavigate();
    const [recommendedDorms, setRecommendedDorms] = useState<Dorm[]>([]);
    const [bangkokDorms, setBangkokDorms] = useState<Dorm[]>([]);
    const [promoDorms, setPromoDorms] = useState<Dorm[]>([]);
    const [popularDorms, setPopularDorms] = useState<Dorm[]>([]);
    const [newDorms, setNewDorms] = useState<Dorm[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDorms = async () => {
            try {
                setLoading(true);
                
                // เรียก API search เพื่อดึงข้อมูลหอพัก
                // Backend มีแค่ /api/search ดังนั้นเราจะใช้ตัวนี้แล้วแบ่งข้อมูล
                const response = await axios.post(`${API_BASE_URL}/search`, {
                    // กรุงเทพฯ coordinates (ประมาณ)
                    lat: 13.7563,
                    lng: 100.5018,
                    radiusKm: 50,
                    hasAvailableRooms: true,
                    limit: 50
                }, {
                    withCredentials: true
                });

                const allDorms = response.data.data.map(adaptDormData);
                
                // แบ่งข้อมูลเป็น sections ต่างๆ
                // เนื่องจาก Backend ไม่มี API แยกตามหมวด เราจะใช้ข้อมูลเดียวกันแต่แบ่งออก
                const shuffled = [...allDorms].sort(() => Math.random() - 0.5);
                
                setRecommendedDorms(shuffled.slice(0, 10));
                setBangkokDorms(shuffled.slice(10, 20));
                setPromoDorms(shuffled.slice(20, 30));
                setPopularDorms(shuffled.slice(30, 40));
                setNewDorms(shuffled.slice(40, 50));

            } catch (error) {
        console.error('Error fetching dorms:', error);

        setRecommendedDorms(createMockDorms(1, 10));
        setBangkokDorms(createMockDorms(11, 10));
        setPromoDorms(createMockDorms(21, 10));
        setPopularDorms(createMockDorms(31, 10));
        setNewDorms(createMockDorms(41, 10));
    } finally {
        setLoading(false);
    }


    const createMockDorms = (startId: number, count: number): Dorm[] => {
        return Array.from({ length: count }, (_, i) => ({
            id: startId + i,
            name: `ชื่อหอพัก ${startId + i}`,
            location: `สถานที่ตั้ง ${startId + i}`,
            rating: parseFloat((8.0 + Math.random() * 2).toFixed(1)),
            reviews: Math.floor(1000 + Math.random() * 25000),
            price: Math.floor((3000 + Math.random() * 9000) / 500) * 500,
            available: Math.random() > 0.2,
            availableRooms: Math.floor(Math.random() * 5) + 1,
            imageUrl: `https://images.unsplash.com/photo-${1555854877 + i}-${Math.floor(Math.random() * 999999999)}?w=400&h=300&fit=crop`
        }));
    };
    

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // พาไปหน้า Search พร้อม query parameter
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <div className="text-xl text-gray-600">กำลังโหลดข้อมูล...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="search"
                        className="w-full px-6 py-4 rounded-full bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </form>

            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                <ScrollableSection
                    title="หอพักแนะนำรีวิวเพียบ"
                    dorms={recommendedDorms}
                />

                <ScrollableSection
                    title="หอพักแนะนำใจกลางกรุงเทพฯ"
                    dorms={bangkokDorms}
                />

                <ScrollableSection
                    title="หอพักราคาโปรโมชั่นไม่ควรพลาด"
                    dorms={promoDorms}
                />

                <ScrollableSection
                    title="หอพักยอดนิยมประจำเดือนนี้"
                    dorms={popularDorms}
                />

                <ScrollableSection
                    title="หอพักใหม่เปิดให้บริการ"
                    dorms={newDorms}
                />
            </div>
        </div>
    );
}

interface ScrollableSectionProps {
    title: string;
    dorms: Dorm[];
}

function ScrollableSection({ title, dorms }: ScrollableSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const rightThreshold = rect.width * 0.7;
        const leftThreshold = rect.width * 0.3;

        if (x > rightThreshold) {
            const scrollSpeed = ((x - rightThreshold) / (rect.width * 0.3)) * 30;
            container.scrollLeft += scrollSpeed;
        } else if (x < leftThreshold) {
            const scrollSpeed = ((leftThreshold - x) / (rect.width * 0.3)) * 30;
            container.scrollLeft -= scrollSpeed;
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -450, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        }
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
                
                <div className="flex gap-2">
                    <button
                        onClick={scrollLeft}
                        className="bg-white hover:bg-gray-50 shadow-md rounded-full p-2.5 transition-all hover:scale-110"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={scrollRight}
                        className="bg-white hover:bg-gray-50 shadow-md rounded-full p-2.5 transition-all hover:scale-110"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                onMouseMove={handleMouseMove}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-pointer"
                style={{
                    scrollBehavior: 'auto',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {dorms.map((dorm) => (
                    <div key={dorm.id} className="flex-shrink-0 w-96">
                        <DormCard dorm={dorm} />
                    </div>
                ))}
            </div>
        </section>
    );
}

interface DormCardProps {
    dorm: Dorm;
}

function DormCard({ dorm }: DormCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dorm/${dorm.id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02]"
        >
            <div className="w-full h-[216px] bg-gray-300 rounded-t-2xl overflow-hidden">
                {dorm.imageUrl ? (
                    <img 
                        src={dorm.imageUrl} 
                        alt={dorm.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // ถ้ารูปโหลดไม่ได้ ใช้ placeholder
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1.5 truncate">{dorm.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-600 text-base truncate mr-2">{dorm.location}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${dorm.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-sm text-gray-600 font-medium">
                            {dorm.available ? 'ว่าง' : 'เต็ม'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(dorm.rating / 2) ? 'fill-current' : 'fill-gray-300'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                            {dorm.rating.toFixed(1)} ({dorm.reviews.toLocaleString()})
                        </span>
                    </div>
                    
                    <p className="font-bold text-lg whitespace-nowrap">฿{dorm.price.toLocaleString()}/เดือน</p>
                </div>
            </div>
        </div>
    );
}