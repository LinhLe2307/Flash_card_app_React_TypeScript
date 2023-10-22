import { cardApiProps } from '../types/apiTypes'
import axiosClient from './axiosClient'

const baseURL = '/api/cards'
const cardApi = {
    getAll: (params: cardApiProps) => {
        return axiosClient.get(baseURL, {params})
    },
    post: (params) => {
        return axiosClient.post(baseURL, params)
    },
    getUserCards: (userId : string) => {
        const url = `${baseURL}/user/${userId}`
        return axiosClient.get(url)
    }
}

export default cardApi