import { makeStyles } from '@material-ui/core';
import React from 'react';
import LocalShippingTwoToneIcon from '@material-ui/icons/LocalShippingTwoTone';

type Props = {
  available: boolean;
};

const useStyles = makeStyles((theme) => ({
  shippingIconDisabled: {
    fontSize: '2.75rem',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: '"/"',
      color: 'red',
      fontWeight: 500,
      fontSize: '2.r5em',
      left: '10.4px',
      top: '-13.7px',
      transform: 'rotate(15deg)',
    },
  },
  shippingIcon: {
    fontSize: '2.75rem',
    position: 'relative',
  },
}));

const ShippingIcon: React.FC<Props> = ({ available }) => {
  const classes = useStyles();
  return (
    <span
      className={
        available ? classes.shippingIcon : classes.shippingIconDisabled
      }
    >
      <LocalShippingTwoToneIcon
        className={
          available ? classes.shippingIcon : classes.shippingIconDisabled
        }
      />
    </span>
  );
};

export default ShippingIcon;
