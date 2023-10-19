import { userApiProps } from '../types/apiTypes';
import axiosClient from './axiosClient';

const userApi = {
    signup: (params:userApiProps) => {
        const url = '/api/users/signup'
        return axiosClient.post(url, params)
    }
}
export default userApi;