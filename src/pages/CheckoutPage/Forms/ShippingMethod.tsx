import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';
import {
  Box,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import { FormControl, Select, SelectChangeEvent } from '@mui/material';
import { ShopShipmentMethodInfo } from '../CheckoutPage';

const useStyles = makeStyles((theme) => ({
  storeShipment: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
}));

type Props = {
  handleBack: () => void;
  handleNext: () => void;
  methods: Array<ShopShipmentMethodInfo>;
  setChosenMethod: (methods: Array<{ storeId: string; method: string }>) => void;
};

const ShippingMethod: React.FC<Props> = ({
  handleBack,
  handleNext,
  methods,
  setChosenMethod,
}) => {
  const classes = useStyles();
  const [selectedMethod, setSelectedMethod] = React.useState(
    methods.map((method) => '')
  );
 

  const handleMethodChange = (event: SelectChangeEvent<String>) => {
    const pos = parseInt(event.target.name);
    setSelectedMethod(
      selectedMethod.map((method, index) => {
        if (index === pos) {
          return event.target.value as string;
        } else {
          return method;
        }
      })
    );
  };

  return (
    <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipment Method
        </Typography>

        {methods.map((store, index) => (
          <div className={classes.storeShipment} key={index}>
            <Typography>{store.storeName}</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedMethod[index]}
                name={index.toString()}
                onChange={handleMethodChange}
              >
                {store.shipmentMethods.map((method, i) => (
                  <MenuItem value={method} key={i}>
                    {method}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select shipment method</FormHelperText>
            </FormControl>
          </div>
        ))}
      </React.Fragment>
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setChosenMethod(
                methods.map((method, index) => ({
                  storeId: method.storeId!,
                  method: selectedMethod[index],
                }))
              );
              handleNext();
            }}
            disabled={selectedMethod.findIndex((method) => method === '') >= 0}
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </React.Fragment>
    </>
  );
};

export default ShippingMethod;
