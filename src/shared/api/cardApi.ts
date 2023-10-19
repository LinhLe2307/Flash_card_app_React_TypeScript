import { cardApiProps } from '../types/apiTypes'
import axiosClient from './axiosClient'

const cardApi = {
    getAll: (params: cardApiProps) => {
        const url = '/api/cards'
        return axiosClient.get(url, {params})
    }
}

export default cardApi