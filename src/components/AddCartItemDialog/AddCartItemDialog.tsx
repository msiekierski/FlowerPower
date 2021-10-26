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
import { FlowerShopProduct } from '../../common/types';
import { AiOutlineCheck } from 'react-icons/ai';
import { useHistory } from 'react-router';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: FlowerShopProduct;
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5vh',
    maxHeight: '40vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    columnGap: '10vh',
  },
}));

const AddCartItemDialog: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const { imageUrl, description } = product;
  const classes = useStyles();
  const history = useHistory();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <div className={classes.header}>
          <div
            style={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}
          >
            <AiOutlineCheck style={{ color: 'green' }} />
            <Typography variant="h6">
              Item has been added to the cart.
            </Typography>
          </div>

          <ImCross onClick={() => onClose()} style={{ cursor: 'pointer' }} />
        </div>
      </DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          image={imageUrl}
          style={{ width: 'auto', maxHeight: '200px', margin: 'auto' }}
        />

        <Typography align="center" style={{ marginTop: '20px' }}>
          {description}
        </Typography>
      </DialogContent>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ width: '60%', margin: 'auto', marginBottom: '20px' }}
        onClick={() => history.push('/cart')}
      >
        Go to the cart
      </Button>
      <Button
        onClick={() => onClose()}
        variant="outlined"
        color="primary"
        size="large"
        style={{
          width: 'auto',
          margin: 'auto',
          marginBottom: '30px',
          borderColor: 'black',
          color: 'black',
        }}
      >
        Continue shopping
      </Button>
    </Dialog>
  );
};

export default AddCartItemDialog;
