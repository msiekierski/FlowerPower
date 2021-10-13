import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { settingsMenu } from '../../../utils/constants/SettingsMenus';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/user';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: '5px 5px',
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    cursor: 'pointer',
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
          <Link to={`/settings/${settings.name}`}>
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
              {isChosen && <AiFillCaretRight />}
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
    </>
  );
};

export default SettingsMenu;
