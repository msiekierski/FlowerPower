import { Typography, makeStyles, Divider } from '@material-ui/core';
import React from 'react';
import { settingsMenu } from '../../../utils/constants/SettingsMenus';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/user';
import { AiFillCaretDown } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: '5px 5px',
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    cursor: 'pointer',
  },
  desktopIcon: {
    display: 'block',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: 'none',
    },
  },
  mobileIcon: {
    display: 'none',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: 'block',
    },
  },
  divider: {
    display: 'none',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      display: 'block',
      marginTop: '10px',
    },
  },
}));

type Props = {
  setChosenPage: Function;
  chosenPage: number;
};

const SettingsMenu: React.FC<Props> = ({ setChosenPage, chosenPage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { logOutUser } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      {settingsMenu.map((settings, index) => {
        const isChosen = index === chosenPage;
        return (
          <Link to={`/settings/${settings.name}`} replace={true} key={index}>
            <div
              className={classes.menuItem}
              onClick={() => setChosenPage(index)}
            >
              <Typography
                style={{
                  fontWeight: `${isChosen ? 'bold' : 'inherit'}`,
                }}
                variant="h6"
                key={index}
              >
                {settings.name}
              </Typography>
              {isChosen && (
                <>
                  <AiFillCaretRight className={classes.desktopIcon} />
                  <AiFillCaretDown className={classes.mobileIcon} />
                </>
              )}
            </div>
          </Link>
        );
      })}
      <Typography
        style={{
          color: 'red',
        }}
        variant="h6"
        className={classes.menuItem}
        onClick={() => logOutUser()}
      >
        Log Out
      </Typography>
      <Divider
        className={classes.divider}
        orientation="horizontal"
        variant="fullWidth"
      />
    </>
  );
};

export default SettingsMenu;
