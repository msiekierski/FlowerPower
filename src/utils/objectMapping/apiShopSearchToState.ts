import { ShopSearch } from '../../common/types';

export default function apiShopSearchToState(obj: any) {
  const result: ShopSearch = {
    name: obj.shopName,
    address: obj.address,
  };
  return result;
}
