import { css } from 'hono/css';
import { useEffect, useRef, useState } from 'hono/jsx';

/**
 * hex形式の色をrgba()に変換する
 * @param hex - #RRGGBB形式の色コード
 * @param alpha - 透明度 (0.0 - 1.0)
 * @returns rgba()文字列
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const barClass = css`
  width: 48px;
  position: relative;
  border: 2px solid;
  box-sizing: border-box;
  pointer-events: auto;
`;

export const headerClass = css`
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

export const footerClass = css`
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  font-size: 10px;
  text-align: center;
  writing-mode: horizontal-tb;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px;
  border-radius: 2px;
  color: #252525;
  line-height: 1.2;
`;

/**
 * HeightBar - 高さを視覚化するバーコンポーネント
 *
 * 指定された高さのバーを表示し、hover時に色の透明度を変更する
 * ResizeObserverで実際の高さを測定し、ラベルに表示する
 */
export function HeightBar({ name, height, color }: { name: string; height: string; color: string }) {
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
      <div class={headerClass}>
        <p>{name}</p>
        <p>{actualHeight}</p>
      </div>
      <div class={footerClass}>
        <p>{name}</p>
        <p>{actualHeight}</p>
      </div>
    </div>
  );
}
