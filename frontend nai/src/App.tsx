import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/use-auth';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import DormDetailPage from './pages/DormDetailPage';
import LoginPage from './pages/LoginPage';
import LoginDormOwnerPage from './pages/LoginDormOwnerPage';
import RegisterPage from './pages/RegisterPage';
import RegisterDormOwnerPage from './pages/RegisterDormOwnerPage';
import RegisterDormOwnerFormPage from './pages/RegisterDormOwnerFormPage';
import DormOwnerDashboard from './pages/DormOwnerDashboard';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import ChatPage from './pages/ChatPage';
import ReservedPage from './pages/ReservedPage';
import ReviewPage from './pages/ReviewPage';
import SupportPage from './pages/SupportPage';
import NotificationsPage from './pages/NotificationsPage';
import BookingPage from './pages/BookingPage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import DormProfilePage from './pages/DormProfilePage';
import AdminManagingPage from './pages/AdminManagingPage';
import TenantReservationPage from './pages/TenantReservationPage';
import DormNotificationPage from './pages/DormNotificationPage';
import DormSettingsPage from './pages/DormSettingsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import './App.css';

function AppRoutes() {
  const { role } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-dormowner" element={<LoginDormOwnerPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-dormowner" element={<RegisterDormOwnerPage />} />
      <Route path="/register-dormowner-form" element={<RegisterDormOwnerFormPage />} />
      

      {/* Main Routes with Layout */}
      <Route
        path="/"
        element={
          <MainLayout>
            {role === 'dormowner' ? <DormOwnerDashboard /> : <HomePage />}
          </MainLayout>
        }
      />

      <Route
        path="/tenant-reservation"
          element={
            <MainLayout>
              <TenantReservationPage />
            </MainLayout>
          }
      />

      <Route
        path="/subscription"
          element={
            <MainLayout>
              <SubscriptionPage />
            </MainLayout>
          }
      />

      <Route
        path="/dorm-profile"
          element={
            <MainLayout>
              <DormProfilePage />
            </MainLayout>
          }
      />

      <Route
        path="/admin-managing"
          element={
          <MainLayout>
            <AdminManagingPage />
          </MainLayout>
        }
      />

      <Route
        path="/dorm-notifications"
          element={
          <MainLayout>
            <DormNotificationPage />
          </MainLayout>
        }
      />

      <Route
        path="/dorm-settings"
          element={
          <MainLayout>
            <DormSettingsPage />
          </MainLayout>
        }
      />

      <Route
        path="/dorm/:id"
        element={
            <MainLayout>
                <DormDetailPage />
            </MainLayout>
        }
      />

      <Route
        path="/dorm/:id/room-detail"
        element={
          <MainLayout>
            <RoomDetailPage />
          </MainLayout>
        }
      />

      {/* ← เพิ่ม BookingPage route ที่นี่ */}
      <Route
        path="/booking/:id"
        element={
            <MainLayout>
                <BookingPage />
            </MainLayout>
        }
      />

      <Route
        path="/search"
        element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        }
      />

      <Route
        path="/favorites"
        element={
          <MainLayout>
            <FavoritesPage />
          </MainLayout>
        }
      />

      <Route
        path="/chat"
        element={
          <MainLayout>
            <ChatPage />
          </MainLayout>
        }
      />

      <Route
        path="/reserved"
        element={
          <MainLayout>
            <ReservedPage />
          </MainLayout>
        }
      />

      <Route
        path="/review"
        element={
          <MainLayout>
            <ReviewPage />
          </MainLayout>
        }
      />

      <Route
        path="/support"
        element={
          <MainLayout>
            <SupportPage />
          </MainLayout>
        }
      />

      <Route
        path="/notifications"
        element={
          <MainLayout>
            <NotificationsPage />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;