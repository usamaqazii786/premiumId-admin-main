/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Typography, Box } from '@mui/material';
// routes
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

export default function EditHomes() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const  {mainhomes}  = useSelector((state) => state.mainhome);

  const currenttag = mainhomes?.find((tag) => tag?.id === +id);
  console.log(currenttag,mainhomes,'currenttag--->');

  const NewStudentSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    image: Yup.mixed().required('section image is required'),

  });
  const defaultValues = useMemo(
    () => ({
      name: currenttag?.name || '',
      image:currenttag?.image|| '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewStudentSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async () => {
    const formValues = getValues();
    console.log(formValues);
    try {
      const tag = new FormData();
      tag.append('name', formValues?.name);
      tag.append('image', formValues?.image);
      tag.append('_method',"put");

      await axios
        .post(`/home/${id}`, tag)

        .then((response) => {
          if (response?.status) {
            reset();
            enqueueSnackbar(response?.data?.message);
            navigate(PATH_DASHBOARD.homes.homes);
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
      const img = new Image();
      const file = acceptedFiles[0];
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        console.log(img.height === 863);
        if (img.height === 863 && img.width === 688) {
          setValue(
            'image',
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        } else{
          console.log(img.height,img.width)
          enqueueSnackbar(`Required: width = 2733 and height = 3931 Your image has width = ${img.width} and height = ${img.height}`, {
            variant: 'error',
          });
        }
      };
      img.onerror = (error) => {
        console.log(error, 'error');
      };
      console.log(file, 'file-->');
    },
    [setValue]
  );
  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit home list" links={[{ name: '', href: '' }]} />
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
                  <RHFTextField name="name" label="name" InputLabelProps={{ shrink: true }} />
                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Edit 
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
