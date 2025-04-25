/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Typography, Box,MenuItem, InputLabel } from '@mui/material';
// routes
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS for the snow theme
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFDescription, RHFUploadAvatar, RHFSelect } from '../../../components/hook-form';

export default function DynamicSectionPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { dynamicSectionPages } = useSelector((state) => state.dynamicSectionPage);
  const [value1, setValue1] = useState('');

  const handleChange1 = (content) => {
    setValue1(content || ''); // Ensure content is not undefined
  };
  const currenttag = dynamicSectionPages?.find((tag) => tag?.id === +id);
  console.log(currenttag, dynamicSectionPages, 'currenttag--->');

  const NewStudentSchema = Yup.object().shape({
    priority: Yup.string().required('Priority is required'),
    // description: Yup.string().required('Description is required'),
    section: Yup.string().required('Section is required'),
    image: Yup.mixed().required('Section image is required'),
  });

  const Url = "https://amap.dev-hi.xyz/storage/";

  useEffect(() => {
    if (currenttag) {
      setValue1(currenttag.title || '');
    }
  }, [currenttag]);

  const defaultValues = useMemo(
    () => ({
      priority: currenttag?.priority || '',
      description: currenttag?.description || '',
      section: currenttag?.section || '',
      image: currenttag?.image ? `${Url}${currenttag.image}` : currenttag?.image||'',
    }),
    [currenttag]
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

  const onSubmit = async () => {
    const formValues = getValues();
    console.log(formValues);
    try {
      const tag = new FormData();
      tag.append('title', value1);
      tag.append('description', formValues?.description);
      tag.append('section', formValues?.section);
      tag.append('image', formValues?.image);
      tag.append('priority', formValues?.priority);
      tag.append('_method', "put");
      console.log(typeof(formValues?.image),'typeof(formValues?.image')
      if(typeof(formValues?.image) !== 'string'){
        // tag.append('image','');
        tag.append('image', formValues?.image);
      }
      

      await axios.post(`/admin/dynamic-section-page/${id}`, tag).then((response) => {
        if (response?.status) {
          reset();
          enqueueSnackbar("dynamic section page updated Successfully");
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
      <HeaderBreadcrumbs heading="Edit Dynamic Section Page" links={[{ name: '', href: '' }]} />
      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                    <InputLabel>Title</InputLabel>
                    <ReactQuill theme="snow" value={value1} onChange={handleChange1} />
                  </div>
                  <RHFSelect
                    name="priority"
                    label="Select priority"
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    <MenuItem value="1st">1st</MenuItem>
                    <MenuItem value="2nd">2nd</MenuItem>
                    <MenuItem value="3rd">3rd</MenuItem>
                    <MenuItem value="4th">4th</MenuItem>
                    <MenuItem value="5th">5th</MenuItem>
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
                  <RHFDescription name="description" label="Description" multiline rows={4} InputLabelProps={{ shrink: true }} />
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