/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container,Box} from '@mui/material';
// routes
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// components
import {
  FormProvider,
  RHFTextField,
} from '../../../components/hook-form';

export default function EditDressCode() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { dresscode } = useSelector((state) => state.dresscode);

  const currentDressCode = dresscode.find((dresscode) =>dresscode.id === +(id))
  console.log(currentDressCode,"currentDressCode")

  const NewDressCodeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:   currentDressCode?.dress_code || '',
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
      DressCodeUpdate.append('dress_code', data?.name);

      await axios.put(`/api/clinic/dress_code/${id}`,DressCodeUpdate)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar('Dress code Updated Successfully');
        navigate('/dashboard/dresscode');
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };



  return (
    <Container maxWidth="lg">
    <HeaderBreadcrumbs heading="Update DressCode" links={[{ name: '', href: '' }]} />

    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={12} >
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
              }}
            >
              <RHFTextField name="name" label="Name" fullwidth InputLabelProps={{ shrink: true }} />
            </Box>
           

            <Stack alignItems="flex-start" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Update Dress Code
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  </Container>
  );
}
