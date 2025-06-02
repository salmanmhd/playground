import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar({
  open,
  handleClose = () => false,
  children,
  severity = 'error',
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
}
