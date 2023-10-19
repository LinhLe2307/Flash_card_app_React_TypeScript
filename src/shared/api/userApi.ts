import axiosClient from './axiosClient';

const userApi = {
    signup: (params:string) => {
        const url = '/api/users/signup'
        return axiosClient.post(url, params)
    },
    login: (params:string) => {
        const url = '/api/users/login'
        return axiosClient.post(url, params)
    }
}
export default userApi;