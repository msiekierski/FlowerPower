import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { categories } from '../../utils/constants/Categories';

const useStyles = makeStyles((theme) => ({
  categories: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '1.5%',
  },
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    categories: {
      display: 'none',
    },
  },
}));

const Menu = () => {
  const classes = useStyles();
  return (
    <div className={classes.categories}>
      {categories.map((category, index) => {
        return (
          <Typography key={index} variant="h5" style={{ fontWeight: 'bold' }}>
            {category}
          </Typography>
        );
      })}
    </div>
  );
};

export default Menu;
