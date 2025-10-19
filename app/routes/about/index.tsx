export default function About() {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>縦書きについて</title>
      </head>
      <body>
        <h1>About</h1>
        <nav>
          <ul>
            <li><a href="/">ホーム</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/vertical-columns">縦書きマルチカラムデモ</a></li>
          </ul>
        </nav>
        <p>縦書きサンドボックスのアバウトページです。</p>
        <script type="module" dangerouslySetInnerHTML={{ __html: `console.log('縦書きサンドボックス - アバウトページ');` }} />
      </body>
    </html>
  )
}
