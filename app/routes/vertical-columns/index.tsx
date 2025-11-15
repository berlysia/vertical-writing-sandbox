import { createRoute } from 'honox/factory'
import { css } from 'hono/css'
import VerticalColumnsDemo from '../../islands/VerticalColumnsDemo'

// Global styles: body base settings
const globalStyles = css`
  :-hono-global {
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Hiragino Mincho Pro', 'Yu Mincho', 'YuMincho', 'HG Mincho E', serif;
      line-height: 1.8;
      font-size: 16px;
      margin: 0;
      padding: 0;
      background-color: #9b9b9bff;
      text-size-adjust: none;
    }
  }
`

export default createRoute((c) => {
  return c.render(
    <div class={globalStyles}>
      <VerticalColumnsDemo />
    </div>,
    { title: 'Vertical Multi-Column Demo' }
  )
})
