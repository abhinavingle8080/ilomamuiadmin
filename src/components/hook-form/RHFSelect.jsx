import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { styled, TextField } from '@mui/material';

// ----------------------------------------------------------------------

const StyledTextField = styled(TextField)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

RHFSelect.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
};

export default function RHFSelect({ name, children, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <StyledTextField
                    {...field}
                    select
                    fullWidth
                    SelectProps={{ native: true }}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                >
                    {children}
                </StyledTextField>
            )}
        />
    );
}
