import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PatientProtectedRoute() {
  const { isPatientAuthenticated } = useAuth();
  const location = useLocation();

  if (!isPatientAuthenticated) {
    return <Navigate to="/patient/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

