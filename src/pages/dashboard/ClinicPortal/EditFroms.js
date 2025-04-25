/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// form
import { useForm,  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card,  Grid, Stack,   Container,Box,Typography } from '@mui/material';
// routes
import { useSelector} from '../../../redux/store';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
} from '../../../components/hook-form';

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

export default function EditForms() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { registrationForm } = useSelector((state) => state.registrationForm);
  const [fileName, setfileName] = useState('')

  const currentDressCode = registrationForm.find((registrationForm) =>registrationForm.id === +(id))

  const NewDressCodeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:   registrationForm?.name || '',
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
      DressCodeUpdate.append('name', data?.name);

      await axios.put(`/api/company/clinics/${id}`,DressCodeUpdate)
      
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file, "file")

    if (file) {
      setfileName(file.name);
    }

  };


  return (
    <Container maxWidth="lg">
    <HeaderBreadcrumbs heading="Update Forms" links={[{ name: '', href: '' }]} />

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
                Update Forms
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  </Container>
  );
}
