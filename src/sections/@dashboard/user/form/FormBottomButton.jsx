import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Stack, Button } from '@mui/material';

FormBottomButton.propTypes = {
    cancelButton: propTypes.string,
    onClear: propTypes.func,
    isSubmitting: propTypes.bool,
    isEdit: propTypes.bool,
};

function FormBottomButton({ cancelButton, onClear, isSubmitting, isEdit }) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
            <Button sx={{ mr: 2 }} variant="contained" color="error" component={Link} to={cancelButton}>
                Cancel
            </Button>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Button sx={{ mr: 2 }} variant="outlined" color="secondary" onClick={onClear}>
                    Clear
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Submit' : 'Update'}
                </LoadingButton>
            </Stack>
        </Stack>
    );
}

export default FormBottomButton;
