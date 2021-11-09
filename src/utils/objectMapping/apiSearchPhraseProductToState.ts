import { SearchResultItem } from '../../common/types';

export default function apiSearchPhraseProductToState(obj: any) {
  const result: SearchResultItem = {
    name: obj.name,
    itemId: obj.productId,
    minPrice: obj.price,
    imageUrl: obj.image,
  };
  return result;
}
