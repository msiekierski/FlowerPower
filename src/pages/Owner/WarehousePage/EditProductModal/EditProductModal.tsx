import {
  Button,
  CardMedia,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { WarehouseItem } from '../../../../common/types';
// @ts-ignore
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

type Props = {
  isShown: boolean;
  onClose: () => void;
  product: WarehouseItem;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '30px 20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '40vw',
    backgroundColor: 'white',
  },
  content: {
    width: '90%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '30px',
    overflow: 'auto',
    maxHeight: '75vh',
    paddingBottom: '10px',
    paddingRight: '20px',
  },
  inlineInputs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  colors: {
    border: '1px solid',
    borderColor: theme.palette.divider,
    display: 'flex',
    flexDirection: 'column',
  },
  color: {
    border: '1px solid',
    borderColor: theme.palette.divider,
  },
}));

const colors: Array<string> = [
  'Red',
  'Yellow',
  'Blue',
  'Mix',
  'Orange',
  'White',
  'Black',
];

const sizes: Array<string> = ['Small', 'Medium', 'Large'];

const EditProductModal: React.FC<Props> = ({ isShown, onClose, product }) => {
  const { id, name, price, quantity, discount } = product;
  const [inputValues, setInputValues] = useState<any>({
    name,
    price,
    quantity,
  });
  const isDiscountSelected = discount !== null;
  const [datePicker, setDatePicker] = useState(
    isDiscountSelected
      ? [discount!.dateFrom, discount!.dateTo]
      : [new Date(), new Date()]
  );

  const [discountPrice, setDiscountPrice] = useState(
    isDiscountSelected ? discount!.newPrice : 0
  );

  const classes = useStyles();
  return (
    <Modal open={isShown} onClose={() => onClose()}>
      <Paper className={classes.modal}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }} align="center">
          Edit product (#{id})
        </Typography>
        <div className={classes.content}>
          <CardMedia
            style={{
              width: '80%',
              maxHeight: '100px',
              objectFit: 'contain',
              margin: 'auto',
            }}
            src={`https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png`}
            component="img"
          />
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            placeholder="Name"
            value={inputValues.name}
            onChange={(e: any) =>
              setInputValues({ ...inputValues, name: e.target.value })
            }
            label="Name"
          />
          <div className={classes.inlineInputs}>
            <TextField
              variant="outlined"
              color="secondary"
              type="number"
              placeholder="Regular price"
              fullWidth
              label="Regular price"
              value={inputValues.price}
              onChange={(e: any) =>
                setInputValues({ ...inputValues, price: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              color="secondary"
              type="number"
              placeholder="In-stock QTY"
              label="In-stock QTY"
              value={inputValues.quantity}
              onChange={(e: any) =>
                setInputValues({ ...inputValues, quantity: e.target.value })
              }
            />
          </div>
          <Typography>Discount: </Typography>
          <div className={classes.inlineInputs}>
            <DateRangePicker
              onChange={setDatePicker}
              value={datePicker}
              minDate={new Date()}
              clearIcon={null}
            />
            <TextField
              fullWidth
              variant="outlined"
              color="secondary"
              type="number"
              placeholder=""
              label="Discount price"
              value={discountPrice}
              onChange={(e: any) => setDiscountPrice(e.target.value)}
            />
          </div>

          <Typography>Available colors: </Typography>
          <div className={classes.colors}>
            {colors.map((color) => (
              <div className={classes.color}>
                <FormControlLabel
                  style={{ position: 'relative', left: '5%' }}
                  key={color}
                  label={color}
                  control={<Checkbox />}
                />
              </div>
            ))}
          </div>
          <Typography>Available sizes: </Typography>

          <div className={classes.colors}>
            {sizes.map((size) => (
              <div className={classes.color}>
                <FormControlLabel
                  style={{ position: 'relative', left: '5%' }}
                  key={size}
                  label={size}
                  control={<Checkbox />}
                />
              </div>
            ))}
          </div>
          <Typography>Product description: </Typography>
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            multiline
            rows={3}
          />
        </div>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Add item
        </Button>
      </Paper>
    </Modal>
  );
};

export default EditProductModal;
