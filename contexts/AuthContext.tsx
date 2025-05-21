'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import apiClient from '@/lib/api-client';

interface UserProfile {
  id: string;
  username: string;
  name: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get('/account/user/profile');
      setUser(response.data.details);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Clear cookies and redirect to login on error
      Cookies.remove('access_token');
      Cookies.remove('jwt_token');
      Cookies.remove('refresh_token');
      router.push('/login');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      const jwtToken = Cookies.get('jwt_token');

      if (!accessToken || !jwtToken) {
        router.push('/login');
        return;
      }

      await fetchUserProfile();
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post('/account/login', {
        username,
        password,
      });

      const { details } = response.data;
      const { access_token, refresh_token, jwt_token } = details;

      // Set cookies with expiration
      const expiresIn = details.expires_in || 36000;
      const expires = new Date(Date.now() + expiresIn * 1000);

      Cookies.set('access_token', access_token, { expires });
      Cookies.set('jwt_token', jwt_token, { expires });
      Cookies.set('refresh_token', refresh_token, { expires });

      // Fetch user profile after successful login
      await fetchUserProfile();
      
      router.push('/staff');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid username or password');
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/account/logout', {
        code: "4/0Ab_5qlmcSbFSoW4cF3-DVH0y4-LBbhd1qmT0cigTotTazUYv4K33_Ir4kDSwE-LbxvxrUA"
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('access_token');
      Cookies.remove('jwt_token');
      Cookies.remove('refresh_token');
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 