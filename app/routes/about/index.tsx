import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>About</h1>
      <nav>
        <ul>
          <li><a href="/">ホーム</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/vertical-columns">縦書きマルチカラムデモ</a></li>
        </ul>
      </nav>
      <p>縦書きサンドボックスのアバウトページです。</p>
    </div>,
    { title: '縦書きについて' }
  )
})
