// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { useAuth } from './hooks/use-auth';
// import MainLayout from './components/layouts/MainLayout';
// import HomePage from './pages/HomePage';
// import DormDetailPage from './pages/DormDetailPage';
// import LoginPage from './pages/LoginPage';
// import LoginDormOwnerPage from './pages/LoginDormOwnerPage';
// import RegisterPage from './pages/RegisterPage';
// import RegisterDormOwnerPage from './pages/RegisterDormOwnerPage';
// import RegisterDormOwnerFormPage from './pages/RegisterDormOwnerFormPage';
// import DormOwnerDashboard from './pages/DormOwnerDashboard';
// import SearchPage from './pages/SearchPage';
// import FavoritesPage from './pages/FavoritesPage';
// import ChatPage from './pages/ChatPage';
// import ReservedPage from './pages/ReservedPage';
// import ReviewPage from './pages/ReviewPage';
// import SupportPage from './pages/SupportPage';
// import NotificationsPage from './pages/NotificationsPage';
// import BookingPage from './pages/BookingPage';
// import SettingsPage from './pages/SettingsPage';
// import SubscriptionPage from './pages/SubscriptionPage';
// import DormProfilePage from './pages/DormProfilePage';
// import AdminManagingPage from './pages/AdminManagingPage';
// import TenantReservationPage from './pages/TenantReservationPage';
// import DormNotificationPage from './pages/DormNotificationPage';
// import DormSettingsPage from './pages/DormSettingsPage';
// import RoomDetailPage from './pages/RoomDetailPage';

// import Checkout from './pages/payment/checkOut';
// import PaymentByCreditCard from './pages/payment/paymentByCreditCard';
// import MobileBanking from './pages/payment/MobileBanking';
// import QRPayment from './pages/payment/QRPayment';
// import Success from './pages/payment/Success';
// import Fail from './pages/payment/Fail';

// import './App.css';

// export interface DormDataForPayment {
//   dorm_id: number;
//   dorm_name: string;
//   medias: string[];
//   room_types?: { rent_per_month: number }[];
// }

// type Page =
//   | 'checkout'
//   | 'paymentCard'
//   | 'mobileBanking'
//   | 'qrPayment'
//   | 'success'
//   | 'fail';

// function PaymentFlow() {
//   // const location = useLocation();
//   const dormData = location.state?.dormData as DormDataForPayment | undefined;

//   console.log('PaymentFlow dormData:', dormData); // ช่วยเช็ก

//   const [currentPage, setCurrentPage] = useState<Page>('checkout');
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const navigateTo = (page: Page) => {
//     if (page !== 'fail') setErrorMessage(null);
//     setCurrentPage(page);
//   };

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'checkout':
//         return <Checkout navigateTo={navigateTo} dormData={dormData} />;
//       case 'paymentCard':
//         return (
//           <PaymentByCreditCard
//             navigateTo={navigateTo}
//             dormData={dormData}
//             setErrorMessage={setErrorMessage}
//           />
//         );
//       case 'mobileBanking':
//         return (
//           <MobileBanking
//             navigateTo={navigateTo}
//             dormData={dormData}
//             setErrorMessage={setErrorMessage}
//           />
//         );
//       case 'qrPayment':
//         return (
//           <QRPayment
//             navigateTo={navigateTo}
//             dormData={dormData}
//             setErrorMessage={setErrorMessage}
//           />
//         );
//       case 'success':
//         return (
//           <Success
//             onContinue={() => {
//               window.location.href = '/';
//             }}
//             dormData={dormData}
//           />
//         );
//       case 'fail':
//         return (
//           <Fail
//             navigateTo={navigateTo}
//             errorMessage={errorMessage}
//           />
//         );
//       default:
//         return <Checkout navigateTo={navigateTo} dormData={dormData} />;
//     }
//   };

//   return renderCurrentPage();
// }

// function AppRoutes() {
//   const { role } = useAuth();

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/login-dormowner" element={<LoginDormOwnerPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/register-dormowner" element={<RegisterDormOwnerPage />} />
//       <Route path="/register-dormowner-form" element={<RegisterDormOwnerFormPage />} />
      

//       {/* Main Routes with Layout */}
//       <Route
//         path="/"
//         element={
//           <MainLayout>
//             {role === 'dormowner' ? <DormOwnerDashboard /> : <HomePage />}
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/tenant-reservation"
//           element={
//             <MainLayout>
//               <TenantReservationPage />
//             </MainLayout>
//           }
//       />

//       <Route
//         path="/subscription"
//           element={
//             <MainLayout>
//               <SubscriptionPage />
//             </MainLayout>
//           }
//       />

//       <Route
//         path="/dorm-profile"
//           element={
//             <MainLayout>
//               <DormProfilePage />
//             </MainLayout>
//           }
//       />

//       <Route
//         path="/admin-managing"
//           element={
//           <MainLayout>
//             <AdminManagingPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/dorm-notifications"
//           element={
//           <MainLayout>
//             <DormNotificationPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/payment"
//         element={
//           <MainLayout>
//             <PaymentFlow />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/dorm-settings"
//           element={
//           <MainLayout>
//             <DormSettingsPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/dorm/:id"
//         element={
//             <MainLayout>
//                 <DormDetailPage />
//             </MainLayout>
//         }
//       />

//       <Route
//         path="/dorm/:id/room-detail"
//         element={
//           <MainLayout>
//             <RoomDetailPage />
//           </MainLayout>
//         }
//       />

//       {/* ← เพิ่ม BookingPage route ที่นี่ */}
//       <Route
//         path="/booking/:id"
//         element={
//             <MainLayout>
//                 <BookingPage />
//             </MainLayout>
//         }
//       />

//       <Route
//         path="/dormowner-dashboard"
//         element={
//           <MainLayout>
//             <DormOwnerDashboard />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/search"
//         element={
//           <MainLayout>
//             <SearchPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/favorites"
//         element={
//           <MainLayout>
//             <FavoritesPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/chat"
//         element={
//           <MainLayout>
//             <ChatPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/reserved"
//         element={
//           <MainLayout>
//             <ReservedPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/review"
//         element={
//           <MainLayout>
//             <ReviewPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/support"
//         element={
//           <MainLayout>
//             <SupportPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/notifications"
//         element={
//           <MainLayout>
//             <NotificationsPage />
//           </MainLayout>
//         }
//       />

//       <Route
//         path="/settings"
//         element={
//           <MainLayout>
//             <SettingsPage />
//           </MainLayout>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import SettingsPage from './pages/SettingsPage';
import Checkout from './pages/payment/checkOut';
import PaymentByCreditCard from './pages/payment/paymentByCreditCard';
import MobileBanking from './pages/payment/MobileBanking';
import QRPayment from './pages/payment/QRPayment';
import Success from './pages/payment/Success';
import Fail from './pages/payment/Fail';

import './App.css';


export type Page = 'checkout' | 'paymentCard' | 'mobileBanking' | 'qrPayment' | 'success' | 'fail';

export interface DormDataForPayment {
  dorm_id: number;
  dorm_name: string;
  medias: string[];
  room_types?: { rent_per_month: number }[];
}


function PaymentFlow() {
  const location = useLocation();
  

  const dormData = location.state?.dormData as DormDataForPayment | undefined;

  const [currentPage, setCurrentPage] = useState<Page>('checkout');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigateTo = (page: Page) => {
    if(page !== 'fail') {
      setErrorMessage(null); 
    }
    setCurrentPage(page);
  };

  if (!dormData) {
    return <Navigate to="/" replace />; 
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'checkout':
        return <Checkout navigateTo={navigateTo} dormData={dormData} />;
      case 'paymentCard':
        return <PaymentByCreditCard 
                  navigateTo={navigateTo} 
                  dormData={dormData} 
                  setErrorMessage={setErrorMessage} 
                />;
      case 'mobileBanking': 
        return <MobileBanking 
                  navigateTo={navigateTo} 
                  dormData={dormData} 
                  setErrorMessage={setErrorMessage} 
                />;
      case 'qrPayment':
        return <QRPayment
                  navigateTo={navigateTo}
                  dormData={dormData}
                  setErrorMessage={setErrorMessage}
                />;
      case 'success':
        return <Success 
                  onContinue={() => window.location.href = '/'} // (กลับหน้า Home)
                  dormData={dormData} 
                />;
      case 'fail':
        return <Fail 
                  navigateTo={navigateTo} 
                  errorMessage={errorMessage} 
                />;
      default:
        return <Checkout navigateTo={navigateTo} dormData={dormData} />;
    }
  }

 
  return renderCurrentPage();
}


function AppRoutes() {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-dormowner" element={<LoginDormOwnerPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-dormowner" element={<RegisterDormOwnerPage />} />
      <Route path="/register-dormowner-form" element={<RegisterDormOwnerFormPage />} />
      
      <Route
        path="/"
        element={
          <MainLayout>
            {role === 'dormowner' ? <DormOwnerDashboard /> : <HomePage />}
          </MainLayout>
        }
      />
      <Route
        path="/dorms/:id" 
        element={
            <MainLayout>
                <DormDetailPage />
            </MainLayout>
        }
    />
      <Route
        path="/search"
        element={ <MainLayout> <SearchPage /> </MainLayout> }
      />
      <Route
        path="/favorites"
        element={ <MainLayout> <FavoritesPage /> </MainLayout> }
      />
      <Route
        path="/chat"
        element={ <MainLayout> <ChatPage /> </MainLayout> }
      />
      <Route
        path="/reserved"
        element={ <MainLayout> <ReservedPage /> </MainLayout> }
      />
      <Route
        path="/review"
        element={ <MainLayout> <ReviewPage /> </MainLayout> }
      />
      <Route
        path="/support"
        element={ <MainLayout> <SupportPage /> </MainLayout> }
      />
      <Route
        path="/notifications"
        element={ <MainLayout> <NotificationsPage /> </MainLayout> }
      />
      <Route
        path="/settings"
        element={ <MainLayout> <SettingsPage /> </MainLayout> }
      />

      <Route
        path="/payment"
        element={
          <MainLayout>
            <PaymentFlow />
          </MainLayout>
        }
      />


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