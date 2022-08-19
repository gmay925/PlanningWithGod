import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

export default function LogOut() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function submitLogout() {
       localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
    }

    submitLogout();
  }, [navigate]);
  return null;
}
