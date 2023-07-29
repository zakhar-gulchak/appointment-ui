import { Component, createEffect, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import Avatar from '@suid/material/Avatar'
import Button from '@suid/material/Button'
import CssBaseline from '@suid/material/CssBaseline'
import TextField from '@suid/material/TextField'
import FormControlLabel from '@suid/material/FormControlLabel'
import Checkbox from '@suid/material/Checkbox'
import Link from '@suid/material/Link'
import Grid from '@suid/material/Grid'
import Box from '@suid/material/Box'
import LockOutlinedIcon from '@suid/icons-material/LockOutlined'
import Typography from '@suid/material/Typography'
import Container from '@suid/material/Container'

import { auth } from '../config/firebase'
import Copyright from '../common/Copyright'
import { redirectLoggedInUser } from '../utils/navigation'

const SignUp: Component = () => {
  redirectLoggedInUser()

  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [errorType, setErrorType] = createSignal<'email' | 'password' | null>(null)

  const handleSubmit = (event: FormDataEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setError('')
    setErrorType(null)

    createUserWithEmailAndPassword(
      auth,
      data.get('email') as string,
      data.get('password') as string,
    )
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default SignUp
