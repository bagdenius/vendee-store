import AboutProductTab from '@/features/products/components/AboutProductTab';
import ProductDescriptionTab from '@/features/products/components/ProductDescriptionTab';
import ProductReviewsTab from '@/features/products/components/ProductReviewsTab';
import ProductSpecificationsTab from '@/features/products/components/ProductSpecificationsTab';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import { getProduct } from '@/shared/dal/services/product/getProductBySlug';
import { createSupabaseBrowserClient } from '@/shared/lib/supabase/browser';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const supabase = createSupabaseBrowserClient();
  const { data: slugs } = await supabase.from('products').select('slug');
  return slugs || [];
}

// export async function generateMetadata({
//   params,
// }: ProductPageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const supabase = createSupabaseBrowserClient();
//   const { data: product, error } = await supabase
//     .from('products')
//     .select('title,description')
//     .eq('slug', slug)
//     .single();
//   if (error) return {};
//   return {
//     title: product.title,
//     description: product.description,
//   };
// }

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data: product, error } = await getProduct(slug);

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
