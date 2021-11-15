import { SearchResultItem } from '../../common/types';

export default function apiSearchPhraseProductToState(obj: any) {
  const result: SearchResultItem = {
    name: obj.name,
    itemId: obj.productId,
    minPrice: obj.price,
    imageUrl: obj.image,
    color: obj.color,
    maxPrice: obj.maxPrice,
    category: obj.category,
    subcategory: obj.subCategory,
    size: obj.sizes,
  };
  return result;
}
