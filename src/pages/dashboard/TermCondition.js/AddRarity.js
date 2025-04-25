/* eslint-disable */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import React, { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Grid, Stack, Typography, Container, Box, MenuItem, TextField } from '@mui/material';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { fData } from '../../../utils/formatNumber';
import { FormProvider, RHFTextField, RHFUploadAvatar, RHFDescription, RHFSelect } from '../../../components/hook-form';

export default function AddRarity() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { spells } = useSelector((state) => state.spell);
  const currentspell = spells.find((spell) => spell.id === +id);
  const { specialities } = useSelector((state) => state.spell);
  const NewProviderSchema = Yup.object().shape({
    // fname: Yup.string().required('Button Text is required'),
    // lname: Yup.string().required('Text is required'),
    // email: Yup.string().required('Email is required').email(),
    // city: Yup.string().required('City is required'),
    // state: Yup.string().required('State is required'),
    // zipCode: Yup.string().required('ZIP Code is required'),
    // address: Yup.string().required('address is required'),
    // detail: Yup.string().required('detail is required'),
    // levelCode: Yup.string().required('levelCode is required'),
    // title: Yup.string().required('title is required'),
    image: Yup.mixed().required('video is required'),
    // startTime: Yup.string().required('Start Time is required'),
    // endTime: Yup.string().required('End Time is required'),
    // slotDuration: Yup.number()
      // .transform((value, originalValue) => {
        // const parsedValue = parseFloat(originalValue);
        // return isNaN(parsedValue) ? undefined : parsedValue;
      // })
      // .typeError('Slot Duration must be a number')
      // .test('is-number', 'Slot Duration must be numeric value', (value) => !isNaN(value))
      // .required('Slot Duration is required'),
    // specialities: Yup.string().required('Specialities is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // fname: currentspell?.fname || '',
      // lname: currentspell?.lname || '',
      // email: currentspell?.email || '',
      // city: currentspell?.city || '',
      // state: currentspell?.state || '',
      // zipCode: currentspell?.zipcode || '',
      // address: currentspell?.address || '',
      // levelCode: currentspell?.level_of_code || '',
      // detail: currentspell?.provider_description || '',
      // title: currentspell?.title || '',
      // about_me: currentspell?.about_me || '',
      // website: currentspell?.website || '',
      // startTime: currentspell?.start_time || '',
      // endTime: currentspell?.end_time || '',
      // slotDuration: currentspell?.slot_duration || '',
      image:null,
      // specialities: currentspell?.speciality_id || '',
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewProviderSchema),
    defaultValues,
  });

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const providerone = new FormData();
      
      // Assuming data is the object containing the video file
      providerone.append('video', data?.image);
      
      const responseone = await axios.post(`/api/admin/video`, providerone);
    
      if (responseone?.data?.status === true) {
        enqueueSnackbar(responseone?.data?.message);
        reset();
        navigate(PATH_DASHBOARD.rarity.rarity);
      } else {
        throw new Error('An error occurred while uploading video.');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
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
    <Container maxWidth="xl">
      <HeaderBreadcrumbs heading="Add Dynamic videos And Text" links={[{ name: '', href: '' }]} />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={3}>
              <Card sx={{ py: 6, px: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Add Dynamic video
                  </Typography>
                  <RHFUploadAvatar
                    name="image"
                    // accept="image/*"
                    maxSize={10737418240}
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
                        Allowed *.mp4
                        <br /> max size of {fData(10737418240)} 

                      </Typography>
                    }
                  />
                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Add 
                </LoadingButton>
              </Stack>
                </Box>
              </Card>
            </Stack>
          </Grid>
      
        </Grid>
      </FormProvider>
    </Container>
  );
}
