import { makeStyles, Typography } from '@material-ui/core';

import React, { useState } from 'react';

import DashboardCard, {
  CardProps,
} from '../../../components/Owner/DashboardCard/DashboardCard';
import StoreSelector from '../../../components/Owner/StoreSelector/StoreSelector';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  cards: {
    marginTop: theme.spacing(6),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '20px',
    [theme.breakpoints.down(1300)]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
}));

const cards: Array<CardProps> = [
  {
    imageUrl:
      'https://lh3.googleusercontent.com/pw/AM-JKLW__CPTGnUtjmEuiiVhSskRYt7LIOW6w3OXLBwb_04BnhSetHLow02t9WGxtixjdpqfhGbQnzUPJ6g9BolHwun9iQ6B75rycWvyYC3O9Ii5_Lo34cJr6KcBuKQWKGxrjE-hWk7-Z7u60wt1g1fHmLc=w237-h213-no?authuser=0',
    name: 'Warehouse',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed numquam nam corrupti quo voluptates voluptatem ab pariatur, eos fugit sunt.',
  },
  {
    name: 'Human Resources',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit dolore iure animi laudantium harum quibusdam, perferendis impedit omnis id doloremque.',
    imageUrl:
      'https://lh3.googleusercontent.com/pw/AM-JKLXD7LuxrftJ1PGnvfhzlOkQHgP8PPpqSAnMpf6SCiK1VgfK9NMGSeujG4RVyPe55qlT6IppI7XmvGdidz9sPMWyz46NZZEVI55Pgc4KH-YtoPXjQqRAxswgRc5iVlNA0Zm96h0k_l2sf2ymIIYE8kA=s200-no',
  },
  {
    name: 'Statistics',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem distinctio placeat at molestiae dolorem earum eum officia pariatur iusto non.',
    imageUrl:
      'https://lh3.googleusercontent.com/pw/AM-JKLWUodTZxX_WDktfyFT21QfgfmhYYlowU79r5ynEgXz0hopjttQLhfcX19378I9tCaTXCjBtli3LmOYrICtxCsxxUWjmWiRAGwfWPPrYC7E1rH08PVMU7_wrab6lUHRmV4hs6wO7AscD8dizeyU0Wdk=s225-no',
  },
  {
    name: 'Settings',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis sed ad corporis ex eligendi asperiores accusantium sapiente atque eos dicta.',
    imageUrl:
      'https://lh3.googleusercontent.com/pw/AM-JKLXSTVFDhNAMLn7FlMqhJlKotL-fpxv0pZFy_dTiHLWl83beznClsxs83nd8JSCqhd6nHCn5fq9qLiQmAJRxexNfYsHMmLts63sYTR6sST3ITKYEUHJ97NjsGDxKrr0ta7_VVLWLweIe5knIjBLZ1a8=s348-no',
  },
];

const MainPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          OWNER'S DASHBOARD
        </Typography>
        <StoreSelector />
      </div>
      <div className={classes.cards}>
        {cards.map((cardInfo) => (
          <DashboardCard {...cardInfo} />
        ))}
      </div>
    </>
  );
};

export default MainPage;
