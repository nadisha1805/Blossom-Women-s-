import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/portal/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasRole(...allowedRoles)) {
    return <Navigate to="/portal/unauthorized" replace />;
  }

  return <Outlet />;
}

