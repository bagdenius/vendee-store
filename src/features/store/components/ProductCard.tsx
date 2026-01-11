import Image from 'next/image';
import { Product } from '../types/product';
import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { getProductImages } from '../services/product';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/Card';

const testProduct = {
  id: 'cfed383a-38f6-48a1-91e4-b9fd8cc3dbb4',
  title: 'iPhone 17 Pro',
  slug: 'iphone-17-pro',
  description:
    'Heat-forged aluminum unibody design. A19 Pro chip. Pro camera system.',
  price: 1499,
  currency: 'USD',
  is_active: true,
  created_at: '2026-01-04T14:15:14.910489+00:00',
  product_images: [
    {
      id: '703442fe-d44a-44c4-ab73-4458a1869341',
      path: 'product-images/iphone-17-pro/01-main.webp',
      sort_order: 1,
    },
    {
      id: 'be2ccd3d-e573-476c-afff-572a0321d7af',
      path: 'product-images/iphone-17-pro/02-back-side.webp',
      sort_order: 2,
    },
    {
      id: '18c9895c-d0e0-4409-9b18-7182cb52d773',
      path: 'product-images/iphone-17-pro/03-camera.webp',
      sort_order: 3,
    },
    {
      id: '18c9c58f-df35-4b88-b7ab-f3a0fab0cd69',
      path: 'product-images/iphone-17-pro/04-colors.webp',
      sort_order: 4,
    },
  ],
};

export default async function ProductCard({ product }: { product: Product }) {
  const { data, error } = await getProductImages(product.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
