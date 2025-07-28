import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface TermsCheckProps {
  children: ReactNode;
}

export const TermsCheck: React.FC<TermsCheckProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const termsAccepted = localStorage.getItem('termsAccepted');
  
  // إذا كان المستخدم مسجل دخول ولكن لم يوافق على الشروط
  if (token && termsAccepted !== 'true') {
    return <Navigate to="/terms" replace />;
  }
  
  return <>{children}</>;
}; 