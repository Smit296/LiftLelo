import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://www.liftlelo.com/'; // Added https:// protocol

// Debug flag - set to true to see detailed logs
const DEBUG = true;

const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch {
    return null;
  }
};

const logDebug = (...args) => {
  if (DEBUG) {
    console.log(...args);
  }
};

export const apiCall = async (
  endpoint,
  method,
  data = null,
  token = null,
  isFormData = false,
) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const authToken = token || (await getAuthToken());

    const headers = {
      Accept: 'application/json',
    };

    // Set content type based on whether it's form-data or JSON
    if (isFormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
      url,
      method: method.toUpperCase(),
      headers,
      timeout: 30000,
    };

    // Add data based on method type and format
    if (method.toUpperCase() === 'GET') {
      config.params = data;
    } else {
      config.data = data;
    }

    logDebug('🚀 API Request:', {
      url,
      method: config.method,
      headers,
      data: config.data,
    });

    const response = await axios(config);

    logDebug('✅ API Response:', {
      status: response.status,
      data: response.data,
    });

    // Check if response contains PHP errors
    if (typeof response.data === 'string' && response.data.includes('Notice')) {
      return {
        success: false,
        error: 'Server configuration error. Please try again later.',
        status: response.status,
      };
    }

    // Parse response data if it's a string
    let parsedData = response.data;
    if (typeof response.data === 'string') {
      // Remove any trailing PHP tags or whitespace
      const cleanData = response.data.replace(/\?>\s*$/, '');
      try {
        parsedData = JSON.parse(cleanData);
      } catch (e) {
        console.error('Failed to parse response data:', e);
      }
    }

    // Check if the response data contains an error status
    if (parsedData?.status === 'error') {
      return {
        success: false,
        status: response.status,
        error: parsedData.message || 'Operation failed',
        data: parsedData,
      };
    }

    return {
      success: parsedData?.status === 'success',
      data: parsedData,
      status: response.status,
    };
  } catch (error) {
    // Detailed error logging
    const errorDetails = {
      url: `${BASE_URL}${endpoint}`,
      method,
      requestData: data,
      errorMessage: error.message,
      errorResponse: error.response?.data,
      errorStatus: error.response?.status,
      errorHeaders: error.response?.headers,
    };

    console.error('❌ API Error Details:', errorDetails);

    if (error.response) {
      // Check if response contains PHP errors
      if (
        typeof error.response.data === 'string' &&
        error.response.data.includes('Notice')
      ) {
        return {
          success: false,
          error: 'Server configuration error. Please try again later.',
          status: error.response.status,
        };
      }

      // Server responded with error status
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        'Server error occurred';
      return {
        success: false,
        status: error.response.status,
        error: errorMessage,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response received
      const errorMessage =
        error.code === 'ECONNABORTED'
          ? 'Request timeout - Server took too long to respond'
          : 'Network error - Could not connect to server';

      return {
        success: false,
        status: 0,
        error: errorMessage,
        code: error.code,
      };
    } else {
      // Error in request setup
      return {
        success: false,
        status: 0,
        error: 'Request configuration error: ' + error.message,
      };
    }
  }
};
