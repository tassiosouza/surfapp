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

      console.log('init auth')
      const storedToken = window.localStorage.getItem('accessToken')!
      const userData = window.localStorage.getItem('userData')!

      if (storedToken && userData) {
        setUser(JSON.parse(userData))
        setPageLoading(false)
      } else {
        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        router.replace('/login')
      }
      setPageLoading(false)
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loginCallback = (error: boolean, message: string, user: any, token: string, rememberMe: boolean) => {
    // set loading to false

    console.log(JSON.stringify('store object: ' + user))
    console.log(message)
    if (!error) {
      setPageLoading(true)

      const returnUrl = router.query.returnUrl
      console.log('trying to set user: ' + JSON.stringify(user))
      setUser(user)

      if (rememberMe) {
        console.log('setting storage')
        window.localStorage.setItem('accessToken', token)
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
