import { Component, createSignal } from 'solid-js'
import { signInWithEmailAndPassword } from 'firebase/auth'

// import { user } from '../store/user'
import { auth } from '../config/firebase'
// import firebase from 'firebase/compat'


const SignIn: Component = () => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [rememberMe, setRememberMe] = createSignal(false)
  const [error, setError] = createSignal('')
  const [errorType, setErrorType] = createSignal<'email' | 'password' | null>(null)
  const onLogin = () => {
    setError('')
    setErrorType(null)

    signInWithEmailAndPassword(auth, email(), password())
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
            <h1>Sign in</h1>
            <h2>A minimalist layout for SignUp pages</h2>
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
            <fieldset>
              <label for="remember">
                <input type="checkbox" role="switch" id="remember" name="remember" onChange={e => setRememberMe(e.target.checked)} />
                Remember me
              </label>
            </fieldset>
            <button
              type="submit"
              class="contrast"
              onClick={(e) => {
                e.preventDefault()
                onLogin()
              }}
            >
              SignUp
            </button>
          </form>
        </div>
        <div />
      </article>
    </main>
  )
}

export default SignIn
