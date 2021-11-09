import { ProductSearch } from '../../common/types';

export default function apiProductSearchToState(obj: any) {
  const result: ProductSearch = {
    name: obj.name,
    category: obj.category,
    subcategory: obj.subCategory,
    id: obj.productId,
  };
  return result;
}
