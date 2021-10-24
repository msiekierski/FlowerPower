import { CardContent, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { Box } from '@mui/system';
import { Card, Grid } from '@mui/material';

type Props = {
  text: string;
  rating: number;
  author: string;
  date: string;
};

const useStyles = makeStyles((theme) => ({
  cardComponent: {
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '1px',
  },
}));

const FlowerShopReviewCard: React.FC<Props> = ({
  text,
  rating,
  author,
  date,
}) => {
  const classes = useStyles();

  const truncateText = (str: string) => {
    return str.length > 100 ? str.substring(0, 97) + '...' : str;
  };

  return (
    <>
      <Card className={classes.cardComponent}>
        <CardContent>
          <div className={classes.rating}>
            <Rating value={rating} readOnly precision={0.5} />
          </div>
          <Typography variant="h6" component="div" align="center">
            {truncateText(text)}
          </Typography>

          <Typography color="text.secondary" align="center">
            {author}, {date}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FlowerShopReviewCard;
