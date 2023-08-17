import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './contexts/auth';
import { useContext } from 'react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login');
    } else if (isSignedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [isSignedIn, location.pathname]);

  return <>{children}</>;
};

export default PrivateRoute;
