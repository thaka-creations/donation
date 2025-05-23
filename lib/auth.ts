import Cookies from 'js-cookie';

const API_BASE_URL = "http://45.79.97.25:8013/api/v1";

if (!API_BASE_URL) {
  throw new Error('API URL is not defined in environment variables');
}

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
    const cookieOptions = {
      expires: 1, // 1 day
      path: '/',
      secure: true, // Always use secure cookies in production
      sameSite: 'strict' as const,
      httpOnly: true // Prevent XSS attacks
    };

    Cookies.set('access_token', tokens.accessToken, cookieOptions);
    Cookies.set('refresh_token', tokens.refreshToken, { ...cookieOptions, expires: 7 }); // 7 days
    Cookies.set('jwt_token', tokens.jwtToken, cookieOptions);

  } catch (error) {
    console.error('Error setting auth tokens');
    throw error;
  }
};

export const getAuthTokens = (): AuthTokens | null => {
  try {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    const jwtToken = Cookies.get('jwt_token');

    if (!accessToken || !refreshToken || !jwtToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      jwtToken,
    };
  } catch (error) {
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
    const response = await fetch(`${API_BASE_URL}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: LoginResponse = await response.json();
    
    const tokens = {
      accessToken: data.details.access_token,
      refreshToken: data.details.refresh_token,
      jwtToken: data.details.jwt_token,
    };
    
    setAuthTokens(tokens);

    return data;
  } catch (error) {
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