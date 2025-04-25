/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo,useCallback } from 'react';

// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container,Box,Typography,TextField } from '@mui/material';
// routes
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
  RHFDescription,
  RHFUploadAvatar
} from '../../../components/hook-form';

export default function EditMagictype() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { magictypes } = useSelector((state) => state.magictype);

  const currentMagictype = magictypes.find((magictype) =>magictype.id === +(id))

  const NewMagictypeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().required('Password is required'),
    // image: Yup.mixed().required('Clicnic Thumbnail is required'),
    startTime: Yup.string().required('Start Time is required'),
    endTime: Yup.string().required('End Time is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:   currentMagictype?.name || '',
       address:  currentMagictype?.address ||  '',
       email:  currentMagictype?.email ||  '',
       phoneNumber:  currentMagictype?.contact ||  '',
       startTime:  currentMagictype?.start_time ||  '',
       endTime:  currentMagictype?.end_time ||  '',
       image:  currentMagictype?.image ||  '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewMagictypeSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    console.log(data)
    try {
      const clinic = new URLSearchParams();
      clinic.append('name', data?.name);
      clinic.append('email', data?.email);
      clinic.append('password', data?.password);
      clinic.append('phoneNumber', data?.phoneNumber);
      clinic.append('address', data?.address);
      clinic.append('start_time', data?.startTime);
      clinic.append('end_time', data?.endTime);

      await axios.put(`/api/company/clinics/${id}`,clinic)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar('Clinic Updated Successfully');
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
    <Container maxWidth='lg'>
    <HeaderBreadcrumbs
      heading="Edit Clinic"
      links={[
        { name:'', href:''},]}/>

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
              <RHFTextField name="name" label="Name" InputLabelProps={{ shrink: true }}/>
              <RHFTextField name="email" label="Email" InputLabelProps={{ shrink: true }}/>
              <RHFTextField name="phoneNumber" label="Phone Number" InputLabelProps={{ shrink: true }}/>
              <RHFTextField name="password" label="Password" InputLabelProps={{ shrink: true }}/>
              <TextField
                  label="Start Time"
                  type="time"
                  name='startTime'
                  // value='startTime'
                  {...register('startTime')}
                  onChange={(e)=>{setValue('startTime',e.target.value)}}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: { sm: 'span 1' } }}
                />

                <TextField
                  label="End Time"
                  type="time"
                  {...register('endTime')}
                  // value='endTime'
                  name='endTime'
                  onChange={(e)=>{
                    setValue('endTime',e.target.value)
                  }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: { sm: 'span 1' } }}
                />
              </Box>
              <Grid item xs={12} md={12} sx={{ pt: 2 }}>
              <div>
                <RHFDescription name="address" label="Address" onKeyPress={handlePasswordKeyPress} multiline rows={4} InputLabelProps={{ shrink: true }}/>
              </div>
              </Grid>
              
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Updated Clinic
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
