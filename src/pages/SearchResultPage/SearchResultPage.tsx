import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { SearchResultItem } from '../../common/types';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import SearchResultProduct from '../../components/SearchResultProduct/SearchResultProduct';
import useQuery from '../../utils/customHooks/useQuery';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  filters: {
    flex: '1 1 30%',
  },
  searchResult: {
    flex: '1 1 70%',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
    columnGap: '10px',
  },
  shops: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
}));

const itemResult: Array<SearchResultItem> = [
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
  {
    name: 'Red rose',
    itemId: '3213213',
    minPrice: 3.49,
    imageUrl:
      'https://www.florca.com/downloads/layoutentitylinkvalue/337/8d6884dc9a6f4a1/Red%20eagle.jpg',
  },
];

const storeResult: Array<FlowerShopPreviewCardProps> = [
  {
    name: 'Flower Talk',
    address: 'Poroninska 8',
    zipCode: '50-001',
    city: 'Wroclaw',
    rating: 4.5,
    reviewCount: 100,
    imagePath:
      'https://lh3.googleusercontent.com/proxy/rQlsBovpItMQQDpq9SdAvKgwDVj3S-GVk6Jk0FxcqRi5BLY-TXp2WxMX-HPS1dRpPMpPfI4lneV52Ncu9TuQdaAQ4vpXz9sq6Oe4lfQclMnRP4eveeIiH0PI',
    hasShipping: true,
  },
  {
    name: 'Super Sklerp 123',
    address: 'Rynek 15',
    zipCode: '50-001',
    city: 'Wroclaw',
    rating: 4.5,
    reviewCount: 100,
    imagePath:
      'https://lh3.googleusercontent.com/proxy/rQlsBovpItMQQDpq9SdAvKgwDVj3S-GVk6Jk0FxcqRi5BLY-TXp2WxMX-HPS1dRpPMpPfI4lneV52Ncu9TuQdaAQ4vpXz9sq6Oe4lfQclMnRP4eveeIiH0PI',
    hasShipping: true,
  },
  {
    name: 'Super Sklerp 123',
    address: 'Rynek 15',
    zipCode: '50-001',
    city: 'Wroclaw',
    rating: 4.5,
    reviewCount: 100,
    imagePath:
      'https://lh3.googleusercontent.com/proxy/rQlsBovpItMQQDpq9SdAvKgwDVj3S-GVk6Jk0FxcqRi5BLY-TXp2WxMX-HPS1dRpPMpPfI4lneV52Ncu9TuQdaAQ4vpXz9sq6Oe4lfQclMnRP4eveeIiH0PI',
    hasShipping: false,
  },
  {
    name: 'Super Sklerp 123',
    address: 'Rynek 15',
    zipCode: '50-001',
    city: 'Wroclaw',
    rating: 4.5,
    reviewCount: 100,
    imagePath:
      'https://lh3.googleusercontent.com/proxy/rQlsBovpItMQQDpq9SdAvKgwDVj3S-GVk6Jk0FxcqRi5BLY-TXp2WxMX-HPS1dRpPMpPfI4lneV52Ncu9TuQdaAQ4vpXz9sq6Oe4lfQclMnRP4eveeIiH0PI',
    hasShipping: true,
  },
];

const SearchResultPage = () => {
  let query = useQuery();
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.filters}>filters</div>

      <div className={classes.searchResult}>
        {itemResult.length > 0 && (
          <>
            <Typography variant="h4">Products</Typography>
            <div className={classes.items}>
              {itemResult.map((item) => (
                <SearchResultProduct item={item} key={item.itemId} />
              ))}
            </div>
          </>
        )}
        {storeResult.length > 0 && (
          <>
            <Typography
              variant="h4"
              style={{ marginTop: '30px', marginBottom: '10px' }}
            >
              Stores
            </Typography>
            <div className={classes.shops}>
              {storeResult.map((store, index) => (
                <FlowerShopPreviewCard
                  {...store}
                  key={index}
                  fullWidth={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
