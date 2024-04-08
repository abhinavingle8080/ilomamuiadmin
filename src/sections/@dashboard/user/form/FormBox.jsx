import React from 'react';
import propTypes from 'prop-types';

import { Box } from '@mui/material';

FormBox.propTypes = {
    children: propTypes.any,
};

function FormBox({ children }) {
    return (
        <Box
            sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
        >
            {children}
        </Box>
    );
}

export default FormBox;
