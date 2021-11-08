import { ComparisonItem } from '../../common/types';

export default function apiProductCompToState(object: any) {
  const result: ComparisonItem = {
    shopName: object.shopName,
    shopImageUrl: object.shopImage,
    reviewCount: object.commentsCount,
    rating: object.rating,
    itemImageUrl: object.productImage,
    price: object.price,
    productName: object.productName,
    shopAddress: object.address,
  };
  return result;
}
