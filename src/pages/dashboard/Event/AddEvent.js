/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-key */
import * as Yup from 'yup';
import React, {  useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import DatePicker from '@mui/lab/DatePicker';
import { Card, Grid, Stack, Container, TextField, Box  } from '@mui/material';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField,RHFDescription } from '../../../components/hook-form';

export default function AddTag() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewEventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    event_date: Yup.string().nullable().required('Event Date is required'),
    start_time: Yup.string().required('Start time is required'),
    end_time: Yup.string().required('End time is required'),
    location: Yup.string().required('Location is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: '',
      event_date: null,
      start_time: '',
      end_time: '',
      location: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewEventSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data,'event')
    const originalDate = new Date(data?.event_date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const Event = new FormData();
      Event.append('title', data.title);
      Event.append('event_date', formattedDate);
      Event.append('start_time', data.start_time);
      Event.append('end_time', data.end_time);
      Event.append('location', data.location);

      await axios.post(`admin/event`, Event).then((response) => {
        if(response?.data){
          reset();
          enqueueSnackbar('Event Created Successfully');
          navigate(PATH_DASHBOARD.event.event);
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
      <HeaderBreadcrumbs heading="Create Event" links={[{ name: '', href: '' }]} />
      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                <RHFTextField name="title" label="Title" InputLabelProps={{ shrink: true }} />
                  <Controller
                    name="event_date"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label="Event Date"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                 <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                  >
                    <Controller
                      name="start_time"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          label="Start Time"
                          type="time"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                    <Controller
                      name="end_time"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          label="End Time"
                          type="time"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    />
                  </Box>
                   <RHFDescription name="location" label="Location" 
                      multiline
                      rows={4}
                      InputLabelProps={{ shrink: true }}/>


                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Add Event
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
