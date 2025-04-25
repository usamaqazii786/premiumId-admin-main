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

export default function EditSpell() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { spells } = useSelector((state) => state.spell);
  const currentspell = spells.find((spell) => spell.id === +id);
  const { specialities } = useSelector((state) => state.spell);
  const NewProviderSchema = Yup.object().shape({
    fname: Yup.string().required('User Name is required'),
    lname: Yup.string().required('Post Title is required'),
    // email: Yup.string().required('Email is required').email(),
    // city: Yup.string().required('City is required'),
    // state: Yup.string().required('State is required'),
    // zipCode: Yup.string().required('ZIP Code is required'),
    // address: Yup.string().required('address is required'),
    detail: Yup.string().required('Description is required'),
    // levelCode: Yup.string().required('levelCode is required'),
    // title: Yup.string().required('title is required'),
    // image: Yup.mixed().required('Post image is required'),
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
      fname: currentspell?.username || '',
      lname: currentspell?.title || '',
      // email: currentspell?.email || '',
      // city: currentspell?.city || '',
      // state: currentspell?.state || '',
      // zipCode: currentspell?.zipcode || '',
      // address: currentspell?.address || '',
      // levelCode: currentspell?.level_of_code || '',
      detail: currentspell?.description || '',
      // title: currentspell?.title || '',
      // about_me: currentspell?.about_me || '',
      // website: currentspell?.website || '',
      // startTime: currentspell?.start_time || '',
      // endTime: currentspell?.end_time || '',
      // slotDuration: currentspell?.slot_duration || '',
      image: `https://dontmess.devssh.xyz${currentspell?.files[0]?.name}` || '',
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
    // console.log(data.image);
    // console.log(typeof data?.image === 'string');
    try {
      const provider = new FormData();
      provider.append('username', data?.fname);
      provider.append('title', data?.lname);
      // provider.append('email', data?.email);
      // provider.append('address', data?.address);
      // provider.append('city', data?.city);
      // provider.append('state', data?.state);
      // provider.append('zipcode', data?.zipCode);
      // provider.append('start_time', data?.startTime);
      // provider.append('end_time', data?.endTime);
      // provider.append('slot_duration', data?.slotDuration);
      
  if (typeof data?.image === 'string') {
    provider.append('post_files[]','' );
  } else {
    provider.append('post_files[0]', data?.image);
  }
      provider.append('description', data?.detail);

      
      // provider.append('post_files[0]', data?.image);
      // provider.append('title', data?.title);
      // provider.append('level_of_code', data?.levelCode);
      // provider.append('about_me', data?.about_me);
      provider.append('_method', 'PUT');

      await axios.post(`/api/admin/post/${id}`, provider).then((response) => {
        console.log(response);
        if (response?.data?.status === true) {
          enqueueSnackbar('Post Updated Successfully');
          reset();
          navigate(PATH_DASHBOARD.spell.spell);
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
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
      <HeaderBreadcrumbs heading="Edit Post" links={[{ name: '', href: '' }]} />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ py: 6, px: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Post Image
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
            </Stack>
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
                <RHFTextField name="fname" label="User Name" />
                <RHFTextField name="lname" label="Post Title" />
                {/* <RHFTextField name="email" label="Email" /> */}
                {/* <RHFTextField name="city" label="City" /> */}
                {/* <RHFTextField name="state" label="State" /> */}
                {/* <RHFTextField name="zipCode" label="ZIP Code" /> */}
                {/* <RHFTextField name="levelCode" label="Level Code" InputLabelProps={{ shrink: true }} /> */}
                {/* <RHFTextField name="title" label="Title" InputLabelProps={{ shrink: true }} /> */}
                {/* <RHFTextField name="about_me" label="About me" InputLabelProps={{ shrink: true }} /> */}
                {/* <RHFTextField name="website" label="Website Link" InputLabelProps={{ shrink: true }} /> */}
                {/* <TextField
                  label="Start Time"
                  type="time"
                  name="startTime"
                  // value='startTime'
                  {...register('startTime')}
                  onChange={(e) => {
                    setValue('startTime', e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: { sm: 'span 1' } }}
                />
                <TextField
                  label="End Time"
                  type="time"
                  {...register('endTime')}
                  // value='endTime'
                  name="endTime"
                  onChange={(e) => {
                    console.log('endTime',e.target.value)
                    setValue('endTime', e.target.value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: { sm: 'span 1' } }}
                /> */}

                {/* <RHFTextField name="slotDuration"  label="Slot Duration (in Minute)" />
                <RHFSelect
                  name="specialities"
                  label="Select Specialities"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  {specialities?.map((e) => (
                    <MenuItem
                      value={e?.id}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {e?.name}
                    </MenuItem>
                  ))}
                </RHFSelect> */}
              </Box>
              <Grid item xs={12} md={12} sx={{ pt: 2 }}>
                <div>
                  <RHFDescription name="detail" label="Post Description" multiline rows={3}  InputLabelProps={{ shrink: true }}/>
                </div>
              </Grid>
              {/* <Grid item xs={12} md={12} sx={{ pt: 2 }}>
                <div>
                  <RHFDescription name="address" label="Address" multiline rows={3} />
                </div>
              </Grid> */}
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Update Post
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
