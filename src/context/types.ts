export type LoginCallbackType = (error: boolean, message: string, user: any, token: string, rememberMe: boolean) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  callback?: LoginCallbackType
}

export type RegisterParams = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams) => void
}
