import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = "http://45.79.97.25:8013/api/v1";

if (!API_URL) {
  throw new Error('API URL is not defined in environment variables');
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    const jwtToken = Cookies.get('jwt_token');

    if (accessToken && jwtToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['JWTAUTH'] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh and error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh on 401 unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Request new tokens using the same base URL
        const { data: { details } } = await axios.post(
          `${API_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const { access_token, jwt_token, expires_in = 36000 } = details;
        const expires = new Date(Date.now() + expires_in * 1000);

        // Update cookies and headers
        Cookies.set('access_token', access_token, { expires });
        Cookies.set('jwt_token', jwt_token, { expires });

        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers['JWTAUTH'] = `Bearer ${jwt_token}`;

        return apiClient(originalRequest);

      } catch (refreshError) {
        // Clear auth state and redirect to login
        ['access_token', 'jwt_token', 'refresh_token'].forEach(token => 
          Cookies.remove(token)
        );
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Return detailed error if available
    return Promise.reject(
      error.response?.data?.details || error
    );
  }
);

export default apiClient;