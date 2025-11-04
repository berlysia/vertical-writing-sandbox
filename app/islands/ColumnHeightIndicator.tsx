import { css } from 'hono/css';
import { useEffect, useRef, useState } from 'hono/jsx';
import { HeightBar } from './HeightBar';

const indicatorClass = css`
  position: absolute;
  inline-size: 100%;
  block-size: 2px;
  pointer-events: none;
`;

const measurementTargetClass = css`
  position: relative;
  inline-size: auto;
  block-size: 0px;
  pointer-events: none;
`;

/**
 * ColumnHeightIndicator - カラムサイズを視覚的に表示
 *
 * HeightBarで代表的なカラムサイズ（設定値・実測値）を表示し、
 * repeating-linear-gradientで複数カラムが繰り返し並ぶ様子を視覚化する
 */
export function ColumnHeightIndicator({
  columnSize,
  columnGap,
  columnRule
}: {
  columnSize: string;
  columnGap: string;
  columnRule: string;
}) {
  const measurementRef = useRef<HTMLDivElement>(null);
  const [actualHeight, setActualHeight] = useState<string>('0px');

  useEffect(() => {
    if (!measurementRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = Math.round(entry.contentRect.height);
        setActualHeight(`${height}px`);
      }
    });

    resizeObserver.observe(measurementRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* 測定用要素 */}
      <div ref={measurementRef} class={measurementTargetClass} />

      {/* 設定値ベースのrepeating-linear-gradientパターン */}
      <div
        class={indicatorClass}
        style={{
          insetBlockStart: '10px',
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            blue 0,
            blue ${columnSize},
            #fd2 ${columnSize},
            #fd2 calc(${columnSize} + ${columnGap} + ${columnRule})
          )`,
        }}
      >
        <HeightBar
          name="column-width ideal"
          height={columnSize}
          color="#4169e1"
        />
      </div>


      {/* 実測値ベースのrepeating-linear-gradientパターン */}
      <div
        class={indicatorClass}
        style={{
          insetBlockStart: '60px',
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            magenta 0,
            magenta ${actualHeight},
            #fd2 ${actualHeight},
            #fd2 calc(${actualHeight} + ${columnGap} + ${columnRule})
          )`,
        }}
      >
        <HeightBar
          name="column-width measured"
          height={actualHeight}
          color="#ef4444"
        />
      </div>

      
    </>
  );
}
