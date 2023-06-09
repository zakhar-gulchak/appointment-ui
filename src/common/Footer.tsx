import type { Component } from 'solid-js'

const Footer: Component = () => {
  return (
    <footer class="container-fluid">
      <small>
        Built with{' '}
        <a href="https://picocss.com" class="secondary">
          Pico
        </a>{' '}
        •{' '}
        <a href="https://github.com/picocss/examples/tree/master/sign-in/" class="secondary">
          Source code
        </a>
      </small>
    </footer>
  )
}

export default Footer
