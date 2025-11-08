import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoBedOutline } from 'react-icons/io5';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

// ข้อมูลจำลองสำหรับคำขอจอง (ไม่ได้เปลี่ยนแปลง)
interface DormRequest {
    id: string;
    tenantName: string;
    tenantImage?: string;
    roomType: string;
    checkInDate: string; // YYYY/MM/DD
    numberOfMonths: number;
    totalPrice: number;
    dormName: string;
    status: 'รอการอนุมัติ' | 'อนุมัติแล้ว' | 'ปฏิเสธ';
}

type StatusType = 'all' | 'รอการอนุมัติ' | 'อนุมัติแล้ว' | 'ปฏิเสธ';

const mockRequests: DormRequest[] = [
    {
        id: '1',
        tenantName: 'thanit_s',
        tenantImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
        roomType: 'Standard Single',
        checkInDate: '2025/12/01',
        numberOfMonths: 6,
        totalPrice: 19200,
        dormName: 'Central University Dorm',
        status: 'อนุมัติแล้ว',
    },
    {
        id: '2',
        tenantName: 'kritsada_s',
        tenantImage: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=500&q=80',
        roomType: 'Twin Room',
        checkInDate: '2025/12/1',
        numberOfMonths: 12,
        totalPrice: 38400,
        dormName: 'Central University Dorm',
        status: 'รอการอนุมัติ',
    },
    {
        id: '3',
        tenantName: 'kittiphong_s',
        tenantImage: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=500&q=80',
        roomType: 'Twin Room',
        checkInDate: '2025/10/25',
        numberOfMonths: 1,
        totalPrice: 2900,
        dormName: 'Central University Dorm',
        status: 'ปฏิเสธ',
    },
    {
        id: '4',
        tenantName: 'somchai_s',
        tenantImage: 'https://via.placeholder.com/64/C0392B/FFFFFF?text=ช',
        roomType: 'Deluxe Single',
        checkInDate: '2025/12/15',
        numberOfMonths: 3,
        totalPrice: 11400,
        dormName: 'Central University Dorm',
        status: 'รอการอนุมัติ',
    },
];

const SummaryCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-base font-medium text-gray-500">{title}</p>
            <p className="mt-1 text-4xl font-extrabold text-gray-900">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full bg-gray-100 text-gray-900`}> 
            {icon}
        </div>
    </div>
);

export default function TenantReservationPage() {
    const [requests, setRequests] = useState<DormRequest[]>(mockRequests); 
    const [activeTab, setActiveTab] = useState<StatusType>('all');
    const navigate = useNavigate();

    const handleStatusChange = (id: string, newStatus: 'อนุมัติแล้ว' | 'ปฏิเสธ') => {
        console.log(`Request ${id} status changed to ${newStatus}`);
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === id ? { ...req, status: newStatus } : req
            )
        );
    };

    const getStatusStyle = (status: string): { bgColor: string, textColor: string, icon: React.ReactNode, borderColor: string } => {
        switch (status) {
            case 'รอการอนุมัติ':
                return { bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', icon: <FaClock className="w-4 h-4" />, borderColor: 'border-yellow-300' };
            case 'อนุมัติแล้ว':
                return { bgColor: 'bg-green-50', textColor: 'text-green-700', icon: <IoCheckmarkCircleOutline className="w-4 h-4" />, borderColor: 'border-green-300' };
            case 'ปฏิเสธ':
                return { bgColor: 'bg-red-50', textColor: 'text-red-700', icon: <IoCloseCircleOutline className="w-4 h-4" />, borderColor: 'border-red-300' };
            default:
                return { bgColor: 'bg-gray-50', textColor: 'text-gray-700', icon: <FaCalendarAlt className="w-4 h-4" />, borderColor: 'border-gray-300' };
        }
    };

    const calculateTabCounts = (data: DormRequest[]) => {
        const counts: Record<StatusType, number> = {
            all: data.length,
            'รอการอนุมัติ': data.filter(r => r.status === 'รอการอนุมัติ').length,
            'อนุมัติแล้ว': data.filter(r => r.status === 'อนุมัติแล้ว').length,
            'ปฏิเสธ': data.filter(r => r.status === 'ปฏิเสธ').length,
        };
        
        return [
            { label: 'ทั้งหมด', value: 'all' as StatusType, count: counts.all },
            { label: 'รอการอนุมัติ', value: 'รอการอนุมัติ' as StatusType, count: counts['รอการอนุมัติ'] },
            { label: 'อนุมัติแล้ว', value: 'อนุมัติแล้ว' as StatusType, count: counts['อนุมัติแล้ว'] },
            { label: 'ปฏิเสธ', value: 'ปฏิเสธ' as StatusType, count: counts.ปฏิเสธ },
        ];
    };

    const tabCounts = calculateTabCounts(requests);

    const filteredRequests = activeTab === 'all'
        ? requests
        : requests.filter(r => r.status === activeTab);

    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === 'รอการอนุมัติ').length;
    const approvedRequests = requests.filter(r => r.status === 'อนุมัติแล้ว').length;
    const rejectedRequests = requests.filter(r => r.status === 'ปฏิเสธ').length;

    // --- JSX (Return) ---
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">สถานะการจองหอพักของฉัน</h1>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-10">
                    <SummaryCard 
                        title="คำขอทั้งหมด" 
                        value={totalRequests} 
                        icon={<FaCalendarAlt className="w-6 h-6" />} 
                    />
                    <SummaryCard 
                        title="รอการอนุมัติ" 
                        value={pendingRequests} 
                        icon={<FaClock className="w-6 h-6" />} 
                    />
                    <SummaryCard 
                        title="อนุมัติแล้ว" 
                        value={approvedRequests} 
                        icon={<IoCheckmarkCircleOutline className="w-6 h-6" />} 
                    />
                    <SummaryCard 
                        title="ปฏิเสธ/ยกเลิก" 
                        value={rejectedRequests} 
                        icon={<IoCloseCircleOutline className="w-6 h-6" />} 
                    />
                </div>

                {/* Tabs - เปลี่ยนสีกลับไปเป็นสีม่วง */}
                <div className="mb-8 p-1 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="flex flex-wrap gap-1">
                        {tabCounts.map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`
                                    px-4 py-2 font-medium text-base transition duration-150 whitespace-nowrap 
                                    flex items-center gap-1.5 h-10 
                                    ${
                                        activeTab === tab.value
                                            ? 'bg-purple-50 text-purple-700 rounded-lg' // ใช้สี Purple
                                            : 'text-gray-600 hover:bg-gray-100 rounded-lg'
                                    }
                                `}
                            >
                                {tab.label}
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-sm font-bold ${
                                    activeTab === tab.value ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700' // ใช้สี Purple
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {filteredRequests.length === 0 ? (
                        <div className="p-16 text-center text-gray-500">
                            <FaCalendarAlt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-xl font-semibold">ไม่พบคำขอจองในสถานะ "{tabCounts.find(t => t.value === activeTab)?.label}"</p>
                            <p className="text-base mt-2">โปรดลองเลือกดูสถานะอื่น</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider min-w-[250px]">
                                            ผู้เช่าและหอพัก
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider min-w-[120px]">
                                            ประเภทห้อง
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider min-w-[150px]">
                                            ข้อมูลการจอง
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider min-w-[120px]">
                                            สถานะ
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-bold text-gray-600 uppercase tracking-wider min-w-[180px]">
                                            ดำเนินการ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRequests.map((request) => {
                                        const statusStyle = getStatusStyle(request.status);
                                        return (
                                            <tr key={request.id}>
                                                {/* Tenant and Dorm Info */}
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={request.tenantImage || 'https://via.placeholder.com/40/F3F4F6/9CA3AF?text=U'}
                                                            alt={request.tenantName}
                                                            className="w-10 h-10 object-cover rounded-full flex-shrink-0 border border-gray-200"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-base font-semibold text-gray-900 truncate">{request.tenantName}</p>
                                                            <p className="text-sm text-gray-500 truncate">
                                                                {request.dormName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Room Type */}
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    {/* เปลี่ยนสี icon เป็นสี Purple */}
                                                    <div className="text-base text-gray-700 flex items-center">
                                                        <IoBedOutline className="w-5 h-5 mr-2 text-purple-500" />
                                                        {request.roomType}
                                                    </div>
                                                </td>

                                                {/* Booking Details */}
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <div className="text-base">
                                                        <div className="text-gray-700">เข้าอยู่: <span className="font-medium">{request.checkInDate}</span></div>
                                                        <div className="text-sm text-gray-500">เช่า: {request.numberOfMonths} เดือน</div>
                                                        <div className="text-lg text-green-600 font-bold mt-1">
                                                            {request.totalPrice.toLocaleString()} ฿
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span
                                                        className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 ${statusStyle.bgColor} ${statusStyle.textColor} border ${statusStyle.borderColor}`}
                                                    >
                                                        {statusStyle.icon}
                                                        {request.status}
                                                    </span>
                                                </td>

                                                {/* Actions - ปุ่มยังคงทำงานได้ */}
                                                <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex gap-3 justify-end">
                                                        {request.status === 'รอการอนุมัติ' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => handleStatusChange(request.id, 'ปฏิเสธ')}
                                                                    className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition text-sm border border-red-300"
                                                                >
                                                                    ปฏิเสธ
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatusChange(request.id, 'อนุมัติแล้ว')}
                                                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-sm" // ใช้สี Purple
                                                                >
                                                                    อนุมัติ
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => { /* Navigate to detail page */ }}
                                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition border border-gray-300"
                                                            >
                                                                ดูรายละเอียด
                                                            </button>
                                                        )}
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