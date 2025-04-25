/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
// routes
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
// components
import { FormProvider, RHFUploadAvatar } from '../../../components/hook-form';

export default function EditProjects() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { projects } = useSelector((state) => state.project);

  const currenttag = projects?.find((tag) => tag?.id === +id);
  console.log(currenttag, projects, 'currenttag--->');

  const NewStudentSchema = Yup.object().shape({
    // name: Yup.string().required('name is required'),
    image: Yup.mixed().required('section image is required'),
  });
  const defaultValues = useMemo(
    () => ({
      // name: currenttag?.name || '',
      image: currenttag?.image || '',
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
      // tag.append('name', formValues?.name);
      tag.append('image', formValues?.image);
      tag.append('_method', 'put');

      await axios
        .post(`/project/${id}`, tag)

        .then((response) => {
          if (response?.status) {
            reset();
            enqueueSnackbar(response?.data?.message);
            navigate(PATH_DASHBOARD.projects.project);
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
        if (img.height === 518 && img.width === 640) {
          setValue(
            'image',
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        } else {
          console.log(img.height, img.width);
          enqueueSnackbar(
            `Required: width = 640 and height = 518 Your image has width = ${img.width} and height = ${img.height}`,
            {
              variant: 'error',
            }
          );
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
      <HeaderBreadcrumbs heading="Edit What we do" links={[{ name: '', href: '' }]} />
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
                  {/* <RHFTextField name="name" label="name" InputLabelProps={{ shrink: true }} /> */}
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
