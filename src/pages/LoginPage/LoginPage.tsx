import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/user';
import LoginForm from '../../components/LoginForm/LoginForm';
import { RootState } from '../../redux/root-reducer';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: 0,
    marginTop: '5%',
    minHeight: '90vh',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { logInUser, clearLoginData } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const authState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    return () => {
      clearLoginData();
    };
  }, []);

  return (
    <div className={classes.mainContainer}>
      <LoginForm
        onLoginSubmit={async ({ email, password }) => {
          await logInUser({ email, password });
          console.log(authState.error);
        }}
        errorMsg={authState.error}
        isFetching={authState.isLoading}
      />
    </div>
  );
};

export default LoginPage;
