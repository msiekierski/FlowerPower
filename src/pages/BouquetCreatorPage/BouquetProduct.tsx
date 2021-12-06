import {
  CardActionArea,
  CardMedia,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { FlowerShopProduct } from '../../common/types';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
    height: '450px',
    width: '200px',
    maxWidht: '350px',
    border: '1px solid silver',
    borderRadius: '5px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: '340px',
    gap: '10px',
    width: '100%',
  },
  addIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '200px',
  },
  actionText: {
    cursor: 'pointer',
  },
}));

type Props = {
  item: FlowerShopProduct;
  setQuantity: (itemId: string, value: number) => void;
  quantity: number;
};

const BouquetProduct: React.FC<Props> = ({ item, setQuantity, quantity }) => {
  const classes = useStyles();

  const getDetails = (item: FlowerShopProduct) => {
    if (item.subcategory === 'Flowers') {
      return `(${item.color})`;
    }
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <CardActionArea className={classes.item}>
          <CardMedia
            component="img"
            src={item.imageUrl}
            alt="alt"
            style={{
              objectFit: 'fill',
              height: '200px',
              width: '180px',
            }}
          />
          <Typography style={{ fontWeight: 'bold' }} align="center">
            {item.description}
          </Typography>
          <Typography align="center"> {getDetails(item)}</Typography>
          <Typography style={{ color: 'green' }}>{item.price} PLN</Typography>
        </CardActionArea>
        <div className={classes.addIcon}>
          <div
            className={classes.actionText}
            onClick={() => setQuantity(item.productId, quantity - 1)}
          >
            <AiOutlineMinus size={35} />
          </div>
          <TextField
            type="tel"
            style={{ width: '60px' }}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            value={quantity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = +event.target.value;
              if (!(Number.isNaN(value) || value <= 0 || value > 1000)) {
                setQuantity(item.productId, value);
              }
            }}
          />
          <div
            className={classes.actionText}
            onClick={() => setQuantity(item.productId, quantity + 1)}
          >
            <AiOutlinePlus size={35} />
          </div>
        </div>
        <Typography align="center">
          TOTAL: {(quantity * item.price).toFixed(2)}PLN
        </Typography>
      </div>
    </>
  );
};

export default BouquetProduct;
