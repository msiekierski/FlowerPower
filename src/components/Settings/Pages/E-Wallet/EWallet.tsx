import React, { ChangeEvent, FocusEvent, useState } from 'react';
import Cards from 'react-credit-cards';
import { ReactCreditCardProps } from 'react-credit-cards/index';
import 'react-credit-cards/es/styles-compiled.css';
import { Form } from 'formik';
import {
  FormControl,
  Input,
  InputLabel,
  TextField,
  makeStyles,
  Button,
} from '@material-ui/core';
import MaskedInput from 'react-text-mask';

const useStyles = makeStyles((theme) => ({
  walletContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      flexDirection: 'column-reverse',
      rowGap: '20px',
    },
  },
  form: {
    width: '50%',
    rowGap: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export type Focused = 'name' | 'number' | 'expiry' | 'cvc';

const EWallet = () => {
  const classes = useStyles();
  const [cardData, setCardData] = useState<ReactCreditCardProps>({
    cvc: '',
    expiry: '',
    focused: 'number',
    name: '',
    number: '',
  });

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCardData({ ...cardData, focused: name as Focused });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  return (
    <div className={classes.walletContainer}>
      <div className={classes.form}>
        <TextField
          fullWidth
          variant="standard"
          margin="none"
          size="small"
          color="secondary"
          type="text"
          inputProps={{ maxLength: 16 }}
          name="number"
          placeholder="Card number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />

        <TextField
          fullWidth
          variant="standard"
          margin="none"
          size="small"
          color="secondary"
          type="text"
          name="name"
          placeholder="Name and surname"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <TextField
          fullWidth
          variant="standard"
          margin="none"
          size="small"
          color="secondary"
          type="text"
          name="expiry"
          inputProps={{ pattern: '/dd/dd', maxLength: 5 }}
          placeholder="Expiration date"
          helperText="MM/YY"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <TextField
          fullWidth
          variant="standard"
          margin="none"
          size="small"
          color="secondary"
          type="text"
          name="cvc"
          inputProps={{ maxLength: 3 }}
          placeholder="CVC"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
          onBlur={() => setCardData({ ...cardData, focused: 'name' })}
        />
        <Button variant="contained" color="secondary" size="large">
          Save
        </Button>
      </div>
      <Cards
        cvc={cardData.cvc}
        expiry={cardData.expiry}
        focused={cardData.focused}
        name={cardData.name}
        number={cardData.number}
      />
    </div>
  );
};

export default EWallet;
