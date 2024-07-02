import { createContext } from 'react'

export interface LoginProps {
    (avatarImage:string, uid: string, token: string, expirationDate?: Date) : void, 
}

interface AuthContextProps {
    isLoggedIn: boolean, 
    userId: null | string,
    token: null | string,
    login: LoginProps,
    logout:()=> void,
    image: string
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false, 
    userId: null,
    token: null,
    login: () => {}, 
    logout:()=> {},
    image: ''
})