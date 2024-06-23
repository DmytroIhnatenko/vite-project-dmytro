import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const GoogleLoginComponent: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const handleLoginSuccess = (response: any) => {
    const credential = response.credential;
    const decoded = jwtDecode(credential);
    onLogin(credential, decoded);
  };

  return (
    <GoogleOAuthProvider clientId="393368483663-ulks9r8vp2pekbgvp9job515mk1b5461.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;