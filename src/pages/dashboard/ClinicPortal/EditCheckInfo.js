/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box } from '@mui/material';
// routes
import { useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// components
import {
  FormProvider,
  RHFDescription,
} from '../../../components/hook-form';

export default function EditCheckInfo() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { checkInfo } = useSelector((state) => state.checkInfo);

  const currentDressCode = checkInfo.find((checkInfo) => checkInfo.id === +(id))

  console.log(currentDressCode, "currentDressCode")
  const NewDressCodeSchema = Yup.object().shape({
    info: Yup.string().required('info is required'),
  });

  const defaultValues = useMemo(
    () => ({
      info: currentDressCode?.info || '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewDressCodeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    console.log(data)
    try {
      const DressCodeUpdate = new URLSearchParams();
      DressCodeUpdate.append('info', data?.info);

      await axios.put(`/api/clinic/checkin_info/${id}`, DressCodeUpdate)
        .then((response) => {
          if (response?.data?.status === true) {
            reset();
            enqueueSnackbar('Check-in Info Updated Successfully');
            navigate('/dashboard/checkinInfo');
          }
        })
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error'
      });
      console.error(error);
    }
  };


  return (
    <Container maxWidth="lg">
      <HeaderBreadcrumbs heading="Update Check In Info" links={[{ name: '', href: '' }]} />

      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12} >
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                }}
              >
                <RHFDescription
                  multiline
                  rows={4} InputLabelProps={{ shrink: true }}
                  name='info'
                />
              </Box>


              <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Update Check-In Info
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
