

// 1. Create a new context

import { createContext, useState, useEffect } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { decodeToken, client as axiosClient } from '../Services/AuthService'


export const AuthContext = createContext()


// 2. Create a Provider para compartir el estado del usuario
export function AuthProvider({ children }) 
{
    const [user, setUser]   = useState(null)
    const [token, setToken] = useState(null)
    const { mutateAsync: loginMutation, isLoading, isError } = useLogin()

    const login = async (email, password) => {
        const newToken = await loginMutation({ email, password })
        localStorage.setItem('authToken', newToken)
        axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`
        setToken(newToken)
        const data = decodeToken(newToken)
        setUser({ email, ...data })
        return data
      }

      const logout = () => {
        localStorage.removeItem('authToken')
        delete axiosClient.defaults.headers.common.Authorization
        setToken(null)
        setUser(null)
      }

        // rehydrate on mount
  useEffect(() => {
    const stored = localStorage.getItem('authToken')
    if (stored) {
      setToken(stored)
      axiosClient.defaults.headers.common.Authorization = `Bearer ${stored}`
      const data = decodeToken(stored)
      setUser({ email: data.email, ...data })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser,
        loginLoading: isLoading,
        loginError: isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )

  
}
