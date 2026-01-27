'use client';

import { useEffect, useState } from 'react';

export default function DebugViewportSizeLabel() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      const vw = window.visualViewport;
      if (vw) {
        setSize({
          width: Math.round(vw.width),
          height: Math.round(vw.height),
        });
      } else {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    // Викликаємо після layout через requestAnimationFrame
    const id = requestAnimationFrame(updateSize);

    // Слухаємо всі можливі зміни viewport’а
    window.addEventListener('resize', updateSize);
    window.visualViewport?.addEventListener('resize', updateSize);
    window.visualViewport?.addEventListener('scroll', updateSize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', updateSize);
      window.visualViewport?.removeEventListener('resize', updateSize);
      window.visualViewport?.removeEventListener('scroll', updateSize);
    };
  }, []);

  return (
    <div className='fixed top-0 right-0 z-1000000 bg-primary text-primary-foreground px-2 py-1 rounded-bl-md shadow'>
      {size.width}×{size.height}
    </div>
  );
}
