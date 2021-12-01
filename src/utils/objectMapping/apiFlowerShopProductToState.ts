import { FlowerShopProduct } from '../../common/types';

export default function apiFlowerShopProductToState(
  object: any,
  shopId: string
) {
  const result: FlowerShopProduct = {
    storeId: shopId,
    imageUrl: object.image,
    productId: object.productId,
    price: object.price,
    category: object.category,
    subcategory: object.subCategory,
    description: object.name,
    color: object.color,
    size: object.sizes,
    longDescription: object.description,
    composition: object.composition,
  };
  return result;
}
