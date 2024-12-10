import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../../../api/api';
import { useEffect } from 'react';
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear access and refresh tokens
    clearTokens();
    
    // Redirect to login page
    navigate('/#/login');
  };

  // Run the handleLogout function when this component is rendered
  useEffect(() => {
    handleLogout();
  }, []);

  return null; // No UI needed for this component
};

export default Logout;
