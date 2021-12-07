import { ClassNames } from '@emotion/react';
import {
  Typography,
  makeStyles,
  CardMedia,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { ImCross } from 'react-icons/im';

import { AiOutlineCheck } from 'react-icons/ai';
import { useHistory } from 'react-router';
import { FlowerShopProduct } from '../../../common/types';
import * as _ from 'lodash';
import ItemSelectionProduct from './ItemSelectionProduct';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  products: Array<FlowerShopProduct>;
  addProduct: (item: FlowerShopProduct) => void;
  category: string;
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5vh',
    marginBottom: '64px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
    columnGap: '10px',
  },
}));

const ItemSelectionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  products,
  addProduct,
  category,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const grouped = _.groupBy(products, 'description');
  console.log(grouped);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={classes.mainContainer}
      fullScreen
    >
      <DialogTitle>
        <div className={classes.header}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '5px',
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              Choose among {category}
            </Typography>
          </div>

          <ImCross onClick={() => onClose()} style={{ cursor: 'pointer' }} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={classes.items}>
          {Object.keys(grouped).map((name) => (
            <ItemSelectionProduct
              shopItems={grouped[name]}
              addProduct={addProduct}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemSelectionDialog;
