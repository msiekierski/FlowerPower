import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';

export const useAuth = () => {
  const state = useSelector((state: RootState) => state.user);
  return state.user ? true : false;
};
