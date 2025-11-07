import React, { useState } from 'react';

// Notification Interface
interface Notification {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'booking' | 'message' | 'request' | 'system';
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'ยืนยันการจองของคุณแล้ว',
      description: 'การจองห้องพัก 1 ของคุณได้รับการยืนยันเรียบร้อยแล้ว Dormly ได้บันทึกรายละเอียดการจองไว้ในระบบ คุณสามารถตรวจสอบวันเข้าพัก ประเภทห้อง และระยะเวลาการเช่าได้',
      date: new Date(),
      type: 'booking',
      read: false
    },
    {
      id: '2',
      title: 'คำขอตรวจสอบห้องพัก',
      description: 'มีคำขอตรวจสอบห้องพักใหม่ กรุณาตรวจสอบและดำเนินการ ระบบได้ทำการบันทึกคำขอนี้เรียบร้อยแล้ว',
      date: new Date(),
      type: 'request',
      read: false
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(notifications[0]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-screen">
      {/* Notifications Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <span className="text-xs bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            onClick={() => {
              setSelectedNotification(notification);
              markAsRead(notification.id);
            }}
            className={`
              p-4 border-b border-gray-200 cursor-pointer 
              ${selectedNotification?.id === notification.id 
                ? 'bg-purple-50 border-l-4 border-purple-600' 
                : 'hover:bg-gray-100'}
              ${!notification.read ? 'font-semibold' : 'text-gray-600'}
            `}
          >
            <div className="flex justify-between items-center">
              <span>{notification.title}</span>
              {!notification.read && (
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {notification.description}
            </p>
          </div>
        ))}
      </div>

      {/* Notification Details */}
      <div className="flex-1 bg-gray-50 p-8">
        {selectedNotification ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{selectedNotification.title}</h1>
            <p className="text-gray-600 mb-4">
              {formatDate(selectedNotification.date)}
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p>{selectedNotification.description}</p>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => {
                  // Handle action based on notification type
                  console.log('Action for notification type:', selectedNotification.type);
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                ดำเนินการ
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            เลือกการแจ้งเตือนเพื่อดูรายละเอียด
          </div>
        )}
      </div>
    </div>
  );
}