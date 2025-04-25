/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container, } from '@mui/material';
// routes
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
  RHFDescription,
} from '../../../components/hook-form';




export default function EditDom() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { raritys } = useSelector((state) => state.rarity);

  // const currentrarity = raritys.find((rarity) =>rarity.id === +(id))
  const NewRaritySchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    // description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title:  '',
      // description:    '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewRaritySchema),
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
    console.log(formValues)
    try {
      const rarity=new FormData();
      rarity.append('name',formValues?.title)
      rarity.append('_method','PUT')
      // rarity.append('description',formValues?.description)
   
   await axios.post(`/api/admin/button/${id}`,rarity)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar(response?.data?.message);
         navigate(PATH_DASHBOARD.rarity.rarity);
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };
  const handlePasswordKeyPress = (event) => {
    if (event.key === 'Enter') {
      OnSubmit(methods.getValues()); // Call the onSubmit function
    }
  };

  return (
    <Container maxWidth='sm'>
    <HeaderBreadcrumbs
      heading="Edit Name"
      links={[
        { name: '', href: '' },]}/>
    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Name" InputLabelProps={{ shrink: true }} focused/>
              {/* <div>
                <RHFDescription name="description" label="description" onKeyPress={handlePasswordKeyPress}  multiline InputLabelProps={{ shrink: true }}
                    rows={6} focused/>
              </div> */}
              <Grid item xs={4} md={4}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              
            Update
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
