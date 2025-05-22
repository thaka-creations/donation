import Cookies from 'js-cookie';

const API_BASE_URL = "http://45.79.97.25:8013/api/v1";

export interface LoginResponse {
  details: {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    jwt_token: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  jwtToken: string;
}

export const setAuthTokens = (tokens: AuthTokens) => {
  try {
    // Set cookies with proper options
    const cookieOptions = {
      expires: 1, // 1 day
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const, // Changed from 'strict' to 'lax' for better compatibility
    };

    console.log('Setting cookies with options:', cookieOptions);
    
    Cookies.set('access_token', tokens.accessToken, cookieOptions);
    Cookies.set('refresh_token', tokens.refreshToken, { ...cookieOptions, expires: 7 }); // 7 days
    Cookies.set('jwt_token', tokens.jwtToken, cookieOptions);

    // Verify cookies were set
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    const jwtToken = Cookies.get('jwt_token');

    console.log('Cookies after setting:', {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      jwtToken: !!jwtToken,
    });
  } catch (error) {
    console.error('Error setting cookies:', error);
    throw error;
  }
};

export const getAuthTokens = (): AuthTokens | null => {
  try {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    const jwtToken = Cookies.get('jwt_token');

    console.log('Getting tokens:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      hasJwtToken: !!jwtToken,
    });

    if (!accessToken || !refreshToken || !jwtToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      jwtToken,
    };
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

export const clearAuthTokens = () => {
  Cookies.remove('access_token', { path: '/' });
  Cookies.remove('refresh_token', { path: '/' });
  Cookies.remove('jwt_token', { path: '/' });
};

export const getAuthHeaders = (): Record<string, string> => {
  const tokens = getAuthTokens();
  if (!tokens) return {};

  return {
    'Authorization': `Bearer ${tokens.accessToken}`,
    'JWTAUTH': `Bearer ${tokens.jwtToken}`,
    'Content-Type': 'application/json',
  };
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('Attempting login with:', { username });
    
    const response = await fetch(`${API_BASE_URL}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error('Login failed with status:', response.status);
      throw new Error('Login failed');
    }

    const data: LoginResponse = await response.json();
    console.log('Login response:', data);
    
    const tokens = {
      accessToken: data.details.access_token,
      refreshToken: data.details.refresh_token,
      jwtToken: data.details.jwt_token,
    };
    
    console.log('Setting tokens:', tokens);
    setAuthTokens(tokens);
    
    // Verify tokens were set
    const verifyTokens = getAuthTokens();
    console.log('Verified tokens after setting:', verifyTokens);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  const headers = getAuthHeaders();
  
  try {
    await fetch(`${API_BASE_URL}/account/logout`, {
      method: 'POST',
      headers,
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAuthTokens();
  }
};

export const getUserProfile = async () => {
  const headers = getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/account/user/profile`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}; 