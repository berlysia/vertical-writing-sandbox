import { useEffect, useRef } from 'hono/jsx'
import {
  controlPanelClass,
  panelTitleClass,
  controlGroupClass,
  controlLabelClass,
  toggleBtnClass,
  controlInputClass,
  controlSelectClass,
  togglePanelBtnClass,
} from './styles'

interface ControlPanelProps {
  isOpen: boolean
  onClose: () => void
  useViewportMode: boolean
  onToggleMode: () => void
  columnWidthValue: number
  onColumnWidthValueChange: (value: number) => void
  columnWidthUnit: string
  onColumnWidthUnitChange: (unit: string) => void
  columnWidthRawValue: string
  onColumnWidthRawValueChange: (value: string) => void
  useRawValue: boolean
  onUseRawValueChange: (value: boolean) => void
  showIndicators: boolean
  onShowIndicatorsChange: (value: boolean) => void
}

export function ControlPanel({
  isOpen,
  onClose,
  useViewportMode,
  onToggleMode,
  columnWidthValue,
  onColumnWidthValueChange,
  columnWidthUnit,
  onColumnWidthUnitChange,
  columnWidthRawValue,
  onColumnWidthRawValueChange,
  useRawValue,
  onUseRawValueChange,
  showIndicators,
  onShowIndicatorsChange,
}: ControlPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // ダイアログの開閉を制御
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

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
      onClose()
    }
  }

  return (
    <dialog ref={dialogRef} class={controlPanelClass} onClick={handleDialogClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onClose}
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
        <div class={controlLabelClass}>カラム幅の計算基準：{useViewportMode ? 'ビューポート全体' : 'スクロールコンテナ'}</div>
        <button class={toggleBtnClass} onClick={onToggleMode}>
          {useViewportMode ? 'スクロールコンテナに変更' : 'ビューポート全体に変更'}
        </button>
      </div>

      <div class={controlGroupClass}>
        <div class={controlLabelClass}>カラム幅の指定値</div>
        <div>
          <label><input type="checkbox" checked={useRawValue} onChange={(e) => onUseRawValueChange((e.target as HTMLInputElement).checked)} />生の値を使用</label>
        </div>
        { useRawValue ? (
          <input
            type="text"
            class={controlInputClass}
            value={columnWidthRawValue}
            onChange={(e) => onColumnWidthRawValueChange((e.target as HTMLInputElement).value)}
          />
        ) : (
          <>
            <div>
              <input
                type="number"
                class={controlInputClass}
                value={columnWidthValue}
                onChange={(e) => onColumnWidthValueChange(Number((e.target as HTMLInputElement).value))}
              />
              <select
                class={controlSelectClass}
                value={columnWidthUnit}
                onChange={(e) => onColumnWidthUnitChange((e.target as HTMLSelectElement).value)}
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
              <input type="range" min="50" max="1000" value={columnWidthValue} onChange={(e) => onColumnWidthValueChange(Number((e.target as HTMLInputElement).value))} style={{width: "100%"}} />
            </div>
          </>
        )}
      </div>

      <div class={controlGroupClass}>
        <div class={controlLabelClass}>インジケーター表示</div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={showIndicators}
              onChange={(e) => onShowIndicatorsChange((e.target as HTMLInputElement).checked)}
            />
            表示する
          </label>
        </div>
      </div>
    </dialog>
  )
}

export function ControlPanelToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <button class={togglePanelBtnClass} onClick={onClick} aria-label="設定を開く">
      ⚙️
    </button>
  )
}
