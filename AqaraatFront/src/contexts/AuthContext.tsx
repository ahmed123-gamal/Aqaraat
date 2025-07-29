import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, LoginRequest, RegisterRequest, LoginResponse } from '@/lib/api';

interface User {
  id: string;
  email: string;
  phone: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const termsAccepted = localStorage.getItem('termsAccepted');
    
    if (token && termsAccepted === 'true') {
      // User is logged in and has accepted terms
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('termsAccepted');
        }
      }
    } else if (token && !termsAccepted) {
      // User is logged in but hasn't accepted terms yet
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل' };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل' };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل' };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل' };
    }
    return { isValid: true, message: 'كلمة المرور قوية' };
  };

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // التحقق من صحة الإيميل
      if (!validateEmail(credentials.email)) {
        throw new Error('الرجاء إدخال إيميل صحيح');
      }

      // التحقق من كلمة المرور
      const passwordValidation = validatePassword(credentials.password || '');
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }
      
      // التحقق من المستخدمين المسجلين
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find((u: any) => u.email === credentials.email);
      
      if (!user) {
        throw new Error('المستخدم غير موجود. الرجاء التسجيل أولاً');
      }
      
      // محاكاة التحقق من كلمة المرور (في التطبيق الحقيقي ستكون مشفرة)
      if (user.password && user.password !== credentials.password) {
        throw new Error('كلمة المرور غير صحيحة');
      }
      
      const mockUser = {
        id: user.id.toString(),
        email: user.email,
        phone: user.phone || credentials.phone,
        name: user.name
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'fake-token-123');
      localStorage.setItem('loginTime', Date.now().toString());
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // التحقق من صحة الإيميل
      if (!validateEmail(userData.email)) {
        throw new Error('الرجاء إدخال إيميل صحيح');
      }

      // التحقق من كلمة المرور
      const passwordValidation = validatePassword(userData.password || '');
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }
      
      // التحقق من عدم وجود المستخدم مسبقاً
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find((u: any) => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('هذا الإيميل مسجل مسبقاً');
      }
      
      // إنشاء مستخدم جديد
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // في التطبيق الحقيقي ستكون مشفرة
        role: userData.email.includes('@student.aun.edu.eg') ? 'student' : 'owner',
        registeredAt: new Date().toISOString(),
        sessionDuration: 0,
        lastLogin: new Date().toISOString()
      };
      
      // إضافة المستخدم للقائمة
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // تسجيل دخول تلقائي
      const userForAuth = {
        id: newUser.id.toString(),
        email: newUser.email,
        phone: newUser.phone,
        name: newUser.name
      };
      
      setUser(userForAuth);
      localStorage.setItem('user', JSON.stringify(userForAuth));
      localStorage.setItem('token', 'fake-token-123');
      localStorage.setItem('loginTime', Date.now().toString());
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    apiClient.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 