import { Divider, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchResultItem } from '../../common/types';
import CategoryFilters from './CategoryFilters/CategoryFilters';
import { RootState } from '../../redux/root-reducer';

const SearchResultFilters = () => {
  const { fetchData, filters } = useSelector(
    (state: RootState) => state.search
  );
  const { products } = fetchData;
  const { categoryFilters } = filters;

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <>
      <Typography variant="h5" align="left">
        Filters
      </Typography>
      <Divider />
      <Typography variant="h6" align="left">
        Categories
      </Typography>
      {categories.map((category, index) => (
        <CategoryFilters
          key={index}
          name={category}
          subcategories={Object.keys(categoryFilters[category])}
        />
      ))}
    </>
  );
};

export default SearchResultFilters;
