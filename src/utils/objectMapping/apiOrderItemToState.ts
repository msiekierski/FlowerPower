import { OrderItem } from '../../common/types';

export const apiOrderItemToState = (obj: any) => {
  const result: OrderItem = {
    itemImageUrl: obj.image,
    name: obj.name,
    color: obj.color,
    price: obj.unitPrice,
    priceDiscount: obj.unitPriceDiscount,
    quantity: obj.quantity,
    lineTotal: obj.lineTotal,
  };
  return result;
};
