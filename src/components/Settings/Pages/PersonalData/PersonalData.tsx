import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      '& .MuiButton-root': {
        width: '100%',
      },
    },
  },
}));

export type PersonalDataRow = {
  title: string;
  value?: string;
};

const PersonalData = () => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user);

  const rows: Array<PersonalDataRow> = [
    { title: 'Name', value: 'Jan' },
    { title: 'Surname', value: 'Kowalski' },
    { title: 'Street', value: 'Rynek 15/5' },
    { title: 'City', value: 'Wrocław' },
    { title: 'Zip Code', value: '50-324' },
  ];

  return (
    <>
      <Typography className={classes.title} variant="h4">
        Personal Data
      </Typography>
      <TableContainer>
        <Table>
          {rows.map((row) => (
            <TableRow>
              <TableCell width="50%">
                <Typography style={{ fontStyle: 'italic' }}>
                  {row.title}
                </Typography>
              </TableCell>
              <TableCell width="50%">
                <Typography style={{ fontWeight: 'bold' }}>
                  {row.value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
      <div className={classes.tableFooter}>
        <Button variant="contained" color="secondary" size="large">
          Edit Data
        </Button>
      </div>
    </>
  );
};

export default PersonalData;
