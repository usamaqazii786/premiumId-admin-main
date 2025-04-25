import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFUploadAvatar } from '../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';

export default function AddWhatwedo() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading1, setLoading1] = useState();
  const [loading2, setLoading2] = useState();
  const [loading3, setLoading3] = useState();
  // Validation schemas
  const BannerVideoSchema = Yup.object().shape({
    banner_video: Yup.mixed().required('Banner video is required'),
  });

  const LeftRightVideoSchema = Yup.object().shape({
    left_video: Yup.mixed().nullable(),
    right_video: Yup.mixed().nullable(),
  });

  const ImagesSchema = Yup.object().shape({
    left_images: Yup.array().of(Yup.mixed()).min(1, 'At least one left image is required'),
    right_images: Yup.array().of(Yup.mixed()).min(1, 'At least one right image is required'),
  });

  // Initialize forms
  const bannerMethods = useForm({
    resolver: yupResolver(BannerVideoSchema),
    defaultValues: { banner_video: null },
  });

  const videoMethods = useForm({
    resolver: yupResolver(LeftRightVideoSchema),
    defaultValues: { left_video: null, right_video: null },
  });

  const imagesMethods = useForm({
    resolver: yupResolver(ImagesSchema),
    defaultValues: { left_images: [], right_images: [] },
  });
  // Upload Function
  const uploadBinary = async (url, data, successMessage) => {
    if (data?.banner_video) {
      setLoading1(true);
    } else if (data?.left_video) {
      setLoading2(true);
    } else if (data?.left_images) {
      setLoading3(true);
    }
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (key === 'left_images' || key === 'right_images') {
            value.forEach((file, index) => formData.append(`${key}[${index}][file]`, file));
          } else value.forEach((file) => formData.append(key, file));
        } else if (value) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading1(false);
      setLoading2(false);
      setLoading3(false);
      enqueueSnackbar(response.data.message || successMessage, { variant: 'success' });
      navigate(PATH_DASHBOARD.whatwedo.whatwedo);
    } catch (error) {
      setLoading1(false);
      setLoading2(false);
      setLoading3(false);
      enqueueSnackbar(error?.response?.data?.message || 'Error uploading files', { variant: 'error' });
    }
  };

  const handleDrop = useCallback((acceptedFiles, setValue, fieldName) => {
    setValue(fieldName, acceptedFiles);
  }, []);

  // const handleRemoveFile = (index, setValue, fieldName, files) => {
  //   const updatedFiles = files.filter((_, i) => i !== index);
  //   setValue(fieldName, updatedFiles);
  // };

  // Submission Handlers
  const handleBannerSubmit = (data) => {
    uploadBinary('/what-we-do', { banner_video: data.banner_video }, 'Banner video uploaded successfully');
    bannerMethods.reset();
  };

  const handleVideoSubmit = (data) => {
    uploadBinary(
      '/what-we-do',
      { left_video: data.left_video, right_video: data.right_video },
      'Videos uploaded successfully'
    );
    videoMethods.reset();
  };

  const handleImagesSubmit = (data) => {
    uploadBinary(
      '/what-we-do',
      { left_images: data.left_images, right_images: data.right_images },
      'Images uploaded successfully'
    );
    imagesMethods.reset();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <HeaderBreadcrumbs heading="Add What We Do" links={[{ name: 'Dashboard', href: '#' }]} />
      <Stack spacing={4}>
        {/* Banner Video Section */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Upload Banner Video
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormProvider methods={bannerMethods} onSubmit={bannerMethods.handleSubmit(handleBannerSubmit)}>
            <RHFUploadAvatar
              name="banner_video"
              accept="video/*"
              maxSize={52428800}
              onDrop={(files) => handleDrop(files, bannerMethods.setValue, 'banner_video')}
              helperText={
                <Typography variant="caption" color="text.secondary">
                  Allowed *.mp4, *.mov, max size of {fData(52428800)}
                </Typography>
              }
            />
            {bannerMethods.watch('banner_video') && (
              <Box mt={2}>
                <video controls style={{ maxWidth: '100%', borderRadius: '8px' }}>
                  <source src={URL.createObjectURL(bannerMethods.watch('banner_video')[0])} type="video/mp4" />
                  <track kind="captions" srcLang="en" label="English captions" />
                </video>
              </Box>
            )}
            <LoadingButton type="submit" loading={loading1} variant="contained" sx={{ mt: 2 }}>
              Upload Banner Video
            </LoadingButton>
          </FormProvider>
        </Card>

        {/* Videos Section */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Upload Left & Right Videos
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormProvider methods={videoMethods} onSubmit={videoMethods.handleSubmit(handleVideoSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Left Video</Typography>
                <RHFUploadAvatar
                  name="left_video"
                  accept="video/*"
                  maxSize={52428800}
                  onDrop={(files) => handleDrop(files, videoMethods.setValue, 'left_video')}
                />
                {videoMethods.watch('left_video') && (
                  <Box mt={2}>
                    <video controls style={{ maxWidth: '100%', borderRadius: '8px' }}>
                      <source src={URL.createObjectURL(videoMethods.watch('left_video')[0])} type="video/mp4" />
                      <track kind="captions" srcLang="en" label="English captions" />
                    </video>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Right Video</Typography>
                <RHFUploadAvatar
                  name="right_video"
                  accept="video/*"
                  maxSize={52428800}
                  onDrop={(files) => handleDrop(files, videoMethods.setValue, 'right_video')}
                />
                {videoMethods.watch('right_video') && (
                  <Box mt={2}>
                    <video controls style={{ maxWidth: '100%', borderRadius: '8px' }}>
                      <source src={URL.createObjectURL(videoMethods.watch('right_video')[0])} type="video/mp4" />
                      <track kind="captions" srcLang="en" label="English captions" />
                    </video>
                  </Box>
                )}
              </Grid>
            </Grid>
            <LoadingButton type="submit" loading={loading2} variant="contained" sx={{ mt: 2 }}>
              Upload Videos
            </LoadingButton>
          </FormProvider>
        </Card>

        {/* Images Section */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Upload Images
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <FormProvider methods={imagesMethods} onSubmit={imagesMethods.handleSubmit(handleImagesSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Left Images</Typography>
                <RHFUploadAvatar
                  name="left_images"
                  accept="image/*"
                  maxSize={5242880}
                  multiple
                  onDrop={(files) => handleDrop(files, imagesMethods.setValue, 'left_images')}
                />

                {imagesMethods.watch('left_images').length > 0 &&
                  imagesMethods?.watch('left_images')?.map((leftImage) => (
                    <Box key={leftImage} mt={2}>
                      <img
                        alt={leftImage}
                        style={{ maxWidth: '100%', borderRadius: '8px' }}
                        src={URL.createObjectURL(leftImage)}
                      />
                    </Box>
                  ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Right Images</Typography>
                <RHFUploadAvatar
                  name="right_images"
                  accept="image/*"
                  maxSize={5242880}
                  multiple
                  onDrop={(files) => handleDrop(files, imagesMethods.setValue, 'right_images')}
                />
                {imagesMethods.watch('right_images').length > 0 &&
                  imagesMethods?.watch('right_images')?.map((rightImage) => (
                    <Box key={rightImage} mt={2}>
                      <img
                        alt={rightImage}
                        style={{ maxWidth: '100%', borderRadius: '8px' }}
                        src={URL.createObjectURL(rightImage)}
                      />
                    </Box>
                  ))}
              </Grid>
            </Grid>
            <LoadingButton type="submit" loading={loading3} variant="contained" sx={{ mt: 2 }}>
              Upload Images
            </LoadingButton>
          </FormProvider>
        </Card>
      </Stack>
    </Container>
  );
}
