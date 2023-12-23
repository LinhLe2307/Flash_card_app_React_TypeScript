import axios from 'axios'

const clientId = import.meta.env.VITE_PUBLIC_UNSPLASH_CLIENT_ID
const UNSPLASH_ROOT = import.meta.env.VITE_UNSPLASH_ROOT
const axiosInstance = axios.create({
    withCredentials: true
  });

const photoApi = {
    getImage: (query:string) => {
        const url = `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=20`
        return  axios.get(url + '/search/photos' )
    }
}

export default photoApi