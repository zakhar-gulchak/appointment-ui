import { Component, createEffect, createSignal } from 'solid-js'
import { Link, useNavigate } from '@solidjs/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

import { user, setUser } from '../store/user'
import { auth } from '../config/firebase'
import styles from './SignIn.module.scss'
import './SignIn.scss'

const SignIn: Component = () => {
  const navigate = useNavigate()
  createEffect(() => {
    if (new Date(user.expirationTime).getTime() > Date.now() && user.accessToken) {
      console.log('nav')
      navigate('/dashboard', { replace: true })
    }
  })
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  // todo: implement remember me
  const [rememberMe, setRememberMe] = createSignal(false)
  const [error, setError] = createSignal('')
  const [errorType, setErrorType] = createSignal<'email' | 'password' | null>(null)

  const onLogin = () => {
    setError('')
    setErrorType(null)

    signInWithEmailAndPassword(auth, email(), password())
      .then(({ user }) => {
        auth.currentUser?.getIdTokenResult().then(({token, expirationTime}) => {
          setUser(user, token, expirationTime)
        })
      })
      .catch(error => {
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
    <main class="container">
      <article class="grid">
        <div>
          <hgroup>
            <h1>Sign in</h1>
            <h2>Please fill your credentials</h2>
          </hgroup>
          <form>
            <input
              onChange={e => setEmail(e.target.value)}
              type="text"
              name="login"
              placeholder="Email"
              aria-label="Email"
              autocomplete="email"
              aria-invalid={errorType() === 'email' || undefined}
              aria-describedby="email-error"
              required
            />
            {errorType() === 'email' && <small id="email-error">{error()}</small>}
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autocomplete="current-password"
              aria-invalid={errorType() === 'password' || undefined}
              aria-describedby="password-error"
              required
            />
            {errorType() === 'password' && <small id="password-error">{error()}</small>}
            <fieldset>
              <label for="remember">
                <input type="checkbox" role="switch" id="remember" name="remember" onChange={e => setRememberMe(e.target.checked)} />
                Remember me
              </label>
            </fieldset>
            <div class={styles.submitButton}>
              <button
                type="submit"
                class="contrast"
                onClick={(e) => {
                  e.preventDefault()
                  onLogin()
                }}
              >
                Sign In
              </button>
              <span>Not registered yet? <Link href="/signup" class="secondary">Sign Up</Link></span>
            </div>
          </form>
        </div>
        <div />
      </article>
    </main>
  )
}

export default SignIn
