import React from 'react';
import PropTypes from 'prop-types';
import { Controller,useFormContext } from 'react-hook-form';

import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';


const RHFDatePicker = ({ name, label, defaultValue, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      render={({ field }) => (
        <DatePicker
          {...field}
          {...rest}
          label={label}
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      )}
    />
  );
};

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.instanceOf(Date), // Add PropTypes for defaultValue
};

export default RHFDatePicker;
