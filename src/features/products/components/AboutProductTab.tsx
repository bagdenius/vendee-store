import { Heart, ScanBarcode, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card';
import { Rating, RatingButton } from '@/shared/components/ui/Rating';
import { TabsContent } from '@/shared/components/ui/Tabs';
import { Product } from '@/shared/dal/entities';
import { getRandomNumber } from '@/shared/lib/utils/getRandomNumber';
import ProductImagesCarousel from './ProductImagesCarousel';

type AboutProductTabProps = {
  product: Product;
};

export default function AboutProductTab({ product }: AboutProductTabProps) {
  return (
    <TabsContent value='about' className='grid lg:grid-cols-[3fr_4fr] gap-4'>
      <ProductImagesCarousel product={product} />
      <div className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-3xl'>{product.title}</CardTitle>
            <CardAction className='flex gap-1'>
              {product.categories.map((category) => (
                <Badge key={category.id} asChild>
                  <Link href={`/category/${category.slug}`}>
                    {category.name}
                  </Link>
                </Badge>
              ))}
            </CardAction>
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
          </CardHeader>
          <CardFooter className='@container/card-footer flex-col gap-2 items-start'>
            <span className='text-2xl font-medium'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: product.currency,
              }).format(product.price)}
            </span>
            <div className='flex gap-1'>
              <Button variant='default' size='lg'>
                <ScanBarcode />
                Buy now
              </Button>
              <Button variant='outline' size='lg'>
                <ShoppingCart />
                Add to Cart
              </Button>
              <Button variant='destructive' size='lg'>
                <Heart />
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Variants (color/version/drive/ram/etc)</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Delivery</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle>Varranty and info</CardTitle>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
