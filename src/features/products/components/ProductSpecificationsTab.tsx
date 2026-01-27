import { Card, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { TabsContent } from '@/shared/components/ui/Tabs';
import { Product } from '@/shared/dal/entities';

type ProductSpecificationsTabProps = {
  product: Product;
};

export default async function ProductSpecificationsTab({
  product,
}: ProductSpecificationsTabProps) {
  return (
    <TabsContent value='specifications'>
      <Card>
        <CardHeader>
          <CardTitle>{product.title} specifications</CardTitle>
        </CardHeader>
      </Card>
    </TabsContent>
  );
}
