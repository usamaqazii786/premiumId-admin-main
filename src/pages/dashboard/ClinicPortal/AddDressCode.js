import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box} from '@mui/material';
// routes
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

export default function AddDressCode() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewMagictypeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewMagictypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  const OnSubmit = async (data) => {
    try {
      const clinic = new FormData();
      clinic.append('dress_code', data?.name);

      await axios.post("/api/clinic/dress_code",clinic, {
        headers: {
          Accept: "application/json"
        }
      })

      .then((response)=>{
        console.log(response,'after create clinic')
        if(response?.data?.status === true){
        enqueueSnackbar('Dress Code Created Successfully');
        reset();
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
      <HeaderBreadcrumbs heading="Add DressCode" links={[{ name: '', href: '' }]} />

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
                  Create Dress Code
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
