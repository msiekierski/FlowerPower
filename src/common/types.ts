export type Order = {
  orderNumber: number;
  date: Date;
  status: OrderStatus;
  orderedItems: Array<OrderItem>;
};

export enum OrderStatus {
  PLACED = 'PLACED',
  PAID = 'PAID',
  IN_PROGRESS = 'IN PROGRESS',
  READY_TO_SEND = 'READY TO SEND',
  READY_TO_PICK_UP = 'READY TO PICK UP',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
}

export type OrderItem = {
  itemImageUrl: string;
  name: string;
  color: FlowerColor;
  quantity: number;
  price: number;
};

export enum FlowerColor {
  RED = 'RED',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  WHITE = 'WHITE',
}

export type CartProduct = {
  productId: string;
  productImageUrl: string;
  itemDescription: string;
  storeName: string;
  itemPrice: number;
  quantity: number;
};

export type CartTotals = {
  total: number;
  amount: number;
};

export type Review = {
  author: string;
  text: string;
  rating: number;
  date: string;
};

export enum ProductCategory {
  FLOWER = 'Flowers',
  BUNCH = 'Bunch',
  FLOWERS_IN_VASE = 'Flowers in vase',
  FLOWERS_IN_BOX = 'Flowers in box',
  POT = 'Pot',
  SEED = 'Seed',
  CARD = 'Card',
  ORNAMENT = 'Ornament',
}

export type FlowerShopProduct = {
  imageUrl: string;
  productId: string;
  price: number;
  description: string;
  category: ProductCategory;
};

export type FlowerShop = {
  name: string;
  street: string;
  city: string;
  phone: string;
  hasDelivery: boolean;
  reviews: Array<Review>;
  products: Array<FlowerShopProduct>;
};

export type OpeningHours = {
  from: string;
  to: string;
};

export type ProductSearch = {
  name: string;
  category: string;
  subcategory: string;
  id: string;
};

export type ShopSearch = {
  name: string;
  address: string;
  id: string;
};
