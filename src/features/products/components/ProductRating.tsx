import Link from 'next/link';

import { Rating, RatingButton } from '@/shared/components/ui/Rating';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { getRandomNumber } from '@/shared/lib/utils/getRandomNumber';
import { wait } from '@/shared/lib/utils/wait';

export async function ProductRating() {
  await wait(1000);
  return (
    <Rating value={getRandomNumber(3, 5)} readOnly>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton key={index} size={13} />
      ))}
      <span>(</span>
      <Link href='#' className='hover:underline underline-offset-2'>
        {getRandomNumber(50, 500)}
      </Link>
      <span>)</span>
    </Rating>
  );
}

export function ProductRatingSkeleton() {
  return <Skeleton className='w-35 h-5' />;
}
