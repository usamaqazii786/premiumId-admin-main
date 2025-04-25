/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box, TextField } from '@mui/material';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// components
import { FormProvider } from '../../../components/hook-form';
import { AnalyticsCurrentVisits } from '../../../sections/@dashboard/general/analytics';

export default function AppointmentChart() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [ratio, setRatio] = useState('');
  const location = useLocation();

  const {
    data: { clinicName },
  } = location.state;

  const chartSchema = Yup.object().shape({
    start_date: Yup.string().required('Start date is required'),
    end_date: Yup.string().required('End date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      start_date: '',
      end_date: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(chartSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    OnSubmit();
  }, []);

  const OnSubmit = async (data) => {
    var formattedDate;
    var formattedDate1;
  if(data){
    const originalDate = new Date(data?.start_date);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    formattedDate = `${year}-${month}-${day}`;

    const originalDate1 = new Date(data?.end_date);
    const year1 = originalDate1.getFullYear();
    const month1 = String(originalDate1.getMonth() + 1).padStart(2, '0');
    const day1 = String(originalDate1.getDate()).padStart(2, '0');
    formattedDate1 = `${year1}-${month1}-${day1}`;
    console.log(formattedDate, formattedDate1);

  }
    try {
      await axios
        .get(`/api/company/ratio?clinic=${id}&from=${formattedDate || ''}&to=${formattedDate1 || ''}`)

        .then((response) => {
          if (response?.data) {
           if(response?.data?.status){
            setRatio(response?.data?.data?.[0]?.ratios);
            reset();
            enqueueSnackbar('Ratio Found Successfully');
           }
          }
          else{
            setRatio('');
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
      <HeaderBreadcrumbs heading={`Clinic name : ${clinicName}`} links={[{ name: '', href: '' }]} />

      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <Controller
                  name="start_date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="Start Date"
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

                <Controller
                  name="end_date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="End Date"
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
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Stack>
              {/* <Grid item xs={12} md={6} lg={4}> */}
              <AnalyticsCurrentVisits ratio={ratio} />
              {/* </Grid> */}
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
