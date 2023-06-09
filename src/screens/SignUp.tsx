import { Component, createSignal } from 'solid-js'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../config/firebase'

const SignUp: Component = () => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const onLogin = () => {
    createUserWithEmailAndPassword(auth, email(), password())
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch(() => {
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
              onChange={setEmail}
              type="text"
              name="login"
              placeholder="SignUp"
              aria-label="SignUp"
              autocomplete="nickname"
              required
            />
            <input
              onChange={setPassword}
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

export default SignUp
