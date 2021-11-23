import { useSelector } from 'react-redux';
import { Roles } from '../../common/types';
import { RootState } from '../../redux/root-reducer';

export const useAuth = () => {
  const state = useSelector((state: RootState) => state.user);
  if (state.user) {
    return (
      state.user.role!.slice(0, 1).toUpperCase() + state.user.role!.slice(1)
    );
  }
  return Roles.NONE;
};
