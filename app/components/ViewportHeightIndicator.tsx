import { css } from 'hono/css';
import { HeightBar } from '../islands/HeightBar';

// 各単位の定義
const heightUnits = [
  {
    name: 'vh',
    height: '100vh',
    color: '#4169e1',
  },
  {
    name: 'svh',
    height: '100svh',
    color: '#22c55e',
  },
  {
    name: 'lvh',
    height: '100lvh',
    color: '#a855f7',
  },
  {
    name: 'dvh',
    height: '100dvh',
    color: '#f97316',
  },
] as const;

const containerClass = css`
  position: absolute;
  left: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  pointer-events: none;
  writing-mode: horizontal-tb;
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
          height={unit.height}
          color={unit.color}
        />
      ))}
    </div>
  );
}
