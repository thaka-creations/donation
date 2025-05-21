import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import apiClient from '@/lib/api-client';

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get('access_token');
      const jwtToken = Cookies.get('jwt_token');
      const refreshToken = Cookies.get('refresh_token');

      if (!accessToken || !jwtToken || !refreshToken) {
        router.push('/login');
        return;
      }

      try {
        // Fetch user profile instead of just verifying token
        const response = await apiClient.get('/account/profile');
        setUserProfile(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear cookies on auth failure
        Cookies.remove('access_token');
        Cookies.remove('jwt_token');
        Cookies.remove('refresh_token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('access_token');
      Cookies.remove('jwt_token');
      Cookies.remove('refresh_token');
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    isLoading,
    userProfile,
    logout,
  };
} 