import { Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchResultItem } from '../../common/types';
import CategoryFilters from './CategoryFilters/CategoryFilters';
import { RootState } from '../../redux/root-reducer';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { Collapse } from '@mui/material';
import ColorFilters from './ColorFilters/ColorFilters';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  content: {},
  colors: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '40px',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));
const SearchResultFilters = () => {
  const { fetchData, filters } = useSelector(
    (state: RootState) => state.search
  );
  const { products } = fetchData;
  const { categoryFilters } = filters;
  const [areCategoriesShown, setAreCategoriesShown] = useState(true);
  const [areColorsShown, setAreColorsShown] = useState(true);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const colors = Array.from(new Set(products.map((product) => product.color!)));
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" align="left">
        Filters
      </Typography>
      <Divider />
      <div className={classes.content}>
        <div
          className={classes.header}
          onClick={() => setAreCategoriesShown(!areCategoriesShown)}
        >
          <Typography variant="h6" align="left">
            Categories
          </Typography>
          {areCategoriesShown ? <BiMinus /> : <BiPlus />}
        </div>
        <Collapse in={areCategoriesShown}>
          {categories.map((category, index) => (
            <CategoryFilters
              key={index}
              name={category}
              subcategories={Object.keys(categoryFilters[category])}
            />
          ))}
        </Collapse>
        <Divider />
        <div
          className={classes.header}
          onClick={() => setAreColorsShown(!areColorsShown)}
        >
          <Typography variant="h6" align="left">
            Colors
          </Typography>
          {areColorsShown ? <BiMinus /> : <BiPlus />}
        </div>
        <Collapse in={areColorsShown}>
          <div className={classes.colors}>
            {colors.map((color, index) => (
              <ColorFilters color={color} />
            ))}
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default SearchResultFilters;
