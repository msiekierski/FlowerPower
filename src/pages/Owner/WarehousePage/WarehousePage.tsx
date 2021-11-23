import {
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import StoreSelector from '../../../components/Owner/StoreSelector/StoreSelector';
import SearchIcon from '@material-ui/icons/Search';
import SortingSelector from './SortingSelector/SortingSelector';
import { GrAddCircle } from 'react-icons/gr';
import { FaRegEdit } from 'react-icons/fa';
import ProductTable from './ProductTable/ProductTable';
import { FiTrash } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  pageContent: {
    display: 'inline-grid',
    gridTemplateColumns: '2fr 5fr',
    marginTop: theme.spacing(6),
    position: 'absolute',
    left: '16px',
    justifyContent: 'space-between',
  },
  filters: {
    paddingRight: '5vw',
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    height: 'auto',
  },
  panel: { margin: '0 2.5vw' },
  tableOptions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  iconText: {
    display: 'flex',
    gap: '10px',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemsOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'flex-start',
    alignItems: 'start',
  },
}));

const WarehousePage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.header}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          OWNER'S DASHBOARD - WAREHOUSE
        </Typography>
        <StoreSelector />
      </div>
      <div className={classes.pageContent}>
        <div className={classes.filters}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae,
          tempore adipisci quidem culpa eum magni laborum odit. Adipisci aliquam
          numquam pariatur qui nostrum illum rem! Consequatur pariatur aliquid
          nam nostrum facere dolore. Sequi quam mollitia, labore doloremque
          laudantium iusto illo quis cupiditate culpa ut iste suscipit impedit.
          Ea, dicta eius.
        </div>
        <div className={classes.panel}>
          <div className={classes.tableOptions}>
            <TextField
              variant="outlined"
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <SortingSelector />
            <div className={classes.iconText}>
              <GrAddCircle size="2rem" />
              <Typography variant="h6">Add new</Typography>
            </div>
            <div className={classes.selectedItemsOptions}>
              <div className={classes.iconText}>
                <FaRegEdit size="2rem" />
                <Typography variant="h6">Edit&nbsp;Selected</Typography>
              </div>
              <div className={classes.iconText}>
                <FiTrash size="2rem" />
                <Typography variant="h6">Remove&nbsp;Selected</Typography>
              </div>
            </div>
            <ProductTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehousePage;
