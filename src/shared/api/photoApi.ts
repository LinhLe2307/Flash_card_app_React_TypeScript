import axios from 'axios'

const clientId = process.env.VITE__NEXT_PUBLIC_UNSPLASH_CLIENT_ID
const UNSPLASH_ROOT = 'https://api.unsplash.com'

const photoApi = {
    getImage: (query:string) => {
        const url = `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=20`
        return  axios.get(url + '/search/photos' )
    }
}

export default photoApi