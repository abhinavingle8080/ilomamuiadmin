import PropTypes from 'prop-types';
import { useRef } from 'react';
import { SnackbarProvider } from 'notistack';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, GlobalStyles } from '@mui/material';

import Iconify from './iconify';
import { IconButtonAnimate } from './animate';

// ----------------------------------------------------------------------

function SnackbarStyles() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            borderRadius: theme.shape.borderRadius,
            color: '#000', // Black text color
            backgroundColor: '#fff', // White background
            '&.SnackbarItem-variantSuccess': {
              backgroundColor: '#4caf50', // Green background for success variant
            },
            '&.SnackbarItem-variantError': {
              backgroundColor: '#f44336', // Red background for error variant
            },
            '&.SnackbarItem-variantWarning': {
              backgroundColor: '#ff9800', // Orange background for warning variant
            },
            '&.SnackbarItem-variantInfo': {
              backgroundColor: '#2196f3', // Blue background for info variant
            },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
            // Additional text styling can be added here
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: '#000', // Black color for action (close) button
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

NotistackProvider.propTypes = {
  children: PropTypes.node,
};

export default function NotistackProvider({ children }) {
  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        style={{
          color: '#000', // Black text color
          backgroundColor: '#fff', // White background
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: <SnackbarIcon icon='eva:info-fill' color="#2196f3" />,
          success: <SnackbarIcon icon='eva:checkmark-circle-2-fill' color="#4caf50" />,
          warning: <SnackbarIcon icon='eva:alert-triangle-fill' color="#ff9800" />,
          error: <SnackbarIcon icon='eva:alert-circle-fill' color="#f44336" />,
        }}
        // With close as default
        action={(key) => (
          <IconButtonAnimate size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon='eva:close-fill' />
          </IconButtonAnimate>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string, // Accepting color as a prop
};

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // White color for icon
        bgcolor: color, // Background color based on variant
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Box>
  );
}
