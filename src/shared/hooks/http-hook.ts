import axios from 'axios';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { SendRequestProps } from '../types/sharedTypes';

import queryString from 'query-string';

// const baseURL = import.meta.env.VITE_APP_BACKEND_URL
// const baseURLbackend = 'https://flash-card-app-nodejs.fly.dev'
const baseURLbackend = 'http://localhost:5068'

function isError(error: any): error is Error {
  return error instanceof Error;
}

export const useHttpClient = (baseURL = baseURLbackend) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest:SendRequestProps = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      try {
        const axiosClient = axios.create({
            baseURL: baseURL,
            headers: headers,
            paramsSerializer: body => queryString.stringify(body)
        })

        axiosClient.interceptors.request.use(async(config) => {
          // Handle token here...
          return config;
        }, (error) => {
            return Promise.reject(error);
        })

        axiosClient.interceptors.response.use(response => {

          if (response && response.data) {
              setIsLoading(false);
              return response.data
          } 
          return response
        }, (error) => {
            return Promise.reject(error);
        })

        if (method === "GET") {
          return await axiosClient.get(url)
        } else if (method === "POST") {
          return await axiosClient.post(url, body)
          
        } else if (method === "PATCH") {
          return await axiosClient.patch(url, body)
          
        } else if (method === "DELETE") {
          return await axiosClient.delete(url)
        }

      } catch (err) {
        if (isError(err) && err.name === 'AbortError') {
          console.log('AbortError: Fetch request aborted');
        }

        // Assuming err is of type unknown or any
        if ((err as AxiosError).response) {
          // If err has a response property, it is an AxiosError
          setError(((err as AxiosError).response?.data as any)?.message);
        } else {
          // Handle other types of errors
          setError('An error occurred');
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
