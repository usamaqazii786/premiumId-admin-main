/* eslint-disable no-alert */
/* eslint-disable */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../../utils/axios';
import { setSession } from '../../../utils/jwt';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

export default function LoginForm({ type }) {
  const { login, login1 } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard/home');
    } catch (error) {
      console.error(error);
      setValue('password', '');
      setValue('email', '');
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error?.message });
      }
    }
  };

  // const onSubmit = async (data) => {
  //   try {

  //       const companyData = new FormData();
  //       companyData.append('login_identifier', data.email);
  //       companyData.append('password', data.password);
  //       // companyData.append('type', type);
  //       const response = await axiosInstance.post('/api/admin/login', companyData);
  //       console.log(response, 'response');
  //       if (response?.data?.status === true) {

  //         setSession(response?.data?.token);
  //         enqueueSnackbar('Admin Login  Successfully');
  //         localStorage.setItem('currentuser', JSON.stringify(response?.data?.data));
  //         // await login1(response?.data?.data)
  //         // navigate('dashboard/usersdata');
  //         navigate('/dashboard/home')
  //         setTimeout(() => {

  //           window.location.reload()
  //         }, 1000);

  //     }
  //     else {
  //       console.log('else');
  //     }
  //   }
  //   catch (error) {
  //     console.error(error);
  //     reset();
  //     if (isMountedRef.current) {
  //       setError('afterSubmit', { ...error, message: error.message });
  //     }
  //   }
  // };

  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(methods.getValues()); // Call the onSubmit functions
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setValue('password', e.target.value)}
          onKeyPress={handlePasswordKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" to={'/forget-password'}>
            Forgot password?
          </Link>
      </Stack>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
