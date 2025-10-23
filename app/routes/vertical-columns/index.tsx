import { createRoute } from 'honox/factory'
import { css } from 'hono/css'
import VerticalColumnsDemo from '../../islands/VerticalColumnsDemo'

// グローバルスタイル: bodyの基本設定
const globalStyles = css`
  :-hono-global {
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Hiragino Mincho Pro', 'Yu Mincho', 'YuMincho', 'HG Mincho E', serif;
      line-height: 1.8;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
    }
  }
`

export default createRoute((c) => {
  return c.render(
    <div class={globalStyles}>
      <VerticalColumnsDemo />
    </div>,
    { title: '縦書きマルチカラムデモ' }
  )
})
