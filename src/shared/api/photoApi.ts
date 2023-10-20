import axios from 'axios'
import axiosClient from './axiosClient'
// const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID
const clientId = 'jGKs1Y1sQ5phKJ5Ezh5zBB3ugbc6JFQjvt3ZURZ-xLQ'
const UNSPLASH_ROOT = 'https://api.unsplash.com'

const photoApi = {
    getImage: (query:string) => {
        const url = `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=20`
        return  axios.get(url + '/search/photos' )
    }
}

export default photoApi