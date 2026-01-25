import { Card, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { TabsContent } from '@/shared/components/ui/Tabs';
import { Product } from '@/shared/dal/entities';

type ProductDescriptionTabProps = {
  product: Product;
};

export default function ProductDescriptionTab({
  product,
}: ProductDescriptionTabProps) {
  return (
    <TabsContent value='description'>
      <Card>
        <CardHeader>
          <CardTitle>{product.title} description</CardTitle>
        </CardHeader>
      </Card>
    </TabsContent>
  );
}
