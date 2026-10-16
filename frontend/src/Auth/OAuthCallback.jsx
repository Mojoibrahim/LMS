import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDashboardPath } from '../utils/dashboardRoutes';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function OAuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    axios.get(`${BACKEND_URL}/api/auth/oauth-session`, {
      withCredentials: true,
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }).then(({ data }) => {
      const dashboardPath = getDashboardPath(data.user);
      if (!data.token || !dashboardPath) {
        throw new Error('The authentication response did not include valid user details.');
      }

      localStorage.setItem('jwt_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));

      if (isActive) {
        navigate(dashboardPath, { replace: true });
      }
    }).catch((requestError) => {
      if (isActive) {
        setError(requestError.response?.data?.message || requestError.message || 'Could not complete social sign-in.');
      }
    });

    return () => {
      isActive = false;
    };
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      {error ? (
        <>
          <p>{error}</p>
          <Link to="/login">Return to Login</Link>
        </>
      ) : (
        <p>Completing sign-in...</p>
      )}
    </div>
  );
}
