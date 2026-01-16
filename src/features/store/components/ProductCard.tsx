import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/Carousel';
import { Rating, RatingButton } from '@/shared/components/ui/Rating';
import { getRandomNumber } from '@/shared/lib/utils/getRandomNumber';

import type { Product } from '../models/product';

type ProductCardProps = {
  product: Product;
};

export default async function ProductCard({ product }: ProductCardProps) {
  const testRating = getRandomNumber(3, 5);
  const testRatingCount = getRandomNumber(50, 500);

  return (
    <Card className='pt-0 h-140 bg-muted/69 hover:ring-2 group hover:ring-accent transition-shadow'>
      <Carousel>
        <CarouselContent className='ml-0'>
          {product.images.map((image, i) => (
            <CarouselItem key={image.id} className='p-0'>
              <Link
                href={`store/product/${product.slug}`}
                className='block relative aspect-square'
              >
                <Image
                  fill
                  src={image.url}
                  alt={`${product.title} image ${i + 1}`}
                  // if image isn't square aspect ratio
                  className='object-contain'
                  sizes='90vw,
                        (min-width: 40rem) 45vw,
                        (min-width: 48rem) 42vw,
                        (min-width: 64rem) 30vw,
                        (min-width: 80rem) 22vw,
                        (min-width: 96rem) 18vw'
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className='group-hover:left-1'
          variant='secondary'
          size='icon-lg'
        />
        <CarouselNext
          className='group-hover:right-1'
          variant='secondary'
          size='icon-lg'
        />
      </Carousel>
      <CardHeader className='-mt-4'>
        <CardTitle className='text-xl hover:underline underline-offset-2 transition-all'>
          <Link
            href={`store/product/${product.slug}`}
            className='inline-flex group-hover:scale-x-105 hover:underline transition-all origin-left'
          >
            <span>{product.title}</span>
            <span className='opacity-0 -translate-x-5 transition-transform duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0'>
              &nbsp;{'->'}
            </span>
          </Link>
        </CardTitle>
        <Rating value={testRating} readOnly className='flex items-center'>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={13} />
          ))}
          <Link
            href='#'
            className='ml-1 hover:underline hover:underline-offset-2'
          >
            ({testRatingCount})
          </Link>
        </Rating>
      </CardHeader>
      <CardContent className='mb-auto'>
        <span>{product.description}</span>
      </CardContent>
      <CardFooter className='flex flex-col gap-2 items-start'>
        <span className='text-xl font-medium'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.currency,
            minimumFractionDigits: 2,
          }).format(product.price)}
        </span>
        <div className='flex w-full'>
          <Button className='grow rounded-r-none'>
            <ShoppingCart />
            <span>Add to Cart</span>
          </Button>
          <Button variant='destructive' className='-ml-0.5 rounded-l-none'>
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
