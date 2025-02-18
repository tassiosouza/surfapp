// ** React Imports
import { ReactNode, useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { Alert, CircularProgress, Snackbar } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Formik
import { useFormik } from 'formik'

// ** Yup
import * as yup from 'yup'

// ** Store
import { registerUser, setShowNotice } from 'src/store/apps/user'

// **  Redux
import { useDispatch } from 'react-redux'
import { RootState, AppDispatch } from 'src/store'
import { useSelector } from 'react-redux'
import { setLoading } from 'src/store/apps/user'

// ** Types
import { LoginCallbackType, RegisterParams } from 'src/context/types'

// import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

// ** Next Import
import { useRouter } from 'next/router'

import { GoogleLogin } from '@react-oauth/google';

import { jwtDecode } from 'jwt-decode';

const StyledGoogleLogin = styled(GoogleLogin)`
  width: 100%;
  border-radius: 50px !important;
  padding: 0px 10px !important;
  border: 1px solid #82cbec !important;
  box-shadow: none !important;
  & span {
    width: 70%;
    font-weight: 600 !important;
    font-size: 15px;
  }
`;

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

interface IDecodedToken {
  exp: number;
  jti: string;
  given_name: string;
  family_name: string;
  email: string;
  // Add other properties as needed
}

const Register = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)
  const auth = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   import('gapi-script').then(({ gapi }) => {
  //     gapi.load("client:auth2", () => {
  //       gapi.client.init({
  //         clientId: "253351648248-ild4se61nuetujl04edfnmjamc1n3s7a.apps.googleusercontent.com",
  //         plugin_name: "chat",
  //       });
  //     });
  //   });
  // }, []);

  const socialLoginCallback = (error: boolean, message: string, user: any, token: string, refreshToken: string, loggedInCookieName: string, loggedInCookieValue: string, rememberMe: boolean) => {
    auth.setUser(user)
    window.localStorage.setItem('authToken', token)
    window.localStorage.setItem('userData', JSON.stringify(user))
    window.localStorage.setItem('refreshToken', refreshToken);

    console.log('save name: ' + loggedInCookieName + ' value: ' + loggedInCookieValue)
    router.replace('/dashboards/home')
  }

  const responseGoogle = (newResponse: any) => {

    if ('credential' in newResponse) {
      // Set loading to true in the store
      dispatch(setLoading(true));
      // Call the store function to register the user

      const decodedToken: IDecodedToken = jwtDecode(newResponse.credential);

      const response = {
        "access_token": newResponse.credential,
        "expires_in": decodedToken.exp,  // This value is static, replace with actual value if available
        "id_token": decodedToken.jti,
        "token_type": "Bearer"
      };
      const values = {
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        email: decodedToken.email,
        password: 'defaultPassword123!',
        agreeToTerms: true,
        description: JSON.stringify(response),
        imageUrl: '',
        socialLoginCallback: socialLoginCallback
      };
      dispatch(setLoading(true))
      dispatch(registerUser(values as RegisterParams))
    }
    else {
      // window.alert('Google login response failed. Please try again.');
    }
  }


  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  // ** Validation Schema
  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
    agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms and privacy policy'),
  })

  // ** Formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agreeToTerms: false,
      description: '',
      imageUrl: '',
      socialLoginCallback: undefined
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      dispatch(setLoading(true))
      dispatch(registerUser(values as RegisterParams))
    },
  })

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setShowNotice(false))
  };

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          {/* <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} /> */}
          <img src='https://surfshotsd.s3.amazonaws.com/20240126045005/3824.jpg' alt='' />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                {/* ... (existing code) */}
              </svg>
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Create Your Account</TypographyStyled>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
                <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Log in
                </Typography>
              </Box>
            </Box>
            <Box sx={{ paddingInline: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              {/* <StyledGoogleLogin
                clientId={'253351648248-ild4se61nuetujl04edfnmjamc1n3s7a.apps.googleusercontent.com'}
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}
              <GoogleLogin
                onSuccess={credentialResponse => {
                  responseGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              <Box height={10}></Box>
              <IconButton href='/' component={Link} sx={{ color: '#497ce2', border: '1px solid #82cbec', borderRadius: '50px', padding: '10px 20px' }} onClick={(e) => e.preventDefault()}>
                <Icon icon='mdi:facebook' width={20} />
                <Typography sx={{ ml: '7px', fontSize: '14px', fontWeight: '600' }}>Continue with Facebook</Typography>
              </IconButton>
            </Box>
            <Divider
              sx={{
                '& .MuiDivider-wrapper': { px: 4 },
                mt: theme => `${theme.spacing(5)} !important`,
                mb: theme => `${theme.spacing(7.5)} !important`
              }}
            >
              or
            </Divider>
            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
              <TextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label='First Name'
                id='firstName'
                name='firstName'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                sx={{ mb: 4 }}
                label='Last Name'
                id='lastName'
                name='lastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                fullWidth
                label='Email'
                sx={{ mb: 4 }}
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  id='auth-login-v2-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}

                // helperText={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox
                  id='agreeToTerms'
                  name='agreeToTerms'
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                  color='primary'
                />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                label={
                  <>
                    <Typography variant='body2' component='span'>
                      I agree to{' '}
                    </Typography>
                    <LinkStyled href='/' onClick={(e) => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </>
                }
              />
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                {store.loading ? <CircularProgress size="1.6rem" sx={{ color: 'white' }} /> : 'Sign up'}
              </Button>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={store.showNotice} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={store.message.includes('Successfully') ? "success" : 'error'} sx={{ width: '100%' }}>
          {store.message}
        </Alert>
      </Snackbar>
    </Box >
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
