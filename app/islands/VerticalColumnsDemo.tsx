import { useState, useEffect, useRef } from 'hono/jsx'
import { css } from 'hono/css'
import TextContent from '../components/TextContentPlain'
import { ViewportHeightIndicator } from '../components/ViewportHeightIndicator'
import { ColumnHeightIndicator } from './ColumnHeightIndicator'

// フローティングコントロールパネル（Dialog要素）
const controlPanelClass = css`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  min-width: 280px;
  max-width: 90vw;

  margin-block-end: 20px;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: calc(100vw - 40px);
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

// 開閉トグルボタン
const togglePanelBtnClass = css`
  position: fixed;
  bottom: 64px;
  left: 0;
  right: 0;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: #fefefe;
  border: 2px solid #3498db;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
`

// ビューポート全体表示モード
const viewportFullWrapperClass = css`
`;

const viewportFullClass = css`
  width: 100%;
  max-width: 640px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`

// スクロールコンテナ表示モード
const scrollContainerWrapperClass = css`
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const scrollContainerClass = css`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  width: 100%;
  max-width: 640px;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  background-color: #fefefe;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`

const textWrapperClass = css`
  width: 100%;
`;

// 縦書きテキストの基本スタイル
const verticalTextBaseClass = css`
  width: 100%;
  column-gap: 20px;
  column-rule: 1px solid #e9ecef;
  line-height: 1.8;
  color: #2c3e50;
  background-color: #fefefe;
`;

export default function VerticalColumnsDemo() {
  // コントロールパネルの開閉状態
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // true = ビューポート全体, false = スクロールコンテナ
  const [useViewportMode, setUseViewportMode] = useState(true)
  const [columnWidthUnit, setColumnWidthUnit] = useState('px')
  const [columnWidthValue, setColumnWidthValue] = useState(200)
  const columnWidthJoined = `${columnWidthValue}${columnWidthUnit}`
  const [columnWidthRawValue, setColumnWidthRawValue] = useState(columnWidthJoined);
  const [useRawValue, setUseRawValue] = useState(false);
  const columnWidth = useRawValue ? columnWidthRawValue : columnWidthJoined;

  // ダイアログの開閉を制御
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isPanelOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isPanelOpen && dialog.open) {
      dialog.close()
    }
  }, [isPanelOpen])

  const toggleMode = () => {
    setUseViewportMode(!useViewportMode)
  }

  const openPanel = () => {
    setIsPanelOpen(true)
  }

  const closePanel = () => {
    setIsPanelOpen(false)
  }

  // バックドロップクリックで閉じる
  const handleDialogClick = (e: MouseEvent) => {
    const dialog = dialogRef.current
    if (!dialog) return

    const rect = dialog.getBoundingClientRect()
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width

    if (!clickedInDialog) {
      closePanel()
    }
  }

  return (
    <>
      <button class={togglePanelBtnClass} onClick={openPanel} aria-label="設定を開く">
        ⚙️
      </button>

      <dialog ref={dialogRef} class={controlPanelClass} onClick={handleDialogClick}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={closePanel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d',
              padding: '0',
              lineHeight: '1',
            }}
            aria-label="設定を閉じる"
          >
            ×
          </button>
          <div class={panelTitleClass} style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>表示モード設定</div>
        </div>
        <div style={{ height: '2px', backgroundColor: '#3498db', marginBottom: '15px' }}></div>

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
              <div>
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
              </div>
              <div>
                <input type="range" min="50" max="1000" value={columnWidthValue} onChange={(e) => setColumnWidthValue(Number((e.target as HTMLInputElement).value))} style={{width: "100%"}} />
              </div>
            </>
          )}
        </div>

        <div class={statusClass}>
          現在: {useViewportMode ? 'ビューポート全体' : 'スクロールコンテナ'}
        </div>
      </dialog>

      {/* テキスト表示エリア */}
      {useViewportMode ? (
        // ビューポート全体表示
        <div class={viewportFullWrapperClass}>
          <div class={viewportFullClass}>
            <ViewportHeightIndicator />
            <div class={textWrapperClass}>
              <div class={verticalTextBaseClass} style={{ columnWidth }}>
               <ColumnHeightIndicator columnSize={columnWidth} columnGap="20px" columnRule="1px" />
                <TextContent />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // スクロールコンテナ表示
        <div class={scrollContainerWrapperClass}>
          <div class={scrollContainerClass}>
            <ViewportHeightIndicator />
            <div class={textWrapperClass}>
              <div class={verticalTextBaseClass} style={{ columnWidth }}>
                <ColumnHeightIndicator columnSize={columnWidth} columnGap="20px" columnRule="1px" />
                <TextContent />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
