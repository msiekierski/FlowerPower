import { Review } from '../../common/types';

export default function apiReviewToState(object: any) {
  const result: Review = {
    author: object.fullName,
    text: object.description,
    rating: object.rate,
    date: object.dateOfAdding,
  };
  return result;
}
