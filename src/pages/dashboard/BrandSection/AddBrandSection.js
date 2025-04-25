import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Typography, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
// routes
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFUploadMultiFile } from '../../../components/hook-form';

export default function AddBrandSection() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
    images: Yup.array()
      .of(Yup.mixed().required('Image is required'))
      .min(1, 'At least one image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      images: [],
    }),
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
      const formData = new FormData();
      formValues.images.forEach((file,index) => {
        formData.append(`image[${index}]`, file);
      });

      await axios
        .post('/brand-section', formData)
        .then((response) => {
          console.log(response?.status, 'response?.status--->');
          if (response?.status) {
            enqueueSnackbar(response?.data?.message);
            reset();
            navigate(PATH_DASHBOARD.brandsection.brandsection);
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
      const validFiles = [];
      acceptedFiles.forEach((file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.height === 120 && img.width === 264) {
            validFiles.push(
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
            setValue('images', [...getValues('images'), ...validFiles]);
          } else {
            enqueueSnackbar(
              `Image dimensions must be height:120 width:264. Your image has dimensions: ${img.width}x${img.height}`,
              { variant: 'error' }
            );
          }
        };
        img.onerror = (error) => {
          console.log(error, 'Image load error');
        };
      });
    },
    [setValue, getValues, enqueueSnackbar]
  );

  const handleRemove = (file) => {
    const filteredFiles = getValues('images').filter((item) => item !== file);
    setValue('images', filteredFiles);
  };

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Add Brand Section" links={[{ name: '', href: '' }]} />
      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ mb: 5 }}>
                    <RHFUploadMultiFile
                      name="images"
                      accept="image/*"
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
                          <br /> Max size of {fData(3145728)}
                        </Typography>
                      }
                    />
                  </Box>
                  {/* Preview Images */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    {getValues('images').map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: 100,
                          height: 100,
                          borderRadius: 1,
                          overflow: 'hidden',
                          boxShadow: 1,
                        }}
                      >
                        <img
                          src={file.preview}
                          alt="preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          onClick={() => handleRemove(file)}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
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
