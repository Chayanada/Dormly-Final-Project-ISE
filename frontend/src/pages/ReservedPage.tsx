import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import RequireAuth from '../components/common/NeedLogin';
import { IoBedOutline, IoCalendarOutline, IoCloseCircleOutline } from 'react-icons/io5'; 
import { FaMoneyBillWave, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface Booking {
    id: string;
    dormName: string;
    dormImage?: string;
    roomType: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfMonths: number;
    totalPrice: number;
    status: 'รอการยืนยันจากเจ้าของหอพัก' | 'รอการชำระเงินมัดจำ' | 'ถูกยกเลิก' | 'ปฏิเสธ' | 'ชำระจำนวนครบล้ว' | 'อยู่ระหว่างเช่า' | 'หมดสัญญาแล้ว';
    dormId?: string;
}

type StatusType = 'all' | 'รอการยืนยันจากเจ้าของหอพัก' | 'รอการชำระเงินมัดจำ' | 'ถูกยกเลิก' | 'ปฏิเสธ' | 'ชำระจำนวนครบล้ว' | 'อยู่ระหว่างเช่า' | 'หมดสัญญาแล้ว';

const STATUS_TABS: { label: string; value: StatusType; icon: React.ReactNode; color: string }[] = [
    { label: 'ทั้งหมด', value: 'all', icon: <IoCalendarOutline />, color: 'text-gray-600' },
    { label: 'รอการยืนยัน', value: 'รอการยืนยันจากเจ้าของหอพัก', icon: <FaClock />, color: 'text-yellow-600' },
    { label: 'รอชำระมัดจำ', value: 'รอการชำระเงินมัดจำ', icon: <FaMoneyBillWave />, color: 'text-blue-600' },
    { label: 'ชำระครบแล้ว', value: 'ชำระจำนวนครบล้ว', icon: <FaCheckCircle />, color: 'text-green-600' },
    { label: 'อยู่ระหว่างเช่า', value: 'อยู่ระหว่างเช่า', icon: <IoBedOutline />, color: 'text-indigo-600' },
    { label: 'หมดสัญญาแล้ว', value: 'หมดสัญญาแล้ว', icon: <FaExclamationTriangle />, color: 'text-gray-500' },
    { label: 'ปฏิเสธ', value: 'ปฏิเสธ', icon: <IoCloseCircleOutline />, color: 'text-red-600' },
    { label: 'ถูกยกเลิก', value: 'ถูกยกเลิก', icon: <IoCloseCircleOutline />, color: 'text-red-600' },
];

export default function ReservedPage() {
    const { role } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<StatusType>('all');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const mockBookings: Booking[] = [
                    {
                        id: '1',
                        dormName: 'Central University Dorm',
                        roomType: 'Deluxe Single',
                        checkInDate: '2025/12/15',
                        checkOutDate: '2026/02/15',
                        numberOfMonths: 1,
                        totalPrice: 11400,
                        status: 'ชำระจำนวนครบล้ว',
                        dormId: '3',
                        dormImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80',
                    },
                ];

                setBookings(mockBookings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (role === 'guest' || !role) {
        return <RequireAuth />;
    }

    const getStatusStyle = (status: string): { bgColor: string, textColor: string, icon: React.ReactNode } => {
        switch (status) {
            case 'รอการยืนยันจากเจ้าของหอพัก':
                return { bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', icon: <FaClock className="w-4 h-4" /> };
            case 'รอการชำระเงินมัดจำ':
                return { bgColor: 'bg-blue-50', textColor: 'text-blue-700', icon: <FaMoneyBillWave className="w-4 h-4" /> };
            case 'ถูกยกเลิก':
                return { bgColor: 'bg-red-50', textColor: 'text-red-700', icon: <IoCloseCircleOutline className="w-4 h-4" /> };
            case 'ปฏิเสธ':
                return { bgColor: 'bg-red-50', textColor: 'text-red-700', icon: <IoCloseCircleOutline className="w-4 h-4" /> };
            case 'ชำระจำนวนครบล้ว':
                return { bgColor: 'bg-green-50', textColor: 'text-green-700', icon: <FaCheckCircle className="w-4 h-4" /> };
            case 'อยู่ระหว่างเช่า':
                return { bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', icon: <IoBedOutline className="w-4 h-4" /> };
            case 'หมดสัญญาแล้ว':
                return { bgColor: 'bg-gray-50', textColor: 'text-gray-600', icon: <FaExclamationTriangle className="w-4 h-4" /> };
            default:
                return { bgColor: 'bg-gray-50', textColor: 'text-gray-600', icon: <FaExclamationTriangle className="w-4 h-4" /> };
        }
    };
    const handlePayDeposit = (booking: Booking) => {
        if (!booking.dormId) return;

        const dormData = {
            dorm_id: Number(booking.dormId),
            dorm_name: booking.dormName,
            medias: booking.dormImage ? [booking.dormImage] : [],
            room_types: [{ rent_per_month: booking.totalPrice }],
        };

        navigate('/payment', { state: { dormData } });
    };


    const getActionButtons = (booking: Booking) => {
        const buttons = [];

        if (booking.status === 'รอการชำระเงินมัดจำ') {
            buttons.push(
                <button
                    key="pay"
                    onClick={() => handlePayDeposit(booking)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition text-sm"
                >
                    ชำระมัดจำ
                </button>
            );
        }

        if (booking.status === 'รอการยืนยันจากเจ้าของหอพัก' || booking.status === 'รอการชำระเงินมัดจำ') {
            buttons.push(
                <button
                    key="cancel"
                    className="px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition text-sm border border-red-300"
                >
                    ยกเลิกจอง
                </button>
            );
        }
        
        return buttons;
    };

    const handleViewDetails = (dormId?: string) => {
        if (dormId) {
            navigate(`/dorm/${dormId}`);
        }
    };

    const filteredBookings = activeTab === 'all' 
        ? bookings 
        : bookings.filter(b => b.status === activeTab);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-medium text-gray-600 animate-pulse">กำลังโหลดสถานะการจอง...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">สถานะการจองของฉัน</h1>
                <p className='text-gray-500 text-lg mb-10'>ติดตามการจองหอพักทั้งหมดของคุณที่นี่</p>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 pb-0 bg-white rounded-xl p-3 border border-gray-200">
                        {STATUS_TABS.map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`px-4 py-2 font-semibold text-sm transition duration-200 whitespace-nowrap rounded-lg flex items-center gap-2 ${
                                    activeTab === tab.value
                                        ? 'bg-purple-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {filteredBookings.length === 0 ? (
                        <div className="p-16 text-center text-gray-500">
                            <IoCloseCircleOutline className="w-12 h-12 mx-auto text-red-400 mb-4" />
                            <p className="text-xl font-semibold">ไม่พบการจองในสถานะ "{STATUS_TABS.find(t => t.value === activeTab)?.label}"</p>
                            <p className="text-base mt-2">โปรดลองเลือกดูสถานะอื่น หรือทำการจองหอพักใหม่</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ข้อมูลหอพัก
                                        </th>
                                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ประเภทห้อง
                                        </th>
                                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            วันที่เช่า
                                        </th>
                                        <th className="px-6 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            สถานะ
                                        </th>
                                        <th className="px-6 py-5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            การดำเนินการ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredBookings.map((booking) => {
                                        const statusStyle = getStatusStyle(booking.status);
                                        const actionButtons = getActionButtons(booking);

                                        return (
                                            <tr key={booking.id} className="hover:bg-gray-50 transition">
                                                {/* Dorm Info */}
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <img 
                                                            src={booking.dormImage || 'https://via.placeholder.com/64/F3F4F6/9CA3AF?text=D'} 
                                                            alt={booking.dormName} 
                                                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-gray-900 text-base truncate mb-2">
                                                                {booking.dormName}
                                                            </p>
                                                            <button
                                                                onClick={() => handleViewDetails(booking.dormId)}
                                                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition border border-gray-300"
                                                            >
                                                                ดูรายละเอียด
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Room Type */}
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center text-sm font-medium text-gray-900">
                                                        <IoBedOutline className="w-5 h-5 mr-2 text-indigo-500" />
                                                        {booking.roomType}
                                                    </div>
                                                </td>

                                                {/* Dates */}
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center text-sm text-gray-700">
                                                        <IoCalendarOutline className="w-5 h-5 mr-2 text-gray-400" />
                                                        <div>
                                                            <div className="font-medium">{booking.checkInDate}</div>
                                                            <div className="text-xs text-gray-500">ถึง {booking.checkOutDate}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-6">
                                                    <span
                                                        className={`px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 ${statusStyle.bgColor} ${statusStyle.textColor}`}
                                                    >
                                                        {statusStyle.icon}
                                                        {booking.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-6">
                                                    <div className="flex gap-2 justify-end">
                                                        {actionButtons.map((button) => button)}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}