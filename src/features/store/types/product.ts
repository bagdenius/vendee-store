import { Database } from '@/shared/types/database.types';

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductImage =
  Database['public']['Tables']['product_images']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
