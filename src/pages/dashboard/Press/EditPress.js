/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, MenuItem, Container, InputLabel } from '@mui/material';
// routes
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS for the snow theme
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFSelect } from '../../../components/hook-form';

export default function EditPress() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');

  const handleChange1 = (content) => {
    setValue(content || ''); // Ensure content is not undefined
  };
  const { id } = useParams();
  const { presss } = useSelector((state) => state.press);

  const currentProduct = presss.find((product) => product.id === +id);
  const NewSubSchema = Yup.object().shape({
    page: Yup.string().required('page is required'),
    description: Yup.string().required('description is required'),
  });
  useEffect(() => {
    if (currentProduct) {
      setValue(currentProduct.description || '');
    }
  }, [currentProduct]);
  const defaultValues = useMemo(
    () => ({
      page: currentProduct?.page || '',
      description: currentProduct?.description || ''
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewSubSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    try {
      const dorm = new FormData();
      dorm.append('page', data?.page);
      dorm.append('description', value);

      dorm.append('_method', 'put');

      await axios
        .post(`admin/dynamic-page/${id}`, dorm)

        .then((response) => {
          if (response?.data) {
            reset();
            enqueueSnackbar('dynamic page Updated Successfully');
            navigate(PATH_DASHBOARD.press.press);
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
    <Container maxWidth="lg">
      <HeaderBreadcrumbs heading="Edit dynamic page" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                <RHFSelect
                    name="page"
                    label="page type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    <MenuItem
                      value="culture"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                     culture
                    </MenuItem>
                    <MenuItem
                      value="educational"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      educational
                    </MenuItem>
                    <MenuItem
                      value="helping hands"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      helping hands
                    </MenuItem>
                    <MenuItem
                      value="general overview"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      general overview
                    </MenuItem>
                    <MenuItem
                      value="mission & vision statement"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      mission & vision statement
                    </MenuItem>
                  </RHFSelect>
                  <div>
                    <InputLabel>description</InputLabel>
                    <ReactQuill theme="snow" value={value} onChange={handleChange1} />
                  </div>
                  <Grid item xs={6} md={6}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Edit Subscription
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
