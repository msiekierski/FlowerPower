import React from 'react';
import { useParams } from 'react-router';

type PageParams = {
  itemName: string;
};



const SearchItemPage = () => {
  const { itemName } = useParams<PageParams>();
  return <div>page for {itemName}</div>;
};

export default SearchItemPage;
