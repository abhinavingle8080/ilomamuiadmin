import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { Radio, RadioGroup, FormHelperText, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

RHFRadioGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionLabels: PropTypes.arrayOf(PropTypes.string),
  onChange : PropTypes.func
};

export default function RHFRadioGroup({ name, options, optionLabels, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other} onChange={onChange}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={optionLabels?.length ? optionLabels[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
