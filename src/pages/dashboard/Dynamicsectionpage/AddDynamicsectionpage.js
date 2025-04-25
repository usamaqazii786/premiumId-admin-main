import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Typography, Box, MenuItem, InputLabel } from '@mui/material';
// routes
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS for the snow theme
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFDescription, RHFUploadAvatar, RHFSelect } from '../../../components/hook-form';

export default function Dynamicsectionpage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [value1, setValue1] = useState('');

  const handleChange1 = (content) => {
    setValue1(content || ''); // Ensure content is not undefined
  };
  const NewStudentSchema = Yup.object().shape({
    section: Yup.string().required('section is required'),
    // description: Yup.string().required('description is required'),
    image: Yup.mixed().required('section image is required'),
    priority: Yup.mixed().required('priority is required'),
  });

  const defaultValues = useMemo(
    () => ({
      description: '',
      section: '',
      priority: '',
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
      tag.append('title', value1);
      tag.append('description', formValues?.description);
      tag.append('section', formValues?.section);
      tag.append('image', formValues?.image);
      tag.append('priority', formValues?.priority);

      await axios
        .post('admin/dynamic-section-page', tag)

        .then((response) => {
          console.log(response?.status,'response?.status--->');
          if (response?.status) {
            enqueueSnackbar('dynamic section page Created Successfully');
            reset();
            navigate(PATH_DASHBOARD.dynamicsectionpage.dynamicsectionpage);
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
      <HeaderBreadcrumbs heading="Add Dynamic Section Page" links={[{ name: '', href: '' }]} />
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
                  <div>
                    <InputLabel>title</InputLabel>
                    <ReactQuill theme="snow" value={value1} onChange={handleChange1} />
                  </div>
                  <RHFSelect
                  name="priority"
                  label="Select priority"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  <MenuItem
                    value="1st"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    1st
                  </MenuItem>
                  <MenuItem
                    value="2nd"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    2nd
                  </MenuItem>
                  <MenuItem
                    value="3rd"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    3rd
                  </MenuItem>
                  <MenuItem
                    value="4th"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    4th
                  </MenuItem>
                  <MenuItem
                    value="5th"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    5th
                  </MenuItem>
                </RHFSelect>
                <RHFSelect
                  name="section"
                  label="Select section"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  <MenuItem
                    value="home"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    home
                  </MenuItem>
                  <MenuItem
                    value="about us"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    about us
                  </MenuItem>
                  <MenuItem
                    value="press"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    press
                  </MenuItem>
                  <MenuItem
                    value="member ally"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    member ally
                  </MenuItem>
                </RHFSelect>
                <RHFDescription
                    name="description"
                    label="description"
                    multiline
                    rows={4}
                    InputLabelProps={{ shrink: true }}
                  />
                   
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
