/* eslint-disable react-hooks/exhaustive-deps */

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo,useCallback } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card,Grid,Chip, Stack, TextField, Typography,Box, Autocomplete, Container } from '@mui/material';
import {newCardSchema,getDefaultValues} from '../AllSchema/NewCardSchema';
import { fData } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
import { useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {RHFUploadAvatar,
  FormProvider,
  RHFTextField,
  RHFSelect,
} from '../../../components/hook-form';

const TAGS_OPTION = []; 

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function AddCard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { card:{cards},product:{products}, } = useSelector((state) => state);


  const defaultValues = useMemo(() => getDefaultValues());  

  const methods = useForm({
    resolver: yupResolver(newCardSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    try {
      const character=new FormData();
      character?.append('name',data?.name)
      // card?.append('obtained',data?.obtained)
      character?.append('card_id',data?.card_id)
      character?.append('dorm_id',data?.dorm_id)
      character?.append('image',data?.image)
      data?.obtained?.map((e,i)=>character.append(`obtain[${i}]`,e))
      await axios.post("character",character)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.character.character)
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };

    const handleDrop1 = useCallback(
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
    <Container maxWidth='sm'>
    <HeaderBreadcrumbs
      heading="Add Character"
      links={[
        { name: '', href: '' },]}/>
    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Character Name" />
              <RHFSelect name="card_id" label="Select card">
              <option value='Select card'>Select card</option>
                {cards?.map((e) =>
                <option key={e?.id} value={e?.id}>
                  {e?.name}
                </option>
              )}
              </RHFSelect>
              <RHFSelect name="dorm_id" label="Select Dorm">
                    <option value='Select Dorm'>Select Dorm</option>
                      {products?.map((e) =>
                      <option key={e?.id} value={e?.id}>
                        {e?.name}
                      </option>
                    )}
              </RHFSelect>

             <div>
             <Controller
             name='obtained'
             control={control}
             render={({ field }) => (
               <Autocomplete
                 {...field}
                 multiple
                 freeSolo
                 onChange={(event, newValue) => {
                   field.onChange(newValue);
                 }}
                 options={TAGS_OPTION}
                 renderTags={(value, getTagProps) =>
                   value.map((option, index) => (
                     <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                   ))
                 }
                 renderInput={(params) => <TextField label="Enter Obtained Tag" {...params} />}
               />
             )}
             />
             <LabelStyle>Press enter to add new tag</LabelStyle>
            </div>

            <Grid item xs={12} md={12}>   
            <Stack spacing={3}>
            <Card sx={{ p: 3 }}>   
    
        <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
       Recent Picture
      </Typography>
          <RHFUploadAvatar
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop1}
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
        </Card>             
    </Stack>
             </Grid>
       

              <Grid item xs={4} md={4}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Create Character
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

