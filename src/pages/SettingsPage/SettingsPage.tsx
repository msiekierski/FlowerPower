import { makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ChangePassword from '../../components/Settings/Pages/ChangePassword/ChangePassword';
import EWallet from '../../components/Settings/Pages/E-Wallet/EWallet';
import OrderHistory from '../../components/Settings/Pages/OrderHistory/OrderHistory';
import PersonalData from '../../components/Settings/Pages/PersonalData/PersonalData';
import SettingsMenu from '../../components/Settings/SettingsMenu/SettingsMenu';
import {
  CHANGE_PASSWORD,
  E_WALLET,
  ORDER_HISTORY,
  PERSONAL_DATA,
  settingsMenu,
} from '../../utils/constants/SettingsMenus';
import ErrorPage from '../ErrorPage/ErrorPage';
import { IoIosReturnLeft } from 'react-icons/io';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    columnGap: '7%',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: 'column',
    },
  },
  menuContainer: {
    width: '300px',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      marginTop: theme.spacing(3),
    },
  },
  contentContainer: {
    width: '100%',
    marginTop: theme.spacing(6),
  },
  settingsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
  },
  title: {
    fontWeight: 'bold',
  },
  iconItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    cursor: 'pointer',
  },
  iconLabel: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
}));

type SettingsPageParams = {
  option: string;
};

const SettingsPage = () => {
  const { option } = useParams<SettingsPageParams>();
  const [chosenPage, setChosenPage] = useState<number>(
    settingsMenu.findIndex((menu) => menu.name === option)
  );
  const classes = useStyles();
  const history = useHistory();

  const renderSettingsContent = () => {
    switch (settingsMenu[chosenPage].name) {
      case PERSONAL_DATA:
        return <PersonalData />;
      case ORDER_HISTORY:
        return <OrderHistory />;
      case E_WALLET:
        return <EWallet />;
      case CHANGE_PASSWORD:
        return <ChangePassword />;
    }
  };

  useEffect(() => {
    setChosenPage(settingsMenu.findIndex((menu) => menu.name === option));
  }, [history.location.pathname]);

  if (chosenPage < 0) {
    return <ErrorPage />;
  }

  const moveBackFromSettings = () => {
    history.goBack();
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.menuContainer}>
        <SettingsMenu setChosenPage={setChosenPage} chosenPage={chosenPage} />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.settingsHeader}>
          <Typography className={classes.title} variant="h4" align="center">
            {settingsMenu[chosenPage].name}
          </Typography>
          <div
            className={classes.iconItem}
            onClick={() => moveBackFromSettings()}
          >
            <IoIosReturnLeft style={{ fontSize: '2rem' }} />
            <Typography className={classes.iconLabel}>RETURN</Typography>
          </div>
        </div>
        {renderSettingsContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
