/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useReducer, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from '../../redux/store';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { FormProvider, RHFTextField } from '../../components/hook-form';
// import { useDispatch } from '../../redux/store';
import axios from '../../utils/axios';
import { setSession } from '../../utils/jwt';
// import Iconify from 'src/components/Iconify';


export default function CodeMail({ type }) {
  // const [state, dispatch] = useReducer();
  const { enqueueSnackbar } = useSnackbar();
  const { login1 } = useAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMountedRef = useIsMountedRef();
  const location = useLocation();
  console.log(location.state);
  // const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    code: Yup.string()
        .required('Code is required')
        .max(4, 'OTP must be exactly 4 Digit'),
  });

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    // setError,
    // setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log('login-->>>', data)
    try{
      const user = new FormData();
      user.append('email', location?.state);
      user.append('otp', data.code);
  
      const response = await axios.post('/api/company/verify_otp', user);
      if (response?.data?.status == true) {
        setSession(response?.data?.data?.access_token);
        localStorage.setItem('currentuser', JSON.stringify(response?.data?.data));
        await login1(response?.data?.data)
        // dispatch({
        //   type: 'LOGIN',
        //   payload: {
        //     user: response?.data?.data,
        //   },
        // });
        // window.location.href = '/dashboard/home';
        navigate('/dashboard/home')
      } else {
        reset()
        enqueueSnackbar('enter valid OTP Code', {
          variant: 'error',
        });
      }
    }
   
    catch(error){
      console.log(error,'error in otp')
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  };

  return (
    <div className='mx-auto codemail'>
      <h1 className='fw-bold'>Verification Code </h1>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField name="code" className='my-2' type="text" label="Verification Code" />
        </Stack>

        <LoadingButton fullWidth size="large" className='my-2' type="submit" variant="contained" loading={isSubmitting}>
          Verification Code
        </LoadingButton>
      </FormProvider>
    </div>
  );
}
