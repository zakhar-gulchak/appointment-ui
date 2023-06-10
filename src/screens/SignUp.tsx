import { Component, createSignal } from 'solid-js'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../config/firebase'
import './SignIn.scss'

const SignUp: Component = () => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [errorType, setErrorType] = createSignal<'email' | 'password' | null>(null)
  const onSignup = () => {
    setError('')
    setErrorType(null)

    createUserWithEmailAndPassword(auth, email(), password())
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch(error => {
        setError(error.code)
        if (error.code.includes('password')) {
          setErrorType('password')
        } else {
          setErrorType('email')
        }
      })
  }

  return (
    <main class="container">
      <article class="grid">
        <div>
          <hgroup>
            <h1>Sign up</h1>
            <h2>Please fill your email and password to create account</h2>
          </hgroup>
          <form>
            <input
              onChange={e => setEmail(e.target.value)}
              type="text"
              name="login"
              placeholder="Email"
              aria-label="Email"
              autocomplete="email"
              aria-invalid={errorType() === 'email' || 'none'}
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
              aria-invalid={errorType() === 'password' || 'none'}
              aria-describedby="password-error"
              required
            />
            {errorType() === 'password' && <small id="password-error">{error()}</small>}
            <button
              type="submit"
              class="contrast"
              onClick={(e) => {
                e.preventDefault()
                onSignup()
              }}
            >
              Create account
            </button>
          </form>
        </div>
        <div />
      </article>
    </main>
  )
}

export default SignUp
