/* eslint-disable no-nested-ternary */
/* eslint-disable */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box } from '@mui/material';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_AFTER_LOGIN } from '../../../config';
// import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField} from '../../../components/hook-form';

export default function CompanyProfile() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = JSON.parse(localStorage.getItem('currentuser'));

  const NewCompanySchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email(),
    // contact: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // password: Yup.string().required('Password is required'),
    // image: Yup.mixed().required(' Thumbnail is required')
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      // contact: currentUser?.contact || '',
      // additional_tab_is_visible: currentUser?.additional_tab_is_visible == 1 ? true : false  || false,
      // otp: currentUser?.otp_enabled == 1 ? true : false  || false,
      // password: '',
      image:currentUser?.image || '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewCompanySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    try {
      // const c_User = new URLSearchParams();
      const c_User1 = new FormData();
      // c_User1.append('image', data?.image);
      c_User1.append('name', data?.name);
      c_User1.append('email', data?.email);
      // c_User1.append('last_name', data?.lname);
      // c_User1.append('_method', 'PUT');
      // c_User.append('password', data?.password);


      await axios.post(`/profile-update`,c_User1).then((response) => {
        if (response?.data?.status === true) {
          console.log(response?.data,response?.data?.admin,'response?.data');
          localStorage.setItem('currentuser',JSON.stringify(response?.data?.admin))
          enqueueSnackbar('Profile Updated Successfully');
          navigate('/dashboard/home');
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  // const handlePasswordKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     OnSubmit(methods.getValues()); // Call the onSubmit function
  //   }
  // };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     if (file) {
  //       setValue(
  //         'image',
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <Container maxWidth="md">
      <HeaderBreadcrumbs heading="Profile" links={[{ name: '', href: '' }]} />
      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <Label
                  color={currentUser?.status ? 'success' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {currentUser?.status ? 'Active' : 'Active'}
                </Label>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Admin Profile Image
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
                {currentUser?.role === 'clinic'?
                 <RHFSwitch
                 name="additional_tab_is_visible"
              labelPlacement="start"
              label={
                <>
                   <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
               Additional tab
                  </Typography>
                </>
              }
                 sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                 />
                 : currentUser?.role === 'company' ? 
                 <RHFSwitch
                 name="otp"
              labelPlacement="start"
              label={
                <>
                   <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      2 Factors OTP Enable
                  </Typography>
                </>
              }
                 sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                 />
                : ''
                }
              </Box>
            </Card>
          </Grid> */}

          <Grid item xs={12} md={12}>
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
                {/* <RHFTextField name="lname" label="Last Name" InputLabelProps={{ shrink: true }} /> */}
                <RHFTextField name="email" label="Email" InputLabelProps={{ shrink: true }} />
                {/* <RHFTextField name="password" label="Password" InputLabelProps={{ shrink: true }} /> */}
              </Box>
              {/* <Grid item xs={12} md={12} sx={{ pt: 2 }}>
                <div>
                  <RHFDescription
                    name="lname"
                    label="Last Name"
                    onKeyPress={handlePasswordKeyPress}
                    multiline
                    rows={4}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </Grid> */}

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Update Profile
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
