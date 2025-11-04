import { css } from 'hono/css';
import { useEffect, useRef, useState } from 'hono/jsx';

// 各単位の定義
const heightUnits = [
  {
    name: 'vh',
    description: 'Viewport Height',
    height: '100vh',
    color: '#4169e1', // 青
  },
  {
    name: 'svh',
    description: 'Small Viewport Height',
    height: '100svh',
    color: '#22c55e', // 緑
  },
  {
    name: 'lvh',
    description: 'Large Viewport Height',
    height: '100lvh',
    color: '#a855f7', // 紫
  },
  {
    name: 'dvh',
    description: 'Dynamic Viewport Height',
    height: '100dvh',
    color: '#f97316', // オレンジ
  },
  {
    name: 'Safe Area',
    description: 'vh - safe-area',
    height: 'calc(100vh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
    color: '#ef4444', // 赤
  },
] as const;

/**
 * hex形式の色をrgba()に変換する
 * @param hex - #RRGGBB形式の色コード
 * @param alpha - 透明度 (0.0 - 1.0)
 * @returns rgba()文字列
 */
function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const containerClass = css`
  position: absolute;
  left: 60px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  pointer-events: none;
  writing-mode: horizontal-tb;
`;

const barClass = css`
  width: 40px;
  position: relative;
  border: 2px solid;
  box-sizing: border-box;
  pointer-events: auto;
`;

const labelClass = css`
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  writing-mode: horizontal-tb;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px;
  border-radius: 2px;
  color: #252525;
  line-height: 1.2;
`;

const descriptionClass = css`
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  font-size: 8px;
  text-align: center;
  writing-mode: horizontal-tb;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px;
  border-radius: 2px;
  color: #252525;
  line-height: 1.2;
  white-space: pre-wrap;
  word-break: break-word;
`;

/**
 * ViewportHeightIndicator - 各種ビューポート高さ単位を視覚的に表示
 *
 * 異なる高さ単位（vh, svh, lvh, dvh, セーフエリア考慮）を縦バーで表示し、
 * モバイルブラウザでのビューポート挙動の違いを視覚化する
 */
export function ViewportHeightIndicator() {
  return (
    <div class={containerClass}>
      {heightUnits.map((unit) => (
        <HeightBar
          key={unit.name}
          name={unit.name}
          description={unit.description}
          height={unit.height}
          color={unit.color}
        />
      ))}
    </div>
  );
}

function HeightBar({ name, description, height, color }: { name: string; description: string; height: string; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [actualHeight, setActualHeight] = useState(height);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!barRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = Math.round(entry.contentRect.height);
        setActualHeight(`${height}px`);
      }
    });

    resizeObserver.observe(barRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // hover状態に応じて透明度を変更
  const alpha = isHovered ? 0.6 : 0.3;
  const bgColor = hexToRgba(color, alpha);
  const borderColor = hexToRgba(color, alpha);

  return (
    <div
      ref={barRef}
      class={barClass}
      style={{ height, borderColor, backgroundColor: bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div class={labelClass}>
        <p>{name}</p>
        <p>{actualHeight}</p>
      </div>
      <div class={descriptionClass}>
        <p>{description}</p>
        <p>{actualHeight}</p>
      </div>
    </div>
  );
}
