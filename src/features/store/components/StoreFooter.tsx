import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function StoreFooter() {
  return (
    <div className='flex justify-center items-center pt-30 pb-15 text-xs text-muted-foreground'>
      made with&nbsp;
      <Heart size={14} />
      &nbsp;by&nbsp;
      <Link href='https://t.me/bagdenius'>@bagdenius</Link>
    </div>
  );
}
