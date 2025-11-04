import { createRoute } from 'honox/factory'

function ensureTrailngSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>Vertical Writing Sandbox</h1>
      <nav>
        <ul>
          <li><a href={`${ensureTrailngSlash(import.meta.env.BASE_URL)}/`}>Home</a></li>
          <li><a href={`${ensureTrailngSlash(import.meta.env.BASE_URL)}/about`}>About</a></li>
          <li><a href={`${ensureTrailngSlash(import.meta.env.BASE_URL)}/vertical-columns`}>Vertical Multi-Column Demo</a></li>
        </ul>
      </nav>
    </div>,
    { title: 'Vertical Writing Sandbox' }
  )
})
