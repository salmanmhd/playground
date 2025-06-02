import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  TextField,
  Alert,
  CircularProgress,
  DialogContent,
} from '@mui/material';
import { useState } from 'react';
import { changePassword1 } from '../../apis/user';
import { useFormik } from 'formik';
import { changePasswordSchema } from './schema';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
};

export default function ChangePassword() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  const [passwordChanged, setPasswordChanged] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: changePasswordSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log('submit', values);
      let data = {
        old_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmNewPassword,
      };
      setPending(true);
      changePassword1(data).then((res) => {
        if (res.error) {
          console.log(res);
          setError({ open: true, message: res.messages, severity: 'error' });
          setPending(false);
        } else {
          setPending(false);
          setError({ open: false, message: '', severity: 'error' });
          setPasswordChanged(true);
        }
      });
    },
  });

  return (
    <Box sx={style}>
      <Typography variant='h6'>Change Password</Typography>
      <TextField
        label='Old Password'
        type='password'
        name='oldPassword'
        fullWidth
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
      />
      <TextField
        label='New Password'
        type='password'
        name='newPassword'
        fullWidth
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
      />
      <TextField
        label='Confirm New Password'
        type='password'
        fullWidth
        required
        name='confirmNewPassword'
        value={formik.values.confirmNewPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmNewPassword &&
          Boolean(formik.errors.confirmNewPassword)
        }
        helperText={
          formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
        }
      />
      <Button
        type='submit'
        variant='contained'
        disabled={pending || passwordChanged}
        startIcon={pending && <CircularProgress size={20} color='primary' />}
        sx={{ mt: 2 }}
        onClick={formik.handleSubmit}
      >
        Change Password
      </Button>
      {error.open && (
        <Alert
          // sx={{ maxWidth: '435px', maxHeight: '50px', overflow: 'auto' }}
          severity={error.severity}
        >
          {error.message}
        </Alert>
      )}
      {passwordChanged && (
        <>
          <Alert severity='success'>Password Changed Successfully</Alert>
        </>
      )}
    </Box>
  );
}

// API - user

export const changePassword1 = async (data) => {
  let res = await post('api/user/change-password', data, true);
  return res;
};
