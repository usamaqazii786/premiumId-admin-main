import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box,TextField, Typography } from '@mui/material';
// routes
import { fData } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFTextField, RHFDescription, RHFUploadAvatar } from '../../../components/hook-form';

export default function AddMagictype() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewMagictypeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().required('Password is required'),
    image: Yup.mixed().required('Clinic Thumbnail is required'),
    startTime: Yup.string().required('Start Time is required'),
    endTime: Yup.string().required('End Time is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewMagictypeSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const OnSubmit = async (data) => {
  //   try {
  //     const clinic = new FormData();
  //     clinic.append('name', data?.name);
  //     clinic.append('email', data?.email);
  //     clinic.append('password', data?.password);
  //     clinic.append('contact', data?.phoneNumber);
  //     clinic.append('address', data?.address);
  //     clinic.append('start_time', data?.startTime);
  //     clinic.append('end_time', data?.endTime);
  //     clinic.append('image', data?.image);
  
  //     const clinicResponse = await axios.post('/api/company/clinics', clinic,{
  //       headers: {
  //         Accept: "application/json"
  //       }
  //     });
  
  //     if (clinicResponse?.data?.status === true) {
  //       enqueueSnackbar('Clinic Added Successfully');
  
  //       const clinicId = clinicResponse?.data?.data?.id;

  //       const credentialResponse = await axios.post(`/api/company/clinics/${clinicId}/set_n_send_password`);
  
  //       if (credentialResponse?.data?.status === true) {
  //         enqueueSnackbar('Credential Sent Successfully');
  //       } else {
  //         enqueueSnackbar(credentialResponse?.data?.error || 'Failed to send credential', {
  //           variant: 'error',
  //         });
  //       }
  
  //       reset();
  //       navigate(PATH_DASHBOARD.magictype.magictype);
  //     } else {
  //       enqueueSnackbar(clinicResponse?.data?.error || 'Failed to add clinic', {
  //         variant: 'error',
  //       });
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error.message || 'An error occurred', {
  //       variant: 'error',
  //     });
  //     console.error(error);
  //   }
  // };

  const OnSubmit = async (data) => {
    try {
      const clinic = new FormData();
      clinic.append('name', data?.name);
      clinic.append('email', data?.email);
      clinic.append('password', data?.password);
      clinic.append('contact', data?.phoneNumber);
      clinic.append('address', data?.address);
      clinic.append('start_time', data?.startTime);
      clinic.append('end_time', data?.endTime);
      clinic.append('image', data?.image);

      await axios.post("/api/company/clinics",clinic, {
        headers: {
          Accept: "application/json"
        }
      })

      .then((response)=>{
        console.log(response,'after create clinic')
        if(response?.data?.status === true){
        enqueueSnackbar('Clinic Created Successfully');
        reset();
        navigate(PATH_DASHBOARD.magictype.magictype);
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{
        variant: 'error'
      });
      console.error(error);
    }
  };
  

  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      OnSubmit(methods.getValues()); // Call the onSubmit function
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  
  return (
    <Container maxWidth="lg">
      <HeaderBreadcrumbs heading="Add Clinic" links={[{ name: '', href: '' }]} />

      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Clinic Profile Image
                </Typography>
                <RHFUploadAvatar
                  name="image"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="name" label="Name" InputLabelProps={{ shrink: true }} />
                <RHFTextField name="email" label="Email" InputLabelProps={{ shrink: true }} />
                <RHFTextField name="phoneNumber" label="Phone Number" InputLabelProps={{ shrink: true }} />
                <RHFTextField name="password" label="Password" InputLabelProps={{ shrink: true }} />

                <TextField
                  label="Start Time"
                  type="time"
                  name='startTime'
                  onChange={(e)=>{setValue('startTime',e.target.value)}}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: { sm: 'span 1' } }}
                />

                <TextField
                  label="End Time"
                  type="time"
                  name='endTime'
                  onChange={(e)=>{setValue('endTime',e.target.value)}}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: { sm: 'span 1' } }}
                />
              </Box>
              <Grid item xs={12} md={12} sx={{ pt: 2 }}>
                <div>
                  <RHFDescription
                    name="address"
                    label="Address"
                    onKeyPress={handlePasswordKeyPress}
                    multiline
                    rows={4}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Create Clinic
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
