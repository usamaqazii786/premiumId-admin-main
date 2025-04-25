/* eslint-disable react/prop-types */
import * as Yup from 'yup';
// form
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import axios from '../../../utils/axios';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';


export default function ResetPasswordForm({usertype}) {
  console.log(usertype,'reset form')

  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const forget = new FormData();
      forget.append('email', data?.email);

      await axios.post(`/forgot-password`, forget)

        .then((response) => {
          console.log(response)
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
            navigate('/reset-password');
          }
          else{
            enqueueSnackbar(response?.data?.message, {
              variant: 'error',
            });
          }
        });
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
