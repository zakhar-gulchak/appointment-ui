import { createSignal } from 'solid-js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { A } from '@solidjs/router'
import Avatar from '@suid/material/Avatar'
import Button from '@suid/material/Button'
import CssBaseline from '@suid/material/CssBaseline'
import TextField from '@suid/material/TextField'
import FormControlLabel from '@suid/material/FormControlLabel'
import Checkbox from '@suid/material/Checkbox'
import Paper from '@suid/material/Paper'
import Box from '@suid/material/Box'
import Grid from '@suid/material/Grid'
import LockOutlinedIcon from '@suid/icons-material/LockOutlined'
import Typography from '@suid/material/Typography'

import { auth } from '../config/firebase'
import Copyright from '../common/Copyright'
import { redirectLoggedInUser } from '../utils/navigation'
import { setUserData } from '../store/user'

export default function SignInSide() {
  redirectLoggedInUser()

  // todo: implement remember me
  // const [rememberMe, setRememberMe] = createSignal(false)
  const [error, setError] = createSignal('')
  const [errorType, setErrorType] = createSignal<'email' | 'password' | null>(null)

  const handleSubmit = (event: FormDataEvent) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setError('')
    setErrorType(null)

    signInWithEmailAndPassword(auth, data.get('email') as string, data.get('password') as string)
      .then(({ user }) => {
        auth.currentUser?.getIdTokenResult().then(({ token: accessToken, expirationTime }) => {
          setUserData({
            user: {
              email: user.email ?? '',
              firstName: user.displayName?.split(' ')[0] ?? '',
              lastName: user.displayName?.split(' ')[1] ?? '',
              expirationTime,
            },
            accessToken,
          })
        })
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          setError(error.code)
          if (error.code.includes('password')) {
            setErrorType('password')
          } else {
            setErrorType('email')
          }
        }
      })
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          get backgroundColor() {
            return (t: { palette: { mode: string; grey: string[] } }) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errorType() === 'email' || undefined}
              helperText={error()}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errorType() === 'password' || undefined}
              helperText={error()}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <A href="/recover-password" variant="body2">
                  Forgot password?
                </A>
              </Grid>
              <Grid item>
                <A href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </A>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
