import { FormControlLabel, Typography, makeStyles } from '@material-ui/core';
import { Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { RootState } from '../../../redux/root-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux/searchResult';
import { BiPlus } from 'react-icons/bi';

type Props = {
  name: string;
  subcategories: Array<string>;
};

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const CategoryFilters: React.FC<Props> = ({ name, subcategories }) => {
  const { fetchData, filters } = useSelector(
    (state: RootState) => state.search
  );
  const { products } = fetchData;
  const { categoryFilters } = filters;

  const dispatch = useDispatch();
  const { changeCategoryFilter } = bindActionCreators(actionCreators, dispatch);

  const isCategoryChecked = (category: string) => {
    const subcategoriesValues = Object.values(categoryFilters[category]);
    if (subcategoriesValues.findIndex((value: any) => value === true) >= 0) {
      return true;
    }
    return false;
  };
  const classes = useStyles();

  return (
    <div>
      <FormControlLabel
        label={`${name}(${
          products.filter((item) => item.category === name).length
        })`}
        control={
          <Checkbox
            checked={isCategoryChecked(name)}
            onClick={() => {
              const newSubcategoriesValue = isCategoryChecked(name)
                ? false
                : true;
              Object.keys(categoryFilters[name]).forEach((subcategory) => {
                changeCategoryFilter(name, subcategory, newSubcategoriesValue);
              });
            }}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {subcategories.map((subcategory, index) => (
          <FormControlLabel
            key={index}
            label={`${subcategory}(${
              products.filter((item) => item.subcategory === subcategory).length
            })`}
            control={
              <Checkbox
                onChange={() =>
                  changeCategoryFilter(
                    name,
                    subcategory,
                    !categoryFilters[name][subcategory]
                  )
                }
                checked={categoryFilters[name][subcategory]}
              />
            }
          />
        ))}
      </Box>
    </div>
  );
};

export default CategoryFilters;
