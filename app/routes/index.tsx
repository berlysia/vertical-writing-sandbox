import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>縦書きサンドボックス</h1>
      <nav>
        <ul>
          <li><a href="/">ホーム</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/vertical-columns">縦書きマルチカラムデモ</a></li>
        </ul>
      </nav>
    </div>,
    { title: '縦書きサンドボックス' }
  )
})
