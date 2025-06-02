import { Box, Button } from '@mui/material';
import { useState } from 'react';
import SnackBar from './Snackbar';

function Comp() {
  const [error, setError] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  return (
    <Box sx={{ height: '500px', width: '500px', backgroundColor: 'gray' }}>
      hi there
      <Box sx={{ height: '200px', width: '200px', backgroundColor: 'red' }}>
        this is another box
      </Box>
      <Button
        variant='outlined'
        onClick={() =>
          setError({
            open: true,
            message: 'This is an error from comp',
            severity: 'error',
          })
        }
      >
        click
      </Button>
      <SnackBar
        open={error.open}
        handleClose={() => setError({ ...error, open: false })}
      >
        {error.message}
      </SnackBar>
    </Box>
  );
}

export default Comp;
