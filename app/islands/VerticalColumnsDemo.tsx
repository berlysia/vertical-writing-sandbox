import { useState } from 'hono/jsx'
import { css } from 'hono/css'
import TextContent from '../components/TextContent'
import { ViewportHeightIndicator } from '../components/ViewportHeightIndicator'
import { ColumnHeightIndicator } from './ColumnHeightIndicator'
import { ControlPanel, ControlPanelToggleButton } from '../components/ControlPanel'

// Full viewport display mode
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

// Scroll container display mode
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
  overflow-y: auto;
  position: relative;
`

const textWrapperClass = css`
  width: 100%;
`;

// Base styles for vertical text
const verticalTextBaseClass = css`
  width: 100%;
  column-gap: 20px;
  column-rule: 1px solid #e9ecef;
  line-height: 1.8;
  color: #2c3e50;
  background-color: #fefefe;
`;

export default function VerticalColumnsDemo() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [useViewportMode, setUseViewportMode] = useState(true)
  const [columnWidthUnit, setColumnWidthUnit] = useState('px')
  const [columnWidthValue, setColumnWidthValue] = useState(200)
  const columnWidthJoined = `${columnWidthValue}${columnWidthUnit}`
  const [columnWidthRawValue, setColumnWidthRawValue] = useState(columnWidthJoined)
  const [useRawValue, setUseRawValue] = useState(false)
  const columnWidth = useRawValue ? columnWidthRawValue : columnWidthJoined
  const [showIndicators, setShowIndicators] = useState(true)

  const toggleMode = () => {
    setUseViewportMode(!useViewportMode)
  }

  return (
    <>
      <ControlPanelToggleButton onClick={() => setIsPanelOpen(true)} />

      <ControlPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        useViewportMode={useViewportMode}
        onToggleMode={toggleMode}
        columnWidthValue={columnWidthValue}
        onColumnWidthValueChange={setColumnWidthValue}
        columnWidthUnit={columnWidthUnit}
        onColumnWidthUnitChange={setColumnWidthUnit}
        columnWidthRawValue={columnWidthRawValue}
        onColumnWidthRawValueChange={setColumnWidthRawValue}
        useRawValue={useRawValue}
        onUseRawValueChange={setUseRawValue}
        showIndicators={showIndicators}
        onShowIndicatorsChange={setShowIndicators}
      />

      {/* Text display area */}
      {useViewportMode ? (
        // Full viewport display
        <div class={viewportFullWrapperClass}>
          <div class={viewportFullClass}>
            {showIndicators && <ViewportHeightIndicator />}
            <div class={textWrapperClass}>
              <div class={verticalTextBaseClass} style={{ columnWidth }}>
                {showIndicators && <ColumnHeightIndicator columnSize={columnWidth} columnGap="20px" columnRule="1px" />}
                <TextContent />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Scroll container display
        <div class={scrollContainerWrapperClass}>
          <div class={scrollContainerClass}>
            {showIndicators && <ViewportHeightIndicator />}
            <div class={textWrapperClass}>
              <div class={verticalTextBaseClass} style={{ columnWidth }}>
                {showIndicators && <ColumnHeightIndicator columnSize={columnWidth} columnGap="20px" columnRule="1px" />}
                <TextContent />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
