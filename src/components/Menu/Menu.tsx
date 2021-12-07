import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/constants/Categories';

const useStyles = makeStyles((theme) => ({
  categories: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '1.5%',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.divider,
    paddingBottom: '10px',
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
      {categories.slice(0, 5).map((category, index) => {
        return (
          <Link to={`/search/?category=${category.slice(0, -1).toLowerCase()}`}>
            <Typography key={index} variant="h5" style={{ fontWeight: 'bold' }}>
              {category}
            </Typography>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
