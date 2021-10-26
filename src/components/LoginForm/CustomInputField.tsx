import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps } from 'formik';
import React from 'react';

const CustomInputField: React.FC<FieldProps & TextFieldProps> = ({
  label,
  field,
  error,
  helperText,
  required,
  type,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label={label}
      focused={false}
      error={error}
      helperText={helperText}
      color="secondary"
      {...field}
      required={required}
      type={type}
    />
  );
};

export default CustomInputField;
