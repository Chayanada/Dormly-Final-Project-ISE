import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import NotLoginSidebar from '../components/layouts/NotLoginSidebar';
import { registerUser } from '../services/authService'; // 👈 ใช้ไฟล์กลาง

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth(); // สมมติว่าฟังก์ชันนี้จัดการ state auth ใน context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      // 🔥 ใช้ service กลาง
      await registerUser({
        username,
        email,
        password,
      });

      // auto login (ยิงไปที่ /login ผ่าน useAuth ของคุณ)
      await loginUser(username, password);

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <NotLoginSidebar />
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Create Dormly Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="somchai_s"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="somchai@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  👁
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  👁
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
            >
              {loading ? 'Registering...' : 'register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
