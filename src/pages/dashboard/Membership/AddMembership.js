import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Typography, Box } from '@mui/material';
// routes
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

export default function AddTag() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    insta: Yup.string().required('insta is required'),
    row: Yup.string().required('row is required'),
    image: Yup.mixed().required('section image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      row: '',
      insta: '',
      image: '',
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewStudentSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async () => {
    const formValues = getValues();
    console.log(formValues);
    try {
      const tag = new FormData();
      tag.append('name', formValues?.name);
      tag.append('insta', formValues?.insta);
      tag.append('row', formValues?.row);
      tag.append('image', formValues?.image);

      await axios
        .post('/talent', tag)

        .then((response) => {
          console.log(response?.status, 'response?.status--->');
          if (response?.status) {
            enqueueSnackbar(response?.data?.message);
            reset();
            navigate(PATH_DASHBOARD.list.list);
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
        console.log(img.height === 3931);
        if (img.height === 657 && img.width === 438) {
          setValue(
            'image',
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        } else{
          console.log(img.height,img.width)
          enqueueSnackbar(`Required: width = 438 and height = 657 Your image has width = ${img.width} and height = ${img.height}`, {
            variant: 'error',
          });
        }
      };
      img.onerror = (error) => {
        console.log(error, 'error');
      };
      console.log(file, 'file-->');
    },
    [setValue,enqueueSnackbar]
  );

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Add Talent list" links={[{ name: '', href: '' }]} />
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
                      onDrop={handleDrop}
                      onChange={(e) => {
                        console.log(e, 'file-->');
                      }}
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
                  <RHFTextField name="insta" label="insta" InputLabelProps={{ shrink: true }} />
                  <RHFTextField name="row" label="row" InputLabelProps={{ shrink: true }} />
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
