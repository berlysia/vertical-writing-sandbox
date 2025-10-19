export default function Index() {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>縦書きサンドボックス</title>
      </head>
      <body>
        <h1>縦書きサンドボックス</h1>
        <nav>
          <ul>
            <li><a href="/">ホーム</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/vertical-columns">縦書きマルチカラムデモ</a></li>
          </ul>
        </nav>
        <script type="module" dangerouslySetInnerHTML={{ __html: `console.log('縦書きサンドボックス - ホームページ');` }} />
      </body>
    </html>
  )
}
