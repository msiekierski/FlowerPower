import {
  makeStyles,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import { Divider, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductSearch, ShopSearch } from '../../../common/types';
import { BsArrowRight } from 'react-icons/bs';
import { BsFlower1 } from 'react-icons/bs';
import { AiTwotoneShop } from 'react-icons/ai';

type ListData = {
  products: Array<ProductSearch>;
  shops: Array<ShopSearch>;
};

type Props = {
  inputText: string;
  searchRef: HTMLDivElement | null;
  isFocused: boolean;
};

const initData: ListData = {
  products: [
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
    {
      name: 'Red rose',
      category: 'Flowers',
      subcategory: 'Roses',
      id: '123213',
    },
  ],
  shops: [{ name: 'Kwiaciarnia Róża', address: 'Rynek 15', id: '123213' }],
};

const useStyles = (props: StyleProps) =>
  makeStyles((theme) => ({
    popper: {
      width: `${props.width}px`,
      zIndex: 10000,
      maxHeight: '30vh',
      border: '1px solid silver',
      overflow: 'auto',
      borderRadius: '16px',
      borderBottomRightRadius: '32px',
    },
  }));

type StyleProps = {
  width: number;
};

const SearchList: React.FC<Props> = ({ inputText, searchRef, isFocused }) => {
  const [data, setData] = useState<ListData>(initData);
  const [isListHovered, setIsListHovered] = useState<boolean>(false);
  const [width, setWidth] = useState(0);

  const classes = useStyles({ width })();

  useEffect(() => {
    if (searchRef) {
      setWidth(searchRef!.offsetWidth);
    }
  }, [isFocused]);

  return (
    <Popper
      open={isListHovered || isFocused}
      anchorEl={searchRef}
      placement="bottom"
      className={classes.popper}
      onMouseEnter={() => setIsListHovered(true)}
      onMouseLeave={() => setIsListHovered(false)}
    >
      <Paper>
        <MenuList>
          {data.products.map((product, index) => (
            <ListItem onClick={() => setIsListHovered(false)}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <BsFlower1 style={{ marginRight: '5px' }} />
                <Typography>{product.name}&nbsp;</Typography>
                <Typography style={{ color: '#c3c3c3' }}>
                  in category {product.category}&nbsp;
                </Typography>
                <BsArrowRight style={{ color: '#c3c3c3' }} />
                <Typography style={{ color: '#c3c3c3' }}>
                  &nbsp;{product.subcategory}
                </Typography>
              </span>
            </ListItem>
          ))}
          <Divider />
          {data.shops.map((shop, index) => (
            <ListItem onClick={() => setIsListHovered(false)}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <AiTwotoneShop style={{ marginRight: '5px' }} />
                <Typography>{shop.name}&nbsp;</Typography>
                <Typography style={{ color: '#c3c3c3' }}>
                  ({shop.address})
                </Typography>
              </span>
            </ListItem>
          ))}
        </MenuList>
      </Paper>
    </Popper>
  );
};

export default SearchList;
