import { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import { useNotification } from '../contexts/NotificationContext';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useNotification();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(url, options);
      setData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred';
      setError(errorMessage);
      if (options.showErrorNotification !== false) {
        showError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [url, showError, options]);

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [fetchData, options.immediate]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showError, showSuccess } = useNotification();

  const mutate = useCallback(async (apiCall, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      
      if (options.successMessage) {
        showSuccess(options.successMessage);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred';
      setError(errorMessage);
      
      if (options.showErrorNotification !== false) {
        showError(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showError, showSuccess]);

  return { mutate, loading, error };
};