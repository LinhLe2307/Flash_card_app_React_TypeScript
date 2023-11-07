import axios from 'axios';
import { useCallback, useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/auth-context';
import { SendRequestProps } from '../types/formTypes';

import queryString from 'query-string';

const baseURL = 'http://localhost:5068'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext)

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest:SendRequestProps = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      // const httpAbortCtrl = new AbortController();
      // activeHttpRequests.current.push(httpAbortCtrl);

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
            const response = error.response;
            // if(response.status === 404) {
            //     // how to cancel the Promise here?
            //     return false;
            // }
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
        if (err.name === 'AbortError') {
          console.log('AbortError: Fetch request aborted');
        }
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
};
