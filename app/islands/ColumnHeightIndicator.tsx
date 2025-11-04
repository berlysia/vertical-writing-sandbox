import { useEffect, useRef, useState } from "hono/jsx";

export function ColumnHeightIndicator({ columnSize, columnGap, columnRule }: { columnSize: string; columnGap: string; columnRule: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [actualHeight, setActualHeight] = useState<string>("0px");

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = Math.round(entry.contentRect.height);
        setActualHeight(`${height}px`);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // repeating-linear-gradientで繰り返しパターンを生成
  // 縦書きマルチカラムでは、カラムは上から下に並ぶため、
  // グラデーションも縦方向（to bottom）に進める
  return (
    <>
      <div
        style={{
          position: 'absolute',
          insetBlockStart: "20px",
          inlineSize: '100%',
          blockSize: '2px',
          pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            blue 0,
            blue ${columnSize},
            #fd2 ${columnSize},
            #fd2 calc(${columnSize} + ${columnGap} + ${columnRule} )
          )`,
        }} />
      <div ref={ref} style={{
        position: 'relative', // in-flowでなければいけない
        inlineSize: 'auto',
        blockSize: '0px', // 横方向の太さ
        pointerEvents: 'none',  
      }} />
      <div
        style={{
          position: 'absolute',
          insetBlockStart: "40px",
          inlineSize: '100%',
          blockSize: '2px',
          pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            magenta 0,
            magenta ${actualHeight},
            #fd2 ${actualHeight},
            #fd2 calc(${actualHeight} + ${columnGap} + ${columnRule} )
          )`,
        }} />
    </>
  );
}
