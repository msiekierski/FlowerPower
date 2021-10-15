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
  productImageUrl: string;
  itemDescription: string;
  storeName: string;
  itemPrice: number;
  quantity: number;
};
