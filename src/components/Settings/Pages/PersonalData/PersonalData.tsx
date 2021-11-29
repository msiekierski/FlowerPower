import {
  Button,
  CircularProgress,
  FormHelperText,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Theme } from '../../../../App';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
import axios from 'axios';
import { userInfoToApi } from '../../../../utils/objectMapping/userInfoToApi';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux/user';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      '& .MuiButton-root': {
        width: '100%',
      },
    },
  },
  submitButton: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    width: '25%',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: '100%',
    },
  },
}));

export type PersonalDataRow = {
  title: string;
  value?: string;
};

interface Values {
  Name: string;
  Surname: string;
  Street: string;
  City: string;
  'Zip Code': string;
  'Phone Number': string;
}

const getApiUrl = (userId: string) =>
  `${process.env.REACT_APP_API_ADDRESS}/flowerPower/customer/update/clientInfo/${userId}`;

const validateSchema = Yup.object().shape({
  Name: Yup.string().required('Required'),
  Surname: Yup.string().required('Required'),
  Street: Yup.string().required('Required'),
  City: Yup.string().required('Required'),
  'Zip Code': Yup.string()
    .required('Required')
    .matches(/[0-9]{2}-[0-9]{3}/, 'Wrong format'),
  'Phone Number': Yup.string().required('Required').min(11, 'Wrong format'),
});

const PersonalData = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const { setDetails } = bindActionCreators(actionCreators, dispatch);

  const rows: Array<PersonalDataRow> = [
    { title: 'Name', value: user?.name },
    { title: 'Surname', value: user?.surname },
    { title: 'Street', value: user?.street },
    { title: 'City', value: user?.city },
    { title: 'Zip Code', value: user?.zipCode },
  ];

  const updateUserData = async (data: Values) => {
    
    try {
      setIsFormSubmitting(true);
     
      await axios.post(getApiUrl(user?.id!), userInfoToApi(data));
      setDetails({
        name: data.Name,
        surname: data.Surname,
        street: data.Street,
        city: data.City,
        zipCode: data['Zip Code'],
        phoneNumber: data['Phone Number'],
      });
      setIsFormSubmitting(false);
    } catch (e) {
      setIsFormSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          Name: user?.name ? user?.name : '',
          Surname: user?.surname ? user.surname : '',
          Street: user?.street ? user.street : '',
          City: user?.city ? user.city : '',
          'Zip Code': user?.zipCode ? user.zipCode : '',
          'Phone Number': user?.phone ? user.phone : '',
        }}
        validationSchema={validateSchema}
        onSubmit={() => {}}
      >
        {({ errors, touched, resetForm, values }) => (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              if (Object.keys(errors).length === 0) {
                updateUserData(values);
                setIsEditing(false);
              }
            }}
          >
            <TableContainer>
              <Table>
                <TableBody>
                  {rows.map((row, index) => {
                    let valueComponent = null;
                    if (isEditing) {
                      valueComponent = (
                        <Field name={row.title}>
                          {({ field, form: { isSubmitting } }: any) => (
                            <>
                              <TextField
                                {...field}
                                disabled={isSubmitting}
                                type="text"
                                size="small"
                                fullWidth
                                focused={true}
                                color="secondary"
                                error={
                                  getIn(errors, row.title) &&
                                  getIn(touched, row.title)
                                }
                                autoComplete="off"
                              />
                              <FormHelperText style={{ color: 'red' }}>
                                <ErrorMessage name={row.title} />
                              </FormHelperText>
                            </>
                          )}
                        </Field>
                      );
                    } else {
                      valueComponent = (
                        <Typography style={{ fontWeight: 'bold' }}>
                          {row.value}
                        </Typography>
                      );
                    }
                    return (
                      <TableRow key={index}>
                        <TableCell width="50%">
                          <Typography style={{ fontStyle: 'italic' }}>
                            {row.title}
                          </Typography>
                        </TableCell>
                        <TableCell width="50%">{valueComponent}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell width="50%">
                      <Typography style={{ fontStyle: 'italic' }}>
                        Phone Number
                      </Typography>
                    </TableCell>

                    <TableCell width="50%">
                      {isEditing ? (
                        <Field
                          name={'Phone Number'}
                          error={
                            errors['Phone Number'] && touched['Phone Number']
                          }
                        >
                          {({ field, form: { isSubmitting } }: any) => (
                            <>
                              <MuiPhoneNumber
                                {...field}
                                disabled={isSubmitting}
                                defaultCountry={'pl'}
                                onChange={(value) => {
                                  values['Phone Number'] = value.toString();
                                }}
                                regions={'europe'}
                                variant="standard"
                                margin="none"
                                size="small"
                                fullWidth
                                focused={true}
                                countryCodeEditable={false}
                                sx={{
                                  '& .css-ghsjzk-MuiInputBase-root-MuiInput-root:after':
                                    {
                                      borderColor: 'black',
                                    },
                                }}
                              />
                              <FormHelperText style={{ color: 'red' }}>
                                <ErrorMessage name={'Phone Number'} />
                              </FormHelperText>
                            </>
                          )}
                        </Field>
                      ) : (
                        <Typography style={{ fontWeight: 'bold' }}>
                          {user?.phone}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className={classes.tableFooter}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      setIsEditing(!isEditing);
                      resetForm();
                    }}
                    className={classes.submitButton}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    className={classes.submitButton}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      Save
                      {isFormSubmitting && <CircularProgress />}
                    </div>
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => setIsEditing(!isEditing)}
                  className={classes.submitButton}
                >
                  Edit
                </Button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PersonalData;
