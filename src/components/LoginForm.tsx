import React, { useState } from 'react';
import axios from 'axios';
import GoogleLoginComponent from './GoogleLogin';

interface LoginFormProps {
  onLogin: (token: string, refreshToken: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/token', {
          login,
          password,
        });
        const { token, refreshToken } = response.data;
        onLogin(token, refreshToken);
      } catch (error) {
        setError('Invalid login or password');
      }
    };
  
    const handleGoogleLogin = (token: string, userData: any) => {
      
      console.log('Google user data:', userData);
     
      onLogin(token, '');
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
          <h2 className="mb-4">Login</h2>
          <div className="form-group">
            <label htmlFor="login">Login:</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">Login</button>
          <div className="mt-3">
            <GoogleLoginComponent onLogin={handleGoogleLogin} />
          </div>
        </form>
      </div>
    );
  };
  
  export default LoginForm;
  