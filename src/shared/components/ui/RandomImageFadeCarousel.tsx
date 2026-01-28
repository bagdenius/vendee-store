'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const generateRandomId = () => Math.round(Math.random() * 100000);
const photoUrl = 'https://picsum.photos/2048/2048?grayscale&random=';
const generateRandomImageUrl = () => `${photoUrl}${generateRandomId()}`;
const fadeDuration = 10000;

export default function RandomImageFadeCarousel() {
  // return null;
  const [images, setImages] = useState(() => [
    generateRandomImageUrl(),
    generateRandomImageUrl(),
  ]);
  const [showFirst, setShowFirst] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const swap = () => setShowFirst((showFirst) => !showFirst);

  // start animation on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowFirst(false);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      swap();

      setTimeout(() => {
        const hiddenIndex = showFirst ? 0 : 1;
        const newSrc = generateRandomImageUrl();

        setImages((images) => {
          const newImages = [...images];
          newImages[hiddenIndex] = newSrc;
          return newImages;
        });
      }, fadeDuration);
    }, fadeDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showFirst]);

  return (
    <>
      <Image
        fill
        src={images[0]}
        alt='Image 1'
        draggable={false}
        className={`object-cover transition-transform ease-in-out duration-10000 ${
          showFirst ? 'scale-125' : 'scale-100'
        } dark:brightness-[0.2] dark:grayscale`}
        sizes='50vw'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA3UlEQVR4ATRPvepFcBh++nU6IwaFTAbuwGIwyB25BIOiTBIDg7twESZsBpPB4CtJKb//Of6dt97e3qeeL+L7Pk3TlOZ5TouioEmS0DiOaRAE1HVdShiGwXVdWJYFhBBwHAdBEMDzPFiWBSnLEm3b4jgOzPOMrutQVRXGcfwnaZoGWZafVRQFuq7Dtm38lIlpmrAsC6qqPtKiKEKSJBiG8eDE8zyEYYgoivC1+4R+/qZp8H6/QfCZaZqwrivqun5u3/fIsgyO44B8G5zniW3bMAwDXq/X02bfd9z3jT8AAAD//xvtTAIAAAAGSURBVAMA2HpqzXYjKr4AAAAASUVORK5CYII='
      />
      <Image
        fill
        src={images[1]}
        alt='Image 2'
        draggable={false}
        className={`object-cover transition-all ease-in-out duration-10000 ${
          showFirst ? 'opacity-0 scale-125' : 'opacity-100 scale-100'
        } dark:brightness-[0.2] dark:grayscale`}
        sizes='50vw'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA3UlEQVR4ATRPvepFcBh++nU6IwaFTAbuwGIwyB25BIOiTBIDg7twESZsBpPB4CtJKb//Of6dt97e3qeeL+L7Pk3TlOZ5TouioEmS0DiOaRAE1HVdShiGwXVdWJYFhBBwHAdBEMDzPFiWBSnLEm3b4jgOzPOMrutQVRXGcfwnaZoGWZafVRQFuq7Dtm38lIlpmrAsC6qqPtKiKEKSJBiG8eDE8zyEYYgoivC1+4R+/qZp8H6/QfCZaZqwrivqun5u3/fIsgyO44B8G5zniW3bMAwDXq/X02bfd9z3jT8AAAD//xvtTAIAAAAGSURBVAMA2HpqzXYjKr4AAAAASUVORK5CYII='
      />
    </>
  );
}
