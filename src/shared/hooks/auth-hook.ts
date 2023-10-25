import { useCallback, useEffect, useState } from "react"
import { LoginProps } from "../context/auth-context"

let logoutTimer: ReturnType<typeof setTimeout>
export const useAuth = () => {
    const [token, setToken] = useState<null | string>(null)
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>()
    const [userId, setUserId] = useState('')
    

    const login: LoginProps = useCallback((uid, token, expirationDate) => {
        setToken(token)

        // check if the token is expired after 1 hour
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem('userData', JSON.stringify({
            userId: uid, 
            token: token, 
            expiration: tokenExpirationDate.toISOString() // Expected output: "2023-10-35T13:13:00.000Z"
        }))
        setUserId(uid)
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setTokenExpirationDate(null)
        setUserId('')
        localStorage.removeItem('userData')
    }, [])


    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
        const userDataStorage = localStorage.getItem('userData')
        const storedData = userDataStorage && JSON.parse(userDataStorage)
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            // if new Date(storedData.expiration) > new Date() => the expiration is still valid in the future
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login])

  return { token, userId, login, logout }
}