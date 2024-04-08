import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { styled, FormHelperText } from '@mui/material';

import Editor from '../editor';

// ----------------------------------------------------------------------

const StyledEditor = styled(Editor)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

RHFEditor.propTypes = {
    name: PropTypes.string,
};

export default function RHFEditor({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <StyledEditor
                    id={name}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!error}
                    helperText={
                        <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                            {error?.message}
                        </FormHelperText>
                    }
                    {...other}
                />
            )}
        />
    );
}
