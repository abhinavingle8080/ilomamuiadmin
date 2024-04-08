import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
    name: PropTypes.string,
    disabled: PropTypes.bool,
};

export default function RHFTextField({ name, disabled, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <StyledTextField
                    {...field}
                    noValidate
                    fullWidth
                    error={!!error}
                    disabled={disabled}
                    sx={{ backgroundColor: disabled ? 'lightgrey' : 'inherit' }}
                    helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}
