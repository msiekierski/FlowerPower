import moment from 'moment';
import { Order, OrderStatus } from '../../common/types';
import { apiOrderItemToState } from './apiOrderItemToState';

export const apiOrderHistoryToState = (obj: any) => {
  const result: Order = {
    orderNumber: obj.orderId,
    date: moment(obj.orderDate, 'YYYY-MM-DD').toDate(),
    status: obj.orderStatus,
    orderedItems: obj.productsInfos.map((prod: any) =>
      apiOrderItemToState(prod)
    ),
  };
  return result;
};
