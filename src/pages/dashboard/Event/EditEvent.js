/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import DatePicker from '@mui/lab/DatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Grid, Stack, Container, TextField, Box } from '@mui/material';
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFDescription } from '../../../components/hook-form';

export default function EditSpell() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { events } = useSelector((state) => state.event);
  const currentEvent = events.find((slot) => slot.id === +id);
  console.log(currentEvent, 'currentEvent');

  const EventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    event_date: Yup.string().nullable().required('Event Date is required'),
    start_time: Yup.string().required('Start time is required'),
    end_time: Yup.string().required('End time is required'),
    location: Yup.string().required('Location is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentEvent?.title || '',
      start_time: currentEvent?.start_time || '',
      end_time: currentEvent?.end_time || '',
      event_date: currentEvent?.event_date || '',
      location: currentEvent?.location || '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const originalDate = new Date(data?.event_date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(data);
    try {
      const Event = new URLSearchParams();
      Event.append('title', data.title);
      Event.append('event_date', formattedDate);
      Event.append('start_time', data.start_time);
      Event.append('end_time', data.end_time);
      Event.append('location', data.location);

      await axios.put(`admin/event/${id}`, Event).then((response) => {
        if (response?.data) {
          enqueueSnackbar('Event Updated Successfully');
          reset();
          // navigate(PATH_DASHBOARD.spell.spell)
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
      <HeaderBreadcrumbs heading="Edit Event" links={[{ name: '', href: '' }]} />
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
                      name={'start_time'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          label="Start Time"
                          type="time"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          InputLabelProps={{ shrink: true }}
                          sx={{ gridColumn: { sm: 'span 1' } }}
                        />
                      )}
                    />
                    <Controller
                      name={'end_time'}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          label="End Time"
                          type="time"
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          InputLabelProps={{ shrink: true }}
                          sx={{ gridColumn: { sm: 'span 1' } }}
                        />
                      )}
                    />
                  </Box>
                  <RHFDescription
                    name="location"
                    label="Location"
                    multiline
                    rows={4}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Add Slot
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
