import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
import { logoutUser } from './users/users.slice';

export const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    currentUser: user,
    loading,
    error
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading === 'pending') {
    return (
      <div className="loading" role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  return (
    <div className="app">
      {user && (
        <header className="header">
          <h1>Welcome, {user.login}!</h1>
          <button 
            onClick={handleLogout} 
            className="logout-btn"
            aria-label="Log out"
          >
            Log out
          </button>
        </header>
      )}
      <main>
        <Outlet />
      </main>
      {error && (
        <div 
          className="error" 
          role="alert" 
          aria-live="assertive"
        >
          Error: {error}
        </div>
      )}
    </div>
  );
};