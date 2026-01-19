'use client';

import { useEffect, useState } from 'react';

export default function DebugViewportSizeLabel() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='fixed top-0 right-0 bg-black text-white z-10000'>{`${width}x${height}`}</div>
  );
}
