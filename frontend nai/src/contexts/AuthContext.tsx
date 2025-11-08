// import { createContext, useState } from 'react';
// import type { ReactNode } from 'react';

// export type UserRole = 'guest' | 'user' | 'dormowner';

// export interface AuthContextType {
//     role: UserRole;
//     loginAsUser: () => void;
//     loginAsDormOwner: () => void;
//     logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//     const [role, setRole] = useState<UserRole>('guest');

//     const loginAsUser = () => {
//         setRole('user');
//     };

//     const loginAsDormOwner = () => {
//         setRole('dormowner');
//     };

//     const logout = () => {
//         setRole('guest');
//     };

//     return (
//         <AuthContext.Provider value={{ role, loginAsUser, loginAsDormOwner, logout }}>
//         {children}
//         </AuthContext.Provider>
//     );
// }

//2
// import { createContext, useState } from 'react';
// import type { ReactNode } from 'react';

// export type UserRole = 'guest' | 'user' | 'dormowner';

// export interface AuthContextType {
//   role: UserRole;
//   user: any | null;
//   loading: boolean;
//   error: string | null;
//   loginUser: (email: string, password: string) => Promise<void>;
//   loginDormOwner: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const API_URL = 'http://localhost:3001';

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [role, setRole] = useState<UserRole>('guest');
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loginUser = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include', // สำคัญ เพื่อส่ง session cookie
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok || data.success === false) {
//         throw new Error(data.message || 'Login failed');
//       }

//       setRole('user');
//       setUser(data.user || { email });
//     } catch (err: any) {
//       setRole('guest');
//       setUser(null);
//       setError(err.message || 'Login failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginDormOwner = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/api/auth/dormowner/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok || data.success === false) {
//         throw new Error(data.message || 'Login failed');
//       }

//       setRole('dormowner');
//       setUser(data.user || { email });
//     } catch (err: any) {
//       setRole('guest');
//       setUser(null);
//       setError(err.message || 'Login failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch(`${API_URL}/api/auth/logout`, {
//         method: 'POST',
//         credentials: 'include',
//       });
//     } catch (err) {
//       console.error('Logout error:', err);
//     } finally {
//       setRole('guest');
//       setUser(null);
//       setError(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ role, user, loading, error, loginUser, loginDormOwner, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

//3
// import { createContext, useState } from 'react';
// import type { ReactNode } from 'react';

// export type UserRole = 'guest' | 'user' | 'dormowner';

// export interface AuthContextType {
//   role: UserRole;
//   user: any | null;
//   loading: boolean;
//   error: string | null;
//   loginUser: (email: string, password: string) => Promise<void>;
//   loginDormOwner: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const API_URL = 'http://localhost:3001';

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [role, setRole] = useState<UserRole>('guest');
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loginUser = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         // 👇 ตามข้อความ error backend: ต้องใช้ username
//         body: JSON.stringify({ username: email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok || data.success === false) {
//         throw new Error(data.message || 'Login failed');
//       }

//       setRole('user');
//       setUser(data.user || { email });
//     } catch (err: any) {
//       setRole('guest');
//       setUser(null);
//       setError(err.message || 'Login failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginDormOwner = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ username: email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok || data.success === false) {
//         throw new Error(data.message || 'Login failed');
//       }

//       setRole('dormowner');
//       setUser(data.user || { email });
//     } catch (err: any) {
//       setRole('guest');
//       setUser(null);
//       setError(err.message || 'Login failed');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch(`${API_URL}/api/auth/logout`, {
//         method: 'POST',
//         credentials: 'include',
//       });
//     } catch (err) {
//       console.error('Logout error:', err);
//     } finally {
//       setRole('guest');
//       setUser(null);
//       setError(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ role, user, loading, error, loginUser, loginDormOwner, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }



import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'guest' | 'user' | 'dormowner';

export interface AuthContextType {
    role: UserRole;
    user: any | null;
    loading: boolean;
    error: string | null;
    loginUser: (email: string, password: string) => Promise<void>;
    loginDormOwner: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    }

    export const AuthContext = createContext<AuthContextType | undefined>(undefined);

    const API_URL = 'http://localhost:3001';

    export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>('guest');
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginUser = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username: email, email, password }),
        });

        const data = await res.json();
        if (!res.ok || data.success === false) {
            throw new Error(data.message || 'Error logging in user');
        }

        setRole('user');
        setUser(data.user || { email });
        } catch (err: any) {
        setRole('guest');
        setUser(null);
        setError(err.message || 'Error logging in user');
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const loginDormOwner = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            // ถ้ามี endpoint แยกสำหรับ dorm owner ค่อยเปลี่ยน URL ตรงนี้ทีหลัง
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username: email, email, password }),
        });

        const data = await res.json();
        if (!res.ok || data.success === false) {
            throw new Error(data.message || 'Error logging in dorm owner');
        }

        setRole('dormowner');
        setUser(data.user || { email });
        } catch (err: any) {
        setRole('guest');
        setUser(null);
        setError(err.message || 'Error logging in dorm owner');
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const logout = async () => {
        try {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        } catch (err) {
        console.error('Logout error:', err);
        } finally {
        setRole('guest');
        setUser(null);
        setError(null);
        }
    };

    return (
        <AuthContext.Provider
        value={{ role, user, loading, error, loginUser, loginDormOwner, logout }}
        >
        {children}
        </AuthContext.Provider>
    );
}
