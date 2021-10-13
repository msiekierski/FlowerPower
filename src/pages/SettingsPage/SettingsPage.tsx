import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useParams } from 'react-router';
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

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    columnGap: '7%',
  },
  menuContainer: {
    width: '300px',
    marginTop: theme.spacing(10),
  },
  contentContainer: {
    width: '100%',
    marginTop: theme.spacing(6),
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

  if (chosenPage < 0) {
    return <ErrorPage />;
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.menuContainer}>
        <SettingsMenu setChosenPage={setChosenPage} chosenPage={chosenPage} />
      </div>
      <div className={classes.contentContainer}>{renderSettingsContent()}</div>
    </div>
  );
};

export default SettingsPage;
