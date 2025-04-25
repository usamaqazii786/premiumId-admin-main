import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

export default function RegisterForm() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    otp: Yup.string().required('Otp is required'),
    password: Yup.string().required('Password is required'),
    cpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    email: '',
    otp: '',
    password: '',
    cpassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const forget = new FormData();
      forget.append('email', data?.email);
      forget.append('otp', data?.otp);
      forget.append('password', data?.password);
      forget.append('password_confirmation', data?.cpassword);

      await axios
        .post(`/reset-password`, forget)
        .then((response) => {
          console.log(response);
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
            navigate('/dashboard/home');
          } else {
            // enqueueSnackbar(response?.data?.error, {
            //   variant: 'error',
            // });
            console.error(response,'error--->');
          }
        });
    } catch (error) {
      if (error?.errors) {
        const errors = error?.errors;
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((message) => {
            enqueueSnackbar(message, { variant: 'error' });
          });
        });
      } else {
        enqueueSnackbar(error, { variant: 'error' });
      }
      console.error(error?.errors,'error--->');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email" />
        <RHFTextField name="otp" label="Otp" type="number" />
        
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="cpassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Reset Password
        </LoadingButton>
        <Button fullWidth size="large" component={RouterLink} to="/forget-password" sx={{ mt: 1 }}>
          Back
        </Button>
      </Stack>
    </FormProvider>
  );
}
