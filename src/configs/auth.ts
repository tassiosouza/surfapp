export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'authToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
