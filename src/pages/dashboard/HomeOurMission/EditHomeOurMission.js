/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import React, { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Grid, Stack, Container, Box, Typography, Divider, Button } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { fData } from '../../../utils/formatNumber';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFDescription, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

export default function EditHomeOurMission() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { slots } = useSelector((state) => state.slot);
  const currentslot = slots.find((slot) => slot.id === +id);
  console.log(currentslot, 'currentslot');
  const slotSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().nullable().required('title is required'),
        description: Yup.string().nullable().required('description is required'),
      })
    ),
    image: Yup.mixed().required('section image is required'),
  });

  const methods = useForm({
    resolver: yupResolver(slotSchema),
    defaultValues: {
      items: [
        {
          title: '',
          description: '',
        },
      ],
      image: currentslot?.image || '',
    },
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const provider = new URLSearchParams();
      provider.append('date', data?.createDate);
      provider.append('start_time', `${data?.start_time}`);
      provider.append('end_time', `${data?.end_time}`);

      await axios.put(`admin/home-our-mission/${id}`, provider).then((response) => {
        if (response?.data?.status === true) {
          enqueueSnackbar('Home our mission Updated Successfully');
          reset();
          // navigate(PATH_DASHBOARD.spell.spell)
          navigate(PATH_DASHBOARD.homeourmission.homeourmission);
        }
      });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
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
      <HeaderBreadcrumbs heading="Edit Slot" links={[{ name: '', href: '' }]} />
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
                  <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                    {fields.map((item, index) => (
                      <Stack spacing={1.5} key={item.id}>
                        <Box
                          sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                          }}
                        >
                          <RHFTextField
                            label="Title"
                            name={`items[${index}].title`}
                            type="text"
                            onChange={(e) => {
                              setValue(`items[${index}].title`, e.target.value);
                            }}
                            sx={{ gridColumn: { sm: 'span 2' } }}
                            InputLabelProps={{ shrink: true }}
                          />
                          <RHFDescription
                            label="Description"
                            type="text"
                            name={`items[${index}].description`}
                            onChange={(e) => {
                              setValue(`items[${index}].description`, e.target.value);
                            }}
                            sx={{ gridColumn: { sm: 'span 2' } }}
                            multiline
                            rows={4}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        {index !==0 &&<Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="eva:trash-2-outline" />}
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </Button>
                        }
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                   <Button
                    size="small"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleAdd}
                    sx={{ flexShrink: 0 }}
                  >
                    Add home our mission
                  </Button>

                  <Stack alignItems="flex-center" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" size="small" loading={isSubmitting}>
                      Submit
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </Container>
  );
}
