import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import dormlyLogo from '../../assets/dormly logo.png';

export default function UserSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-80 min-h-screen bg-white border-r border-gray-200 p-8 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <svg 
                    className="w-12 h-12"
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_1698_12300)">
                        <path 
                            d="M25.74 18.64L19.32 25.06L25.78 31.52C28.58 30.18 30.85 27.9 32.2 25.1L25.74 18.64ZM39.6 32.5V0H0V39.6H33.86L25.78 31.52C23.97 32.4 21.94 32.89 19.8 32.89C12.2 32.89 6.03 26.73 6.03 19.12C6.03 11.51 12.2 5.36 19.8 5.36C27.4 5.36 33.57 11.52 33.57 19.12C33.57 21.27 33.08 23.3 32.2 25.1L39.6 32.5Z" 
                            fill="#6D28D9"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1698_12300">
                            <rect width="39.6" height="39.6" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <span className="font-bold text-2xl">Dormly</span>
            </div>

            
            {/* Menu Items */}
            <nav className="flex-1 space-y-3">
                <button 
                    onClick={() => navigate('/')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-base">Home</span>
                </button>

                <button 
                    onClick={() => navigate('/search')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/search') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-base">Search</span>
                </button>

                <button 
                    onClick={() => navigate('/favorites')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/favorites') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-base">Favorites</span>
                </button>

                <button 
                    onClick={() => navigate('/chat')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/chat') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-base">Chat</span>
                </button>

                <button 
                    onClick={() => navigate('/reserved')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/reserved') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-base">Reserved</span>
                </button>

                <button 
                    onClick={() => navigate('/review')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/review') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-base">Review</span>
                </button>
            </nav>

            {/* Bottom Section: Notifications, Support, Settings */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
                <button 
                    onClick={() => navigate('/notifications')}
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/notifications') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="text-base">Notifications</span>
                    </div>
                    <span className="text-xs bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-medium">10</span>
                </button>

                <button 
                    onClick={() => navigate('/support')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/support') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-base">Support</span>
                </button>

                <button 
                    onClick={() => navigate('/settings')}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all ${
                        isActive('/settings') 
                        ? 'bg-purple-50 text-purple-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-base">Settings</span>
                </button>
            </div>

            {/* User Profile - ตรงนี้คือข้อมูล account ของผู้ใช้ที่ login เข้ามา */}
            <div className="pt-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                        <p className="font-semibold text-base">somchai_student</p>
                        <p className="text-sm text-gray-500">somchai.student@ema...</p>
                    </div>
                    <button onClick={logout} className="text-gray-400 hover:text-gray-600 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
}