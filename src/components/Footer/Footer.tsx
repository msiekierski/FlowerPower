import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#797979',
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 0,
    right: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>FlowerPower: Any flower You need at any place</Typography>
        <Typography>
          &copy; Copyright{new Date().getFullYear()}, FlowerPower
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
