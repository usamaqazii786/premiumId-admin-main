import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container , Box, Typography} from '@mui/material';
// routes
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { fData } from '../../../utils/formatNumber';


// components
import { FormProvider, RHFTextField,RHFUploadAvatar } from '../../../components/hook-form';

export default function AddElement() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewCompanySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string()
    .required("Password is Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
    image: Yup.mixed().required('Company Thumbnail is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
    }),
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewCompanySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    try {
      const subAdmin=new FormData();
      subAdmin.append('name',data?.name)
      subAdmin.append('email',data?.email)
      subAdmin.append('password',data?.password)
      subAdmin.append('image',data?.image)

      await axios.post("admin/admins",subAdmin)

      .then((response)=>{
        console.log(response,'after create sub admin')
        if(response?.data){
        enqueueSnackbar('Sub Admin Created Successfully');
        
        reset();
        navigate(PATH_DASHBOARD.element.element);
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{
        variant: 'error'
      });
      console.error(error);
    }
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
      <HeaderBreadcrumbs heading="Add Sub Admin" links={[{ name: '', href: '' }]} />

      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
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
                  <RHFTextField name="name" label="Name" InputLabelProps={{ shrink: true }} />
                  <RHFTextField name="email" label="Email" InputLabelProps={{ shrink: true }} />
             

                
                  <RHFTextField name="password" label="Password" InputLabelProps={{ shrink: true }} />

                  <Grid item xs={4} md={4}>
                    <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                      Create 
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
