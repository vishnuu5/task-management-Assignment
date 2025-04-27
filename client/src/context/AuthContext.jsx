

import { createContext, useState, useEffect } from "react"
import api from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    api.setToken(token)
                    const response = await api.get("/users/me")
                    setUser(response.data)
                } catch (err) {
                    console.error("Failed to load user:", err)
                    logout()
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        loadUser()
    }, [token])

    const register = async (userData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post("/users/register", userData)
            const { token } = response.data

            localStorage.setItem("token", token)
            setToken(token)
            api.setToken(token)

            const userResponse = await api.get("/users/me")
            setUser(userResponse.data)
            return true
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
            return false
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post("/users/login", credentials)
            const { token } = response.data

            localStorage.setItem("token", token)
            setToken(token)
            api.setToken(token)

            const userResponse = await api.get("/users/me")
            setUser(userResponse.data)
            return true
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
        api.setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                register,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
