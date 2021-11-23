import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
} from '@material-ui/core';
import { Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { stringToUrl } from '../../../utils/functions/stringToUrlValue';

export type CardProps = {
  imageUrl: string;
  name: string;
  description: string;
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'contain',
  },
  card: {
    height: '300px',
    width: '100%',
  },
}));

const DashboardCard: React.FC<CardProps> = ({
  imageUrl,
  name,
  description,
}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.card}>
      <Link to={`/owner/${stringToUrl(name)}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            src={imageUrl}
            alt={name}
            className={classes.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              dicta repudiandae facere iure, officia enim provident quam tempore
              a non.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default DashboardCard;
