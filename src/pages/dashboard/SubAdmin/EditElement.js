/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box, Typography } from '@mui/material';
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { fData } from '../../../utils/formatNumber';

export default function EditElement() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { elements } = useSelector((state) => state.element);
  const imagepath =localStorage.getItem('imagepath');


  const currentCompany = elements.find((element) => element.id === +id);

  const NewCompanySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    // image: Yup.mixed().required('Company Thumbnail is required')
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCompany?.name || '',
      email: currentCompany?.email || '',
      image:  imagepath+currentCompany?.image ||  '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewCompanySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;
  console.log(errors, 'errors=========>>');
  const OnSubmit = async (data) => {
    try {
      const subAdmin = new FormData();
      subAdmin.append('name', data?.name);
      subAdmin.append('email', data?.email);
      subAdmin.append('_method','put');
      if (typeof(data?.image) !== 'string') {
        subAdmin.append('image', data?.image);
      }

      await axios.post(`admin/admins/${id}`, subAdmin).then((response) => {
        if (response?.data) {
          reset();
          enqueueSnackbar('Sub Admin Updated Successfully');
          navigate(PATH_DASHBOARD.element.element);
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
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Sub Admin" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ mb: 5 }}>
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
                  <RHFTextField name="name" label="Name" InputLabelProps={{ shrink: true }} />
                  <RHFTextField name="email" label="Email" InputLabelProps={{ shrink: true }} />

                  <RHFTextField name="password" label="Password" InputLabelProps={{ shrink: true }} />

                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Create
                    </LoadingButton>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </Container>
  );
}
