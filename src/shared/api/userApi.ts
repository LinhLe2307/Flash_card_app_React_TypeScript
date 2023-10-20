import axiosClient from './axiosClient';
const baseUrl = '/api/users'

const userApi = {
    signup: (params:string) => {
        const url = baseUrl + '/signup'
        return axiosClient.post(url, params)
    },
    login: (params:string) => {
        const url = baseUrl + '/login'
        return axiosClient.post(url, params)
    },
    getAll: () => {
        const url = baseUrl
        return axiosClient.get(url)
    }
}
export default userApi;