// import { useState } from 'react';
// import { useAuth } from '../hooks/use-auth';
// import { useNavigate } from 'react-router-dom';
// import NotLoginSidebar from '../components/layouts/NotLoginSidebar';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const { loginUser, loading, error } = useAuth();
//     const navigate = useNavigate();

//     // const handleSubmit = (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     console.log('Login:', { email, password });
//     //     loginAsUser();
//     //     navigate('/');
//     // };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             await loginUser(email, password);
//             navigate('/');
//         } catch {
//             // error จะอยู่ในตัวแปร error จาก context แสดงด้านล่างได้
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-50">
//         {/* Sidebar - Hidden on mobile, shown on lg+ */}
//         <div className="hidden lg:block">
//             <NotLoginSidebar />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex items-center justify-center px-4">
//             <div className="w-full max-w-md">
//             <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Login Dormly</h1>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                 <label className="block text-sm font-medium mb-2">Email</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder="your@email.com"
//                 />
//                 </div>

//                 <div>
//                 <label className="block text-sm font-medium mb-2">Password</label>
//                 <div className="relative">
//                     <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder="••••••••"
//                     />
//                     <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
//                     >
//                     {showPassword ? (
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                     ) : (
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                         </svg>
//                     )}
//                     </button>
//                 </div>
//                 </div>

//                 <button
//                 type="submit"
//                 className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
//                 >
//                 login dorm
//                 </button>
//                 {error && (
//                     <p className="text-red-500 text-sm mt-2 text-center">
//                         {error}
//                     </p>
//                     )}
//             </form>

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
//                 >
//                 {loading ? 'Logging in...' : 'login dorm'}
//             </button>


//             <p className="text-center mt-6 text-sm">
//                 does not have an account yet?{' '}
//                 <button
//                 onClick={() => navigate('/register')}
//                 className="text-blue-500 hover:text-blue-600 font-medium"
//                 >
//                 Register
//                 </button>
//             </p>
//             </div>
//         </div>
//         </div>
//     );
// }

import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import NotLoginSidebar from '../components/layouts/NotLoginSidebar';

export default function LoginPage() {
    const [username, setUsername] = useState(''); // (ใช้ username)
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { loginAsUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // 1. เรียก API (Backend ของคุณ)
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }) // (ส่ง username)
            });

            // vvvv (คุณไม่จำเป็นต้องใช้ const data: any) vvvv
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login ไม่สำเร็จ');
            }

            // 4. ถ้า Login สำเร็จ (Backend ส่ง 200 OK)
            if (data.success) {
                
                // vvvv FIX: เรียกฟังก์ชันโดย "ไม่ส่ง" argument vvvv
                // (เราแค่บอก Context ว่า "เฮ้! Login สำเร็จแล้ว ไปโหลดข้อมูล session มาซะ")
                await loginAsUser(); 
                // ^^^^ สิ้นสุด FIX ^^^^

                // 6. นำทางไปหน้าหลัก
                navigate('/');
            } else {
                throw new Error(data.message || 'เกิดข้อผิดพลาดจาก Server');
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('เกิดข้อผิดพลาดที่ไม่รู้จัก');
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="hidden lg:block">
                <NotLoginSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Login Dormly</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Your Username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="••••••••"
                            />
                            {/* ... (ปุ่ม Show/Hide Password) ... */}
                        </div>
                    </div>

                    {error && (
                        <div className="text-center text-red-500 font-medium p-2 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm">
                    does not have an account yet?{' '}
                    <button
                    onClick={() => navigate('/register')}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                    Register
                    </button>
                </p>
                </div>
            </div>
        </div>
    );
}