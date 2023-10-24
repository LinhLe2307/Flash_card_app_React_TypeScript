import { createContext } from 'react'

interface AuthContextProps {
    isLoggedIn: boolean, 
    userId: null | string,
    token: null | string,
    login: (uid: string, token: string) => void, 
    logout:()=> void
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false, 
    userId: null,
    token: null,
    login: (uid, token) => {}, 
    logout:()=> {}
})