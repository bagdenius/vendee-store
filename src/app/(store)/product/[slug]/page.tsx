import AboutProductTab from '@/features/products/components/AboutProductTab';
import ProductDescriptionTab from '@/features/products/components/ProductDescriptionTab';
import ProductReviewsTab from '@/features/products/components/ProductReviewsTab';
import ProductSpecificationsTab from '@/features/products/components/ProductSpecificationsTab';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import { getProductBySlug } from '@/shared/dal/services/product/getProductBySlug';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data: product, error } = await getProductBySlug(slug);

  if (error) return <div>No product</div>;

  return (
    <div className='p-8'>
      <Tabs defaultValue='about' className='gap-4'>
        <TabsList variant='line'>
          <TabsTrigger value='about'>About</TabsTrigger>
          <TabsTrigger value='description'>Description</TabsTrigger>
          <TabsTrigger value='specifications'>Specifications</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        </TabsList>
        <AboutProductTab product={product} />
        <ProductDescriptionTab product={product} />
        <ProductSpecificationsTab product={product} />
        <ProductReviewsTab product={product} />
      </Tabs>
    </div>
  );
}
