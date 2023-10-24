import { cardApiProps } from '../types/apiTypes'
import axiosClient from './axiosClient'

const baseURL = '/api/cards'
const cardApi = {
    getAll: (params: cardApiProps) => {
        return axiosClient.get(baseURL, {params})
    },
    post: (params: string) => {
        return axiosClient.post(baseURL, params)
    },
    updateCard: (cardId: string, params: string) => {
        const url = `${baseURL}/${cardId}`
        return axiosClient.patch(url, params)
    }
    ,
    getUserCards: (userId : string) => {
        const url = `${baseURL}/user/${userId}`
        return axiosClient.get(url)
    },
    getDetailCard: (cardId: string) => {
        const url = `${baseURL}/${cardId}`
        return axiosClient.get(url)
    },
    deleteCard: (cardId: string) => {
        const url = `${baseURL}/${cardId}`
        return axiosClient.delete(url)
    }
}

export default cardApi