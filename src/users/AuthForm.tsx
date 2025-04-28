import { useState } from 'react';
import { useAppDispatch } from '../store';
import { loginUser } from './users.slice';

interface LoginData {
  login: string;
  password: string;
}

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginData>({
    login: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (formData.login.length < 5) {
      setError('Login must be at least 5 characters long');
      return false;
    }
    if (formData.password.length < 5) {
      setError('Password must be at least 5 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await dispatch(loginUser(formData)).unwrap();
      onSuccess();
    } catch (err) {
      setError('Invalid login or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <input
          value={formData.login}
          onChange={(e) => setFormData({...formData, login: e.target.value})}
          placeholder="Login"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="Password"
          className="form-input"
        />
      </div>
      
      <button type="submit" className="submit-button">
        Log in
      </button>
    </form>
  );
};