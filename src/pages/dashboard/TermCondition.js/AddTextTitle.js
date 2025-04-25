/* eslint-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  RHFEditor,
  RHFDescription,
} from '../../../components/hook-form';




export default function TextTitle() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { raritys } = useSelector((state) => state.rarity);

  // const currentrarity = raritys.find((rarity) =>rarity.id === +(id))
  const NewRaritySchema = Yup.object().shape({
    // title: Yup.string().required('Title is required'),
    // header_title: Yup.string().required('Header Title is required'),
    // header_link: Yup.string().required('Header Link is required'),
  });
const {state}= useLocation()

  const defaultValues = useMemo(
    () => ({
      title: state?.title ||'',
      header_title: state?.header_title || '',
      header_link:  state?.header_link ||'',
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
      const rarity= new FormData();
      rarity.append('title',formValues?.title)
      rarity.append('header_link',formValues?.header_link)
      rarity.append('header_title',formValues?.header_title)
   
   await axios.post(`/api/admin/videotitle/update`,rarity)
      
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
      heading="Edit Video Title"
      links={[
        { name: '', href: '' },]}/>
    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* <RHFTextField name="title" label="Title" InputLabelProps={{ shrink: true }} focused/> */}
              <RHFTextField name="header_title" label="Header Title" InputLabelProps={{ shrink: true }} focused/>
              <RHFTextField name="header_link" label="Header Link" InputLabelProps={{ shrink: true }} focused/>
              <RHFEditor name='title'/>
              {/* <div>
                <RHFDescription name="description" label="description" onKeyPress={handlePasswordKeyPress}  multiline InputLabelProps={{ shrink: true }}
                    rows={6} focused/>
              </div> */}
              <Grid item xs={4} md={4}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              
            Edit
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
