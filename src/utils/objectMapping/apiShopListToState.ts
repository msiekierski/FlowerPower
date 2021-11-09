import { FlowerShopPreviewCardProps } from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';

export default function apiShopListToState(object: any) {
  const result: FlowerShopPreviewCardProps = {
    name: object.shopName,
    address: object.address,
    zipCode: object.postalCode,
    city: object.city,
    imagePath: object.image1,
    rating: object.rating,
    hasShipping: object.hasShipment,
    reviewCount: object.commentCount,
  };
  return result;
}
