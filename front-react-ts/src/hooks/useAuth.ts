import { useContext } from 'react';
import { AuthContext } from '../auth/authContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Authentication context is not inside of AuthProvider Tag');
  return context;
};
export default useAuth;