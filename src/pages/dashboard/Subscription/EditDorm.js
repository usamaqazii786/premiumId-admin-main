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
import { FormProvider, RHFTextField, RHFDescription, RHFSelect } from '../../../components/hook-form';

export default function EditDom() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const handleChange1 = (content) => {
    setValue(content || ''); // Ensure content is not undefined
  };

  const handleChange2 = (content) => {
    setValue2(content || ''); // Ensure content is not undefined
  };
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);

  const currentProduct = products.find((product) => product.id === +id);
  const NewSubSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    period: Yup.string().required('Period is required'),
    status: Yup.string().required('Subscription type  is required'),
    duration: Yup.number()
      .transform((value, originalValue) => {
        const parsedValue = parseFloat(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .typeError('Duration must be a number')
      .test('is-number', 'Duration must be numeric value', (value) => !isNaN(value))
      .required('Duration is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .transform((value, originalValue) => {
        const parsedValue = parseFloat(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .typeError('Price must be a number')
      .required('Price is required'),
  });
  useEffect(() => {
    if (currentProduct) {
      setValue(currentProduct.benefit || '');
      setValue2(currentProduct.expectation || '');
    }
  }, [currentProduct]);
  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      period: currentProduct?.period || '',
      duration: currentProduct?.duration || '',
      price: currentProduct?.price || '',
      status: currentProduct?.status || '',
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
      dorm.append('name', data?.name);
      dorm.append('description', data?.description);
      dorm.append('duration', data?.duration);
      dorm.append('period', data?.period);
      dorm.append('price', data?.price);
      dorm.append('status', data?.status);
      dorm.append('benefit', value);
      dorm.append('expectation', value2);

      dorm.append('_method', 'put');

      await axios
        .post(`admin/plans/${id}`, dorm)

        .then((response) => {
          if (response?.data) {
            reset();
            enqueueSnackbar('Subscription Updated Successfully');
            navigate(PATH_DASHBOARD.dorm.dorm);
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      OnSubmit(methods.getValues()); // Call the onSubmit function
    }
  };

  const typeOption = ['days', 'months', 'years'];

  return (
    <Container maxWidth="sm">
      <HeaderBreadcrumbs heading="Edit Subscription" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="name" label="name" />
                  <RHFSelect
                    name="period"
                    label="Period type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    {typeOption.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        sx={{
                          mx: 1,
                          my: 0.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize',
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                  <RHFTextField name="duration" label="Duration" />

                  <div>
                    <RHFDescription
                      name="description"
                      label="Description"
                      onKeyPress={handlePasswordKeyPress}
                      multiline
                      rows={4}
                    />
                  </div>
                  <div>
                    <InputLabel>Benefit</InputLabel>
                    <ReactQuill theme="snow" value={value} onChange={handleChange1} />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <InputLabel>Expectation</InputLabel>
                    <ReactQuill theme="snow" value={value2} onChange={handleChange2} />
                  </div>
                  <RHFTextField name="price" label="Price" />

                  <RHFSelect
                    name="status"
                    label="Subscrption type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    <MenuItem
                      value="non member ally"
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      non Member Ally
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
                      Member Ally
                    </MenuItem>
                  </RHFSelect>
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
