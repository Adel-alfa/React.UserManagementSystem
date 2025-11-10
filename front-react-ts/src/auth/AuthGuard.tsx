import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthSpinner from '../components/general/AuthSpinner';
import { PATH_PUBLIC } from '../routes/path';


interface IProps {
  roles: string[];
}

const AuthGuard = ({ roles }: IProps) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();
 
  const hasAccess = isAuthenticated && user?.roles?.find((q) => roles.includes(q));
  if (isAuthLoading) {
    return <AuthSpinner />;
  }
  if (!isAuthenticated) {
  return <Navigate to={PATH_PUBLIC.home} />;
}
  return hasAccess ? <Outlet /> : <Navigate to={PATH_PUBLIC.unauthorized} />;
};
export default AuthGuard;