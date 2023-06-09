import { Component, createSignal } from 'solid-js'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { user } from '../store/user'
import { auth } from '../config/firebase'

const SignIn: Component = () => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const onLogin = () => {
    console.log(email(), password())
    createUserWithEmailAndPassword(auth, email(), password())
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        console.log(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
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
              placeholder="SignUp"
              aria-label="SignUp"
              autocomplete="nickname"
              required
            />
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autocomplete="current-password"
              required
            />
            <fieldset>
              <label for="remember">
                <input type="checkbox" role="switch" id="remember" name="remember" />
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
