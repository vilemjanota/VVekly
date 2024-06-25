import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => { setIsAuthorized(false) })
    }, [])

    //refresh the access token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post('/auth/token/refresh/', {
                refresh: refreshToken
            })
            if(response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            }
            else {
                setIsAuthorized(false)
            }
        }
        catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    //check if the user is authorized
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const currentTime = Date.now() / 1000

        if(currentTime > tokenExpiration) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }
    }

    //render the loading state while checking authorization
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    //render the protected route if authorized, otherwise redirect to login
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute