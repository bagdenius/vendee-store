import { getProducts } from '../services/product';
import ProductCard from './ProductCard';

export default async function ProductList() {
  const { data: products, error } = await getProducts();

  //   console.log(products);

  //   await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <div className='grid grid-cols-5 gap-4 p-4 min-h-screen bg-muted/50 rounded-xl md:min-h-min'>
      {products?.map((product, i) => (
        // to ProductCard.tsx
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
}
