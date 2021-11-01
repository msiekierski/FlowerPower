import { FlowerShop, OpeningHours } from '../../common/types';
import apiFlowerShopProductToState from './apiFlowerShopProductToState';
import apiReviewToState from './apiReviewToState';

export default function apiShopPageToState(object: any) {
  const { openingHours } = object;
  const result: FlowerShop = {
    name: object.shopName,
    street: object.address,
    city: object.city + ' ' + object.zip,
    phone: object.phone,
    hasDelivery: object.hasShipment,
    reviews: object.comments.map((comment: any) => apiReviewToState(comment)),
    products: object.products.map((product: any) =>
      apiFlowerShopProductToState(product)
    ),
    openingHours: [
      mapDate(openingHours.sunday),
      mapDate(openingHours.monday),
      mapDate(openingHours.tuesday),
      mapDate(openingHours.wednesday),
      mapDate(openingHours.thursday),
      mapDate(openingHours.friday),
      mapDate(openingHours.saturday),
    ],
  };
  return result;
}

const mapDate = (str: string | null) => {
  if (str == null) {
    return str;
  }
  const result: OpeningHours = {
    from: str.split('-')[0].trim(),
    to: str.split('-')[1].trim(),
  };
  return result;
};
