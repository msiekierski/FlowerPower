import { CreditCard } from '../../common/types';

export const apiCreditCardToState = (obj: any) => {
  const result: CreditCard = {
    cardNumber: obj.cardNumber,
    expiryDate: obj.expirationDate,
    cvvNumber: obj.cvv2Number,
    nameSurname: obj.cardOwner,
  };
  return result;
};
