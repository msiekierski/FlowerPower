import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ChangePassword from '../../components/Settings/Pages/ChangePassword/ChangePassword';
import EWallet from '../../components/Settings/Pages/E-Wallet/EWallet';
import OrderHIstory from '../../components/Settings/Pages/OrderHistory/OrderHIstory';
import PersonalData from '../../components/Settings/Pages/PersonalData/PersonalData';
import SettingsMenu from '../../components/Settings/SettingsMenu/SettingsMenu';
import {
  CHANGE_PASSWORD,
  E_WALLET,
  ORDER_HISTORY,
  PERSONAL_DATA,
  settingsMenu,
} from '../../utils/constants/SettingsMenus';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
  },
  menuContainer: {
    marginTop: theme.spacing(10),
  },
  contentContainer: {},
}));

const SettingsPage = () => {
  const [chosenPage, setChosenPage] = useState<number>(0);
  const classes = useStyles();

  const renderSettingsContent = () => {
    switch (settingsMenu[chosenPage].name) {
      case PERSONAL_DATA:
        return <PersonalData />;
      case ORDER_HISTORY:
        return <OrderHIstory />;
      case E_WALLET:
        return <EWallet />;
      case CHANGE_PASSWORD:
        return <ChangePassword />;
    }
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.menuContainer}>
        <SettingsMenu setChosenPage={setChosenPage} chosenPage={chosenPage} />
      </div>
      <div>
        {renderSettingsContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
