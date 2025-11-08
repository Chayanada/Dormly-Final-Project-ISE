// src/services/authService.ts
const API_URL = 'http://localhost:3001/api/auth';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  first_name?: string; // ถ้ามีใช้ใน backend
  last_name?: string;  // ถ้ามีใช้ใน backend
}

export interface LoginPayload {
  username: string;
  password: string;
}

// สมัครสมาชิก
export async function registerUser(payload: RegisterPayload) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 👈 สำคัญ ถ้าใช้ session/cookie
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Registration failed');
  }

  // data.data = user ที่ backend ส่งกลับมา (ตาม auth.js ของคุณ)
  return data.data || data;
}

// ล็อกอิน
export async function loginUserRequest(payload: LoginPayload) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // รับ/ส่ง cookie ให้ session ทำงาน
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Login failed');
  }

  return data.data || data;
}

// (เสริม) logout
export async function logoutUserRequest() {
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
}
