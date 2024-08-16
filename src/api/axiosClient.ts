import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE__API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})

let source = axios.CancelToken.source();
axiosClient.interceptors.request.use(async(config) => {
    // Handle token here...
    config.cancelToken = source.token;
    return config;
}, (error) => {
    return Promise.reject(error);
})

axiosClient.interceptors.response.use(response => {

    if (response && response.data) {
        return response.data
    } 
    return response
}, (error) => {
    const response = error.response;
    if(response.status === 404) {
        // how to cancel the Promise here?
        return false;
    }
    return Promise.reject(error);
})

export default axiosClient