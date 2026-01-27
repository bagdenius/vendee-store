import { Card, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { TabsContent } from '@/shared/components/ui/Tabs';
import { Product } from '@/shared/dal/entities';

type ProductReviewsTabProps = {
  product: Product;
};

export default async function ProductReviewsTab({
  product,
}: ProductReviewsTabProps) {
  return (
    <TabsContent value='reviews'>
      <Card>
        <CardHeader>
          <CardTitle>{product.title} reviews</CardTitle>
        </CardHeader>
      </Card>
    </TabsContent>
  );
}
