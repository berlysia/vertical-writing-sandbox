import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>About</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/vertical-columns">Vertical Multi-Column Demo</a></li>
        </ul>
      </nav>
      <p>This is the about page of the Vertical Writing Sandbox.</p>
    </div>,
    { title: 'About Vertical Writing' }
  )
})
