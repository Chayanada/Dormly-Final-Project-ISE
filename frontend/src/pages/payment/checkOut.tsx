import React, { useState } from 'react';
import './checkOut.css';
import { type Page, type DormDataForPayment } from '../../App';
import {
  FiCreditCard,
  FiSmartphone,
  FiGrid
} from 'react-icons/fi';

const paymentOptions = [
  { id: 'card', name: 'Card', icon: FiCreditCard, targetPage: 'paymentCard' as Page },
  { id: 'mobile_banking', name: 'Mobile banking', icon: FiSmartphone, targetPage: 'mobileBanking' as Page },
  { id: 'qrPayment', name: 'QR Payment', icon: FiGrid, targetPage: 'qrPayment' as Page },
  // { id: 'installment', name: 'Installment', icon: FiPieChart, targetPage: 'checkout' as Page }, // ยังไม่เปิดใช้งาน
];

interface CheckoutProps {
  navigateTo: (page: Page) => void;
  dormData: DormDataForPayment;
}

const Checkout: React.FC<CheckoutProps> = ({ navigateTo, dormData }) => {
  const [selectedOption, setSelectedOption] = useState<string>('card');

  if (!dormData || !dormData.room_types || dormData.room_types.length === 0) {
    return (
      <div className="checkout-container">
        <h1 className="checkout-title">Error</h1>
        <p>ไม่พบข้อมูลหอพัก (checkOut.tsx)</p>
      </div>
    );
  }

  const productPrice = dormData.room_types[0].rent_per_month;
  const productImage =
    dormData.medias && dormData.medias.length > 0
      ? dormData.medias[0]
      : 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Dorm';

  const handleNextClick = () => {
    const selected = paymentOptions.find((opt) => opt.id === selectedOption);
    if (!selected) return;

    // installment ยังไม่ให้ใช้
    if (selected.targetPage === 'checkout') {
      alert('This payment method is not available yet.');
      return;
    }

    navigateTo(selected.targetPage);
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <img
          src={productImage}
          alt={dormData.dorm_name}
          className="product-image"
        />
        <div className="product-details">
          <h3>{dormData.dorm_name}</h3>
          <p>Monthly Rental</p>
        </div>
        <div className="product-price">
          {productPrice.toLocaleString()} THB
        </div>
      </div>

      <hr className="divider" />

      {/* Payment Options */}
      <h2 className="payment-title">Select your payment option</h2>
      <div className="payment-options-list">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            className={`payment-option ${
              selectedOption === option.id ? 'selected' : ''
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <option.icon className="payment-icon" />
            <span className="payment-name">{option.name}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="checkout-footer">
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Checkout;
