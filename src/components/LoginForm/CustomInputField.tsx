import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps } from 'formik';
import React from 'react';

const CustomInputField: React.FC<FieldProps & TextFieldProps> = ({
  label,
  field,
  error,
  helperText,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      focused={true}
      error={error}
      helperText={helperText}
      type={field.name}
      color="secondary"
      {...field}
    />
  );
};

export default CustomInputField;
