import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import RequireAuth from '../components/common/NeedLogin';

interface RoomType {
    id: string;
    name: string;
    price: number;
}

interface DormData {
    id: string;
    name: string;
    roomTypes: RoomType[];
}

interface BookingData {
    dormId: string;
    dormName: string;
    roomTypeId: string;
    roomTypeName: string;
    roomPrice: number;
    checkInDate: string;
    checkOutDate: string;
    numberOfMonths: number;
}

interface CalendarState {
    isOpen: boolean;
    currentDate: Date;
    selectedStart: string;
    selectedEnd: string;
}

export default function BookingPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { role } = useAuth();

    // Check authentication - redirect if not logged in
    if (role === 'guest' || !role) {
        return <RequireAuth />;
    }

    const [dorm, setDorm] = useState<DormData | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<BookingData>({
        dormId: id || '',
        dormName: '',
        roomTypeId: '',
        roomTypeName: '',
        roomPrice: 0,
        checkInDate: '',
        checkOutDate: '',
        numberOfMonths: 1,
    });

    const [calendar, setCalendar] = useState<CalendarState>({
        isOpen: false,
        currentDate: new Date(),
        selectedStart: '',
        selectedEnd: '',
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeCalendar, setActiveCalendar] = useState<'checkin' | 'checkout'>('checkin');

    // Fetch dorm data
    useEffect(() => {
        const fetchDormData = async () => {
            try {
                // TODO: Replace with actual API call
                // const response = await fetch(`/api/dorms/${id}`);
                // const data = await response.json();

                // Mock data - replace with real API
                const mockData: DormData = {
                    id: id || '1',
                    name: 'ชื่อหอพัก 1',
                    roomTypes: [
                        { id: '1', name: 'พัดลม/เดี่ยวเตียว', price: 2700 },
                        { id: '2', name: 'แอร์/เดี่ยวเตียว', price: 3200 },
                        { id: '3', name: 'แอร์/เตียวคู่', price: 4000 },
                    ],
                };

                setDorm(mockData);
                setFormData(prev => ({
                    ...prev,
                    dormId: mockData.id,
                    dormName: mockData.name,
                }));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dorm data:', error);
                setErrorMessage('ไม่สามารถโหลดข้อมูลหอพัก');
                setLoading(false);
            }
        };

        fetchDormData();
    }, [id]);

    // Format date to dd/mm/yyyy
    const formatDate = (date: Date): string => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Parse date from dd/mm/yyyy
    const parseDate = (dateStr: string): Date | null => {
        if (!dateStr || dateStr.length !== 10) return null;
        const [day, month, year] = dateStr.split('/');
        const date = new Date(`${year}-${month}-${day}`);
        return isNaN(date.getTime()) ? null : date;
    };

    // Get dates for calendar grid
    const getDaysInMonth = (date: Date): (Date | null)[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    // Check if date is disabled
    const isDateDisabled = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    // Check if date is in range
    const isInRange = (date: Date): boolean => {
        const start = parseDate(calendar.selectedStart);
        const end = parseDate(calendar.selectedEnd);
        if (!start || !end) return false;
        return date > start && date < end;
    };

    // Handle date click
    const handleDateClick = (date: Date) => {
        if (isDateDisabled(date)) return;

        if (activeCalendar === 'checkin') {
            const dateStr = formatDate(date);
            setCalendar(prev => ({
                ...prev,
                selectedStart: dateStr,
            }));
            setFormData(prev => ({
                ...prev,
                checkInDate: dateStr,
            }));
        } else {
            const start = parseDate(calendar.selectedStart);
            if (!start || date <= start) return;

            const dateStr = formatDate(date);
            setCalendar(prev => ({
                ...prev,
                selectedEnd: dateStr,
                isOpen: false,
            }));
            setFormData(prev => ({
                ...prev,
                checkOutDate: dateStr,
            }));
        }
    };

    // Navigate months
    const handlePrevMonth = () => {
        setCalendar(prev => ({
            ...prev,
            currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1),
        }));
    };

    const handleNextMonth = () => {
        setCalendar(prev => ({
            ...prev,
            currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1),
        }));
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'checkInDate') {
            setFormData(prev => ({
                ...prev,
                checkInDate: value,
            }));
            setCalendar(prev => ({
                ...prev,
                selectedStart: value,
            }));
        } else if (name === 'checkOutDate') {
            setFormData(prev => ({
                ...prev,
                checkOutDate: value,
            }));
            setCalendar(prev => ({
                ...prev,
                selectedEnd: value,
            }));
        } else if (name === 'roomTypeId') {
            const selectedRoom = dorm?.roomTypes.find(room => room.id === value);
            setFormData(prev => ({
                ...prev,
                roomTypeId: value,
                roomTypeName: selectedRoom?.name || '',
                roomPrice: selectedRoom?.price || 0,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Open calendar
    const openCalendar = (type: 'checkin' | 'checkout') => {
        setActiveCalendar(type);
        setCalendar(prev => ({
            ...prev,
            isOpen: true,
        }));
    };

    // Close calendar
    const closeCalendar = () => {
        setCalendar(prev => ({
            ...prev,
            isOpen: false,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsProcessing(true);

        if (!formData.roomTypeId) {
            setErrorMessage('กรุณาเลือกประเภทห้องพัก');
            setIsProcessing(false);
            return;
        }

        if (!formData.checkInDate || !formData.checkOutDate) {
            setErrorMessage('กรุณาเลือกวันเช็คอินและเช็คเอาท์');
            setIsProcessing(false);
            return;
        }

        try {
            console.log('Booking data:', formData);
            alert('จองห้องพักสำเร็จ!');
            navigate(`/reserved`);
        } catch (error) {
            setErrorMessage('เกิดข้อผิดพลาดในการจอง');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const days = getDaysInMonth(calendar.currentDate);
    const monthName = calendar.currentDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-white py-16 px-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-600">กำลังโหลด...</div>
                </div>
            </div>
        );
    }

    if (!dorm) {
        return (
            <div className="min-h-screen bg-white py-16 px-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-600">ไม่สามารถโหลดข้อมูลหอพัก</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Dorm Name Header */}
                <h1 className="text-4xl font-bold text-gray-900 mb-12">
                    {formData.dormName}
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">กรุณาเลือกรายละเอียดที่ต้องการจอง</h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-12">
                    เนื่องจากกรุณาเลือกราคาและเรียยดที่ต้องการเลือกเพ้ผลักจึงเป็นต้องการสบปรากค่อพัก ห้องพัก-วัดที่ต้องการจองอคณาความเห่อพากจองตองแจงอให้บุคคลค่อพัก-วันที่ต้องการจองและเอ้อมูลจองเส็ดคาง้อเอาท์กรุง
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Room Type */}
                    <div className="bg-gray-100 rounded-3xl p-6 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            *ประเภทห้องพัก:
                        </label>
                        <select
                            name="roomTypeId"
                            value={formData.roomTypeId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-300 text-gray-600 rounded-lg border-0 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                        >
                            <option value="">-- เลือกประเภทห้องพัก --</option>
                            {dorm.roomTypes.map(room => (
                                <option key={room.id} value={room.id}>
                                    {room.name} - ฿{room.price.toLocaleString()}/เดือน
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Check-in & Check-out */}
                    <div className="bg-gray-100 rounded-3xl p-6 shadow-sm relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-4">
                            *วันที่ต้องการจอง:
                        </label>
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-xs text-gray-600 mb-2 font-medium">วันเช็คอิน</label>
                                <input
                                    type="text"
                                    name="checkInDate"
                                    placeholder="dd/mm/yyyy"
                                    value={formData.checkInDate}
                                    onChange={handleInputChange}
                                    onFocus={() => openCalendar('checkin')}
                                    className="w-full px-4 py-3 bg-gray-300 text-gray-600 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                                />
                            </div>
                            <span className="text-gray-600 font-medium mb-3">ถึง</span>
                            <div className="flex-1">
                                <label className="block text-xs text-gray-600 mb-2 font-medium">วันเช็คเอาท์</label>
                                <input
                                    type="text"
                                    name="checkOutDate"
                                    placeholder="dd/mm/yyyy"
                                    value={formData.checkOutDate}
                                    onChange={handleInputChange}
                                    onFocus={() => openCalendar('checkout')}
                                    className="w-full px-4 py-3 bg-gray-300 text-gray-600 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                                />
                            </div>
                        </div>

                        {/* Calendar Popup */}
                        {calendar.isOpen && (
                            <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 max-w-md">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        type="button"
                                        onClick={handlePrevMonth}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {monthName}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={handleNextMonth}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Day names */}
                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Days grid */}
                                <div className="grid grid-cols-7 gap-2 mb-6">
                                    {days.map((date, idx) => {
                                        if (!date) {
                                            return <div key={`empty-${idx}`} className="h-10" />;
                                        }

                                        const dateStr = formatDate(date);
                                        const isToday = date.getTime() === today.getTime();
                                        const isSelected = dateStr === calendar.selectedStart || dateStr === calendar.selectedEnd;
                                        const isDisabled = isDateDisabled(date);
                                        const inRange = isInRange(date);

                                        return (
                                            <button
                                                key={date.getTime()}
                                                type="button"
                                                onClick={() => handleDateClick(date)}
                                                disabled={isDisabled}
                                                className={`
                                                    h-10 rounded-lg text-sm font-medium transition
                                                    ${isDisabled ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : ''}
                                                    ${isSelected ? 'bg-purple-600 text-white shadow-md' : ''}
                                                    ${isToday && !isSelected ? 'border-2 border-purple-600 text-purple-600 font-bold' : ''}
                                                    ${inRange && !isSelected ? 'bg-purple-100 text-gray-900' : ''}
                                                    ${!isDisabled && !isSelected && !isToday && !inRange ? 'bg-gray-50 text-gray-900 hover:bg-gray-200' : ''}
                                                `}
                                            >
                                                {date.getDate()}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex justify-between gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={closeCalendar}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        ปิด
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const todayStr = formatDate(today);
                                            if (activeCalendar === 'checkin') {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    checkInDate: todayStr,
                                                }));
                                                setCalendar(prev => ({
                                                    ...prev,
                                                    selectedStart: todayStr,
                                                }));
                                            }
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                    >
                                        วันนี้
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 pt-8">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full px-6 py-4 bg-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-400 transition duration-200 text-base shadow-md"
                        >
                            ย้อนกลับ
                        </button>
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full px-6 py-4 rounded-xl font-medium transition duration-200 text-base shadow-md ${
                                isProcessing
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                        >
                            {isProcessing ? 'กำลังประมวลผล...' : 'ยืนยันการจอง'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}