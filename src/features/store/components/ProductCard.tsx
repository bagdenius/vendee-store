import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Product } from '@/shared/dal/entities';
import { getRandomNumber } from '@/shared/lib/utils/getRandomNumber';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const testRating = getRandomNumber(3, 5);
  const testRatingCount = getRandomNumber(50, 500);

  return (
    <Card className='group/product-card h-full pt-0 gap-4 hover:ring-2 hover:ring-accent transition-shadow duration-300'>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {product.images.slice(0, 3).map((image) => (
            <CarouselItem key={image.id}>
              <Link
                href={`store/product/${product.slug}`}
                className='block relative aspect-square'
              >
                <Image
                  fill
                  src={image.url}
                  alt={`${product.title} image ${image.sortOrder}`}
                  className='object-contain'
                  sizes='90vw,
                        (min-width: 40rem) 44vw,
                        (min-width: 48rem) 45vw,
                        (min-width: 64rem) 23vw,
                        (min-width: 80rem) 18vw,
                        (min-width: 96rem) 19vw'
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className='left-1 lg:-left-10 lg:group-hover/product-card:left-1'
          variant='secondary'
          size='icon-lg'
        />
        <CarouselNext
          className='right-1 lg:-right-10 group-hover/product-card:right-1'
          variant='secondary'
          size='icon-lg'
        />
      </Carousel>
      <CardHeader>
        <CardTitle className='max-w-[94%] text-2xl sm:text-xl group-hover/product-card:scale-x-105 hover:underline underline-offset-3 transition duration-300 origin-left'>
          <Link href={`store/product/${product.slug}`} className=''>
            <span className='inline line-clamp-2'>{product.title}&nbsp;</span>
            <span className='absolute inline text-nowrap opacity-0 group-hover/product-card:opacity-100 -translate-x-5 group-hover/product-card:translate-x-0 transition duration-200 delay-100'>
              {'->'}
            </span>
          </Link>
        </CardTitle>
        <CardDescription>
          <Rating value={testRating} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton key={index} size={13} />
            ))}
            <span>(</span>
            <Link href='#' className='hover:underline underline-offset-2'>
              {testRatingCount}
            </Link>
            <span>)</span>
          </Rating>
        </CardDescription>
      </CardHeader>
      <CardContent className='@container/card-content mb-auto'>
        <CardDescription className='line-clamp-3'>
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className='@container/card-footer flex-col items-start gap-2'>
        <span className='text-xl font-medium'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.currency,
          }).format(product.price)}
        </span>
        <div className='flex w-full'>
          <Button className='rounded-r-none border-r-0 grow'>
            <ShoppingCart />
            <span>Add to Cart</span>
          </Button>
          <Button variant='destructive' className='rounded-l-none border-l-0'>
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
