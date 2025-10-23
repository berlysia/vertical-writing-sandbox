import { useState } from 'hono/jsx'
import { css, cx } from 'hono/css'
import TextContent from '../components/TextContent'

// フローティングコントロールパネル
const controlPanelClass = css`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 280px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
  }
`

const panelTitleClass = css`
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
`

const controlGroupClass = css`
  margin-bottom: 15px;
`

const controlLabelClass = css`
  display: block;
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
  font-weight: 600;
`

const toggleBtnClass = css`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.98);
  }
`

const controlInputClass = css`
  width: 60%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  margin-right: 8px;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`

const controlSelectClass = css`
  width: 30%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`

const statusClass = css`
  font-size: 13px;
  padding: 10px 12px;
  border-radius: 6px;
  background-color: #e8f5e8;
  color: #2e7d2e;
  border: 1px solid #c3e6c3;
  text-align: center;
  font-weight: 500;
`

// ビューポート全体表示モード
const viewportFullClass = css`
  width: 100%;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  position: relative;
  inset: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: #fefefe;
  overflow: auto;
`

// スクロールコンテナ表示モード
const scrollContainerWrapperClass = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`

const scrollContainerClass = css`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  width: 80%;
  max-width: 800px;
  height: 80vh;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  background-color: #fefefe;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 70vh;
  }
`

// 縦書きテキストの基本スタイル
const verticalTextBaseClass = css`
  width: 100%;
  column-gap: 20px;
  column-rule: 1px solid #e9ecef;
  padding: 40px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1.8;
  color: #2c3e50;
`;

function ColumnHeightIndicator({ columnSize, columnGap, columnRule }: { columnSize: string, columnGap: string, columnRule: string }) {
  // repeating-linear-gradientで繰り返しパターンを生成
  // 縦書きマルチカラムでは、カラムは上から下に並ぶため、
  // グラデーションも縦方向（to bottom）に進める
  return (
    <div
      style={{
        position: 'absolute',
        insetInlineStart: "40px",
        insetBlockStart: "40px",
        inlineSize: '100%', // 縦方向（上から下）に伸ばす
        blockSize: '2px', // 横方向の太さ
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          blue 0,
          blue ${columnSize},
          #fd2 ${columnSize},
          #fd2 calc(${columnSize} + ${columnGap} + ${columnRule} )
        )`,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function VerticalColumnsDemo() {
  // true = ビューポート全体, false = スクロールコンテナ
  const [useViewportMode, setUseViewportMode] = useState(false)
  const [columnWidthUnit, setColumnWidthUnit] = useState('px')
  const [columnWidthValue, setColumnWidthValue] = useState(200)
  const columnWidthJoined = `${columnWidthValue}${columnWidthUnit}`
  const [columnWidthRawValue, setColumnWidthRawValue] = useState(columnWidthJoined);
  const [useRawValue, setUseRawValue] = useState(false);
  const columnWidth = useRawValue ? columnWidthRawValue : columnWidthJoined;

  const toggleMode = () => {
    setUseViewportMode(!useViewportMode)
    console.log(`Display mode changed to: ${!useViewportMode ? 'viewport' : 'scroll container'}`)
  }

  return (
    <>
      {/* フローティングコントロールパネル */}
      <div class={controlPanelClass}>
        <div class={panelTitleClass}>表示モード設定</div>

        <div class={controlGroupClass}>
          <div class={controlLabelClass}>カラム幅の計算基準</div>
          <button class={toggleBtnClass} onClick={toggleMode}>
            {useViewportMode ? 'スクロールコンテナに変更' : 'ビューポート全体に変更'}
          </button>
        </div>

        <div class={controlGroupClass}>
          <div class={controlLabelClass}>カラム幅の指定値</div>
          <div>
            <label><input type="checkbox" checked={useRawValue} onChange={(e) => setUseRawValue((e.target as HTMLInputElement).checked)} />生の値を使用</label>
          </div>
          { useRawValue ? (
            <input
              type="text"
              class={controlInputClass}
              value={columnWidthRawValue}
              onChange={(e) => setColumnWidthRawValue((e.target as HTMLInputElement).value)}
            />
          ) : (
            <>
              <input
                type="number"
                class={controlInputClass}
                value={columnWidthValue}
                onChange={(e) => setColumnWidthValue(Number((e.target as HTMLInputElement).value))}
              />
              <select
                class={controlSelectClass}
                value={columnWidthUnit}
                onChange={(e) => setColumnWidthUnit((e.target as HTMLSelectElement).value)}
              >
                <option value="px">px</option>
                <option value="cqh">cqh</option>
                <option value="vh">vh</option>
                <option value="dvh">dvh</option>
                <option value="svh">svh</option>
                <option value="lvh">lvh</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
              </select>
            </>
          )}
        </div>

        <div class={statusClass}>
          現在: {useViewportMode ? 'ビューポート全体' : 'スクロールコンテナ'}
        </div>
      </div>

      {/* テキスト表示エリア */}
      {useViewportMode ? (
        // ビューポート全体表示
        <div class={viewportFullClass}>
          <ColumnHeightIndicator columnSize={columnWidth} columnGap="20px" columnRule="1px" />
          <div class={verticalTextBaseClass} style={{ columnWidth }}>
            <TextContent />
          </div>
        </div>
      ) : (
        // スクロールコンテナ表示
        <div class={scrollContainerWrapperClass}>
          <div class={scrollContainerClass}>
            <ColumnHeightIndicator columnSize={columnWidth} columnGap="20px" columnRule="1px" />
            <div class={verticalTextBaseClass} style={{ columnWidth }}>
              <TextContent />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
