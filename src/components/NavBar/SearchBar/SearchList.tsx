import { makeStyles, MenuList, Paper, Popper } from '@material-ui/core';
import { Divider, ListItem, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ApiCallState, ProductSearch, ShopSearch } from '../../../common/types';
import { BsArrowRight } from 'react-icons/bs';
import { BsFlower1 } from 'react-icons/bs';
import { AiTwotoneShop } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { stringToUrl } from '../../../utils/functions/stringToUrlValue';
import axios from 'axios';
import apiProductSearchToState from '../../../utils/objectMapping/apiProductSearchToState';
import apiShopSearchToState from '../../../utils/objectMapping/apiShopSearchToState';

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

const getApiUrl = (name: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/search/${name}`;

const SearchList: React.FC<Props> = ({ inputText, searchRef, isFocused }) => {
  const [data, setData] = useState<ListData>(initData);
  const [isListHovered, setIsListHovered] = useState<boolean>(false);
  const [width, setWidth] = useState(0);
  const [apiState, setApiState] = useState<ApiCallState>(ApiCallState.IDLE);

  const inputTextRef = useRef(inputText);

  const classes = useStyles({ width })();

  useEffect(() => {
    if (searchRef) {
      setWidth(searchRef!.offsetWidth);
    }
  }, [isFocused]);

  useEffect(() => {
    inputTextRef.current = inputText;
    if (inputText.length > 0) {
      fetchData(inputText);
    } else {
      setData({ products: [], shops: [] });
    }
  }, [inputText]);

  const fetchData = async (text: string) => {
    try {
      setApiState(ApiCallState.FETCH_BEGIN);
      const { data } = await axios.get(getApiUrl(text), {
        params: { city: 'Wroclaw' },
      });
      if (text === inputTextRef.current) {
        setData({
          products: data.products.map((obj: any) =>
            apiProductSearchToState(obj)
          ),
          shops: data.shops.map((obj: any) => apiShopSearchToState(obj)),
        });
        setApiState(ApiCallState.FETCH_SUCCESS);
      }
    } catch (e) {
      setData({
        products: [],
        shops: [],
      });
      setApiState(ApiCallState.FETCH_ERROR);
    }
  };

  return (
    <Popper
      open={
        isListHovered ||
        (isFocused && (data.shops.length > 0 || data.products.length > 0))
      }
      placement="bottom"
      className={classes.popper}
      anchorEl={searchRef}
      onMouseEnter={() => setIsListHovered(true)}
      onMouseLeave={() => setIsListHovered(false)}
    >
      <Paper>
        <MenuList>
          {data.products.map((product, index) => (
            <ListItem onClick={() => setIsListHovered(false)} key={index}>
              <Link to={`/search/item/${product.name}}`}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <BsFlower1 style={{ marginRight: '5px' }} />
                  <Typography noWrap>{product.name}&nbsp;</Typography>
                  <Typography style={{ color: '#c3c3c3' }}>
                    in category {product.category}&nbsp;
                  </Typography>
                  <BsArrowRight style={{ color: '#c3c3c3' }} />
                  <Typography style={{ color: '#c3c3c3' }}>
                    &nbsp;{product.subcategory}
                  </Typography>
                </span>
              </Link>
            </ListItem>
          ))}
          {data.products.length > 0 && data.shops.length > 0 && <Divider />}
          {data.shops.map((shop, index) => (
            <ListItem onClick={() => setIsListHovered(false)} key={index}>
              <Link
                to={`/store/${stringToUrl(shop.name)}/${stringToUrl(
                  shop.address
                )}`}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <AiTwotoneShop style={{ marginRight: '5px' }} />
                  <Typography>{shop.name}&nbsp;</Typography>
                  <Typography style={{ color: '#c3c3c3' }}>
                    ({shop.address})
                  </Typography>
                </span>
              </Link>
            </ListItem>
          ))}
        </MenuList>
      </Paper>
    </Popper>
  );
};

export default SearchList;
