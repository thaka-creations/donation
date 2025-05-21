import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get tokens from cookies
    const accessToken = Cookies.get('access_token');
    const jwtToken = Cookies.get('jwt_token');

    // Add headers if tokens exist
    if (accessToken && jwtToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['JWTAUTH'] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from cookies
        const refreshToken = Cookies.get('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const response = await axios.post('http://45.79.97.25:8013/api/v1/auth/refresh', {
          refresh_token: refreshToken
        });

        const { details } = response.data;
        const { access_token, jwt_token } = details;

        // Set cookies with expiration
        const expiresIn = details.expires_in || 36000;
        const expires = new Date(Date.now() + expiresIn * 1000);

        Cookies.set('access_token', access_token, { expires });
        Cookies.set('jwt_token', jwt_token, { expires });

        // Update the original request headers
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers['JWTAUTH'] = `Bearer ${jwt_token}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear cookies and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('jwt_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient; 