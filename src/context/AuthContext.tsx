// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from './types'

// ** Redux
import { useDispatch } from 'react-redux'

// ** User Store
import { authenticateUser, setAuthenticating } from '../store/apps/user'
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
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        // setLoading(true)
        // await axios
        //   .get(authConfig.meEndpoint, {
        //     headers: {
        //       Authorization: storedToken
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     setUser({ ...response.data.userData })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //     if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
        //       router.replace('/login')
        //     }
        //   })
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loginCallback = (error: boolean, message: string, user: any) => {
    // set loading to false

    console.log(JSON.stringify('store object: ' + user))
    console.log(message)
    if (!error) {
      setLoading(true)

      // params.rememberMe

      //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
      //   : null
      const returnUrl = router.query.returnUrl
      console.log('trying to set user: ' + JSON.stringify(user))
      setUser(user)

      // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(user)) : null
      // window.localStorage.setItem('userData', JSON.stringify(user))
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
      setLoading(false)
    }
  }

  const handleLogin = (params: LoginParams) => {
    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl

    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    //     router.replace(redirectURL as string)
    //   })

    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })

    // Use the Apollo Client to make the authenticated GraphQL query
    dispatch(setAuthenticating(true))
    dispatch(authenticateUser({ ...params, callback: loginCallback }))


    // client.mutate({
    //   mutation: LOGIN,
    //   variables: {
    //     input: {
    //       username: params.email,
    //       password: params.password,
    //     },
    //   },
    // })
    //   .then(response => {
    //     console.log(response)
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.login.authToken)
    //       : null

    //     const returnUrl = router.query.returnUrl

    //     setUser({ ...response.data.login.user })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.login.user)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    //     router.replace(redirectURL as string)
    //   })
    //   .catch(error => console.error('Error:', error));
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
