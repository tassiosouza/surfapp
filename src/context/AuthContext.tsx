// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from './types'

// ** Redux
import { useDispatch } from 'react-redux'

// ** User Store
import { authenticateUser, setLoading } from '../store/apps/user'
import { AppDispatch } from 'src/store'

// ** Cookie
import Cookies from 'universal-cookie';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [pageLoading, setPageLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {

      const storedToken = window.localStorage.getItem('authToken')!
      const userData = window.localStorage.getItem('userData')!

      if (router.pathname != '/') {
        if (storedToken && userData) {
          setUser(JSON.parse(userData))
          setPageLoading(false)
        } else {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('authToken')
          router.replace('/login')
        }
      }

      setPageLoading(false)
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loginCallback = (error: boolean, message: string, user: any, token: string, refreshToken: string, loggedInCookieName: string, loggedInCookieValue: string, rememberMe: boolean) => {
    // set loading to false
    if (!error) {
      setPageLoading(true)

      const returnUrl = router.query.returnUrl
      setUser(user)

      console.log('login cookiename: ' + loggedInCookieName)
      console.log('login cookievalue: ' + loggedInCookieValue)
      console.log('installing auth cookie')
      console.log('option domain: ' + process.env.NEXT_PUBLIC_URL_CMS)
      const cookies = new Cookies();
      cookies.set(loggedInCookieName, loggedInCookieValue, {
        expires: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
        path: '/', // Available for all pages
        domain: process.env.NEXT_PUBLIC_URL_CMS, // Set for CMS subdomain
        secure: true, // Secure (HTTPS required)
      });

      if (rememberMe) {
        window.localStorage.setItem('authToken', token)
        window.localStorage.setItem('refreshToken', refreshToken)
        window.localStorage.setItem('userData', JSON.stringify(user))
      }

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
      setPageLoading(false)
    }
  }

  const handleLogin = (params: LoginParams) => {

    // Use the Apollo Client to make the authenticated GraphQL query
    dispatch(setLoading(true))
    dispatch(authenticateUser({ ...params, callback: loginCallback }))

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading: pageLoading,
    setUser,
    setLoading: setPageLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
