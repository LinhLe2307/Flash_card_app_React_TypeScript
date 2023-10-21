import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: "http://localhost:5068",
    // baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async(config) => {
    // Handle token here...
    return config
}, (error) => {
    return Promise.reject(error);
})

axiosClient.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {
    return Promise.reject(error);
})

export default axiosClient