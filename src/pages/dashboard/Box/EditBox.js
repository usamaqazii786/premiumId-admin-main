/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container,MenuItem } from '@mui/material';
// routes
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFDescription, RHFSelect } from '../../../components/hook-form';

export default function EditDom() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { boxs } = useSelector((state) => state?.box);

  const currenttag = boxs?.find((tag) => tag?.id === +id);
  console.log(currenttag,boxs,'currenttag--->');

  const NewStudentSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    description: Yup.string().required('description is required'),
    section: Yup.string().required('section is required')

  });
  const defaultValues = useMemo(
    () => ({
      title: currenttag?.title || '',
      description: currenttag?.description || '',
      section: currenttag?.section || ''
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async () => {
    const formValues = getValues();
    console.log(formValues);
    try {
      const tag = new FormData();
      tag.append('title', formValues?.title);
      tag.append('description', formValues?.description);
      tag.append('section', formValues?.section);
      tag.append('_method',"put");

      await axios
        .post(`admin/dynamic-box-page/${id}`, tag)

        .then((response) => {
          console.log(response?.data?.message,response,'message--->');
          if (response?.status) {
            reset();
            enqueueSnackbar("Dynamic Box Edit Successfully");
            navigate(PATH_DASHBOARD.box.box);
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Membership Section" links={[{ name: '', href: '' }]} />
      <Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="title" label="Title" InputLabelProps={{ shrink: true }} />               
                  <RHFSelect
                  name="section"
                  label="Select Section"
                  size="large"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
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
                    value="goal objective"
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    goal objective
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
                      Edit Box
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
