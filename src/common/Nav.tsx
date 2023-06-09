import type { Component } from 'solid-js'

const Nav: Component = () => {
  return (
    <nav class="container-fluid">
      <ul>
        <li>
          <a href="./" class="contrast" onClick={(e) => e.preventDefault()}>
            <strong>Home</strong>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
