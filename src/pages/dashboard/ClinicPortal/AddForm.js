/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Container, Box, TextField, Typography } from '@mui/material';
// routes
import { fData } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { FormProvider, RHFTextField, RHFDescription, RHFUploadAvatar } from '../../../components/hook-form';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AddForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [fileName, setfileName] = useState('')
  const [file, setfile] = useState('')

  const NewMagictypeSchema = Yup.object().shape({
   
  });

  const defaultValues = useMemo(
    () => ({
     
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
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  const OnSubmit = async (data) => {
    try {
      const clinic = new FormData();
      clinic.append('forms[0]', file);

      await axios.post("/api/clinic/forms", clinic, {
        headers: {
          Accept: "application/json"
        }
      })

        .then((response) => {
          console.log(response, 'after create clinic')
          if (response?.data?.status === true) {
            enqueueSnackbar('Forms Uploaded Successfully');
            reset();
            navigate('/dashboard/Form');
          }
        })
    } catch (error) {
      enqueueSnackbar(error?.message, {
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
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setfile(file)

    if (file) {
      setfileName(file.name);
    }

  };
  console.log(fileName, "getValues")

  return (
    <Container maxWidth="lg">
      <HeaderBreadcrumbs heading="Add Forms" links={[{ name: '', href: '' }]} />

      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12} >
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                }}
              >
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload file
                  <VisuallyHiddenInput type="file" name='files' onChange={(e) => handleFileUpload(e)} />
                </Button>
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
                      Allowed *pdf
                      <br /> {fileName}
                    </Typography>
              </Box>


              <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Create Form
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
