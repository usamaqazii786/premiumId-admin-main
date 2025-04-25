/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */

// <Container maxWidth='md'>

// <HeaderBreadcrumbs
//   heading="Add Character"
//   links={[
//     { name: '', href: '' },]}/>

// <Card>
// <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
//   <Grid container spacing={1}>
//     <Grid item xs={12} md={12}>
//       <Card sx={{ p: 3 }}>
//         <Stack spacing={3}>
//         <RHFTextField name="name" label="Name" />
//         <RHFSelect name="dorm" label="Select ">
//         <option value='Select dorm'>Select Dormitory</option>
//           {products?.map((e) =>
//           <option key={e?.id} value={e?.id}>
//             {e?.name}
//           </option>
//         )}
//         </RHFSelect>
//         <RHFSelect name="rarity" label="Select Rarity">
//         <option>Select Rarity</option>
//           {raritys?.map((e) =>
//           <option key={e?.id} value={e?.id}>
//             {e?.name}
//           </option>
//         )}
//         </RHFSelect>
//         <RHFSelect name="magictype" label="Select Dormitory">
//         <option >Select Magic Type</option>
//           {magictypes?.map((e) =>
//           <option key={e?.id} value={e?.id}>
//             {e?.name}
//           </option>
//         )}
//         </RHFSelect>

//       <Grid container spacing={1}>
//         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <RHFTextField name="hpFormula" label="HP Formula" />
//           <RHFTextField name="hpModifier" label="HP Modifier" />
//           </Stack>
//         </Grid>
//         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <RHFTextField name="atkFormula" label="Attack Formula" />
//           <RHFTextField name="atkModifier" label="Attack Modifier" />
//           </Stack>
//         </Grid>
//       </Grid>

//       <LabelStyle>Select Spell</LabelStyle>
//       <Controller
//       name='no_spell'
//                       control={control}
//                       render={({ field }) => (
//                         <Select
//                         {...field}
//                         components={animatedComponents}
//                         isMulti
//                         options={sepllsOptions}
//                         onChange={(e)=>{
//                           field.onChange(e)
//                         }}
//                         styles={customStyles}
//                       />
//       )}
//       />

//      {methods.formState.errors.no_spell && (
//      <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_spell.message}</LabelStyle>
//      )}
//       <LabelStyle>Select Tag</LabelStyle>
//       <Controller
//       name='no_tag'
//                       control={control}
//                       render={({ field }) => (
//                         <Select
//                         {...field}
//                         components={animatedComponents}
//                         isMulti
//                         // value={totalSpell}
//                         options={options}
//                         // {...register('no_spell', { validate: value => value.length <= 3 })}
//                         onChange={(e)=>{
//                           field.onChange(e)
//                         }}
//                         styles={customStyles}
//                       />
//       )}
//       />

//       {methods.formState.errors.no_tag && (
//       <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_tag.message}</LabelStyle>
//       )}

//       <RHFTextField value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many State formula do you want to add to this Character?" />

//       {Array.from({ length: numFields }).map((_, i) => (

//       <Grid container spacing={1}>
//         <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <RHFTextField name={`stateFormula[${i}].level`} label="Level" />
//           </Stack>
//         </Grid>
//         <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <RHFTextField name={`stateFormula[${i}].hp`} label="HP" />
//           </Stack>
//         </Grid>
//         <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" />
//           </Stack>
//         </Grid>

//       </Grid>
//       ))}

//       <Grid container spacing={1}>
//         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <div>
//       <LabelStyle>CG Thumbnail</LabelStyle>
//       <RHFUploadSingleFile name='cg_image' accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop1(acceptedFiles)}/>
//       </div>
//           </Stack>
//         </Grid>
//         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//           <Stack spacing={2}>
//           <div>
//           <LabelStyle>GROOVY Thumbnail</LabelStyle>
//           <RHFUploadSingleFile name='groovy_image' accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}/>
//           </div>
//           </Stack>
//         </Grid>
//       </Grid>

//       <Grid item xs={4} md={4}>
//           <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//           Create Character
//         </LoadingButton>
//       </Grid>

//         </Stack>
//       </Card>
//     </Grid>

//   </Grid>
// </FormProvider>
// </Card>
// </Container>

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Container } from '@mui/material';
import axios from '../../../utils/axios';
import { fData } from '../../../utils/formatNumber';
import { useSelector } from '../../../redux/store';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { CardSchema } from '../AllSchema/CardSchema';
import { FormProvider, RHFTextField, RHFSelect, RHFUploadAvatar } from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.error,
  marginBottom: theme.spacing(0),
}));

export default function AddCharacter() {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      paddingBottom: '2px',
      paddingTop: '2px',
      backgroundColor: '#212B36', // Change the background color
      borderColor: state.isFocused ? '#00AB55' : 'grey', // Change the border color
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#161C24' : '#212B36', // Change option background color when focused
      color: 'white',
    }),
  };

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [numFields, setNumFields] = useState();

  const {
    magictype: { magictypes },
    rarity: { raritys },
    tag: { tags },
    character: { characters },
    spell: { spells },
  } = useSelector((state) => state);
  const options = tags?.map((e) => ({ value: e?.id, label: e?.name }));
  const sepllsOptions = spells?.map((e) => ({ value: e?.id, label: `${e?.name} ${e?.slug}` }));
  const buddysOptions = characters?.map((e) => ({ value: e?.id, label: e?.name }));

  console.log(options, sepllsOptions);
  const defaultValues = useMemo(
    () => ({
      avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
      name: '',
      hpFormula: '',
      atkFormula: '',
      hpModifier: '',
      atkModifier: '',
      dorm: '',
      magictype: '',
      cg_image: null,
      groovy_image: null,
      rarity: '',
      no_spell: [],
      no_tag: [],
      no_buddy: [],
      stateFormula: Array.from({ length: numFields }).fill({
        level: '',
        hp: '',
        atk: '',
      }),
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(CardSchema),
    defaultValues,
  });

  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const OnSubmit = async (data) => {
    console.log(data);
    try {
      const card = new FormData();
      card.append('name', data?.name);
      card.append('rarity_id', data?.rarity);
      card.append('magic_type_id', data?.magictype);
      card.append('hp_formula', data?.hpFormula);
      card.append('atk_formula', data?.atkFormula);
      card.append('g_atk_modifier', data?.atkModifier);
      card.append('g_hp_modifier', data?.hpModifier);
      card.append('cg_thumbnail', data?.cg_image);
      card.append('groovy_cg_thumbnail', data?.groovy_image);
      data?.no_spell?.map((e, i) => {
        card.append(`spell_id_${i + 1}`, e?.value);
        return null;
      });
      data?.no_tag?.map((e, i) => {
        card.append(`tag[${i}][tag_id]`, e?.value);
        return null;
      });
      data?.no_buddy?.map((e, i) => {
        card.append(`buddy_id_${i + 1}`, e?.value);
        return null;
      });
      data?.stateFormula?.map((e, i) => {
        card.append(`stat_formula[${i}][level]`, e?.level);
        card.append(`stat_formula[${i}][hp_g]`, e?.hp);
        card.append(`stat_formula[${i}][atk_g]`, e?.atk);
        return null;
      });

      await axios
        .post('card', card)

        .then((response) => {
          if (response?.data?.status === true) {
            enqueueSnackbar(response?.data?.message);
            reset();
            navigate(PATH_DASHBOARD.card.card);
          }
        });
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
      console.error(error);
    }
  };

  useEffect(() => {
    methods.setValue(
      'stateFormula',
      Array.from({ length: numFields }).fill({
        level: '',
        hp: '',
        atk: '',
      })
    );
  }, [numFields, methods]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'groovy_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const handleDrop1 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cg_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading="Add Card" links={[{ name: '', href: '' }]} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="name" label="Full Name" />
                <Grid item xs={12} md={12}>
                  <Controller
                    name="no_buddy"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        components={animatedComponents}
                        isMulti
                        placeholder="Select Buddy"
                        options={buddysOptions}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        styles={customStyles}
                      />
                    )}
                  />
                  {methods.formState.errors.no_buddy && (
                    <LabelStyle style={{ fontSize: '12px', color: 'red', fontWeight: 300 }}>
                      {methods.formState.errors.no_buddy.message}
                    </LabelStyle>
                  )}
                </Grid>

                <RHFSelect name="rarity" label="Select Rarity" placeholder="Rarity">
                  <option value="" />
                  {raritys.map((option) => (
                    <option key={option?.id} value={option?.id}>
                      {option?.name}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="magictype" label="Select Magictype" placeholder="Magictype">
                  <option value="" />
                  {magictypes.map((option) => (
                    <option key={option?.id} value={option?.id}>
                      {option?.name}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField name="hpFormula" label="HP Formula" />
                <RHFTextField name="atkFormula" label="Attack Formula" />
                <RHFTextField name="hpModifier" label="HP Modifier" />
                <RHFTextField name="atkModifier" label="Attack Modifier" />
                <Grid item xs={12} md={12}>
                  <Controller
                    name="no_tag"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        components={animatedComponents}
                        isMulti
                        placeholder="Select Tag"
                        options={options}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        styles={customStyles}
                      />
                    )}
                  />
                  {methods.formState.errors.no_tag && (
                    <LabelStyle style={{ fontSize: '12px', color: 'red', fontWeight: 300 }}>
                      {methods.formState.errors.no_tag.message}
                    </LabelStyle>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <Controller
                    name="no_spell"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        components={animatedComponents}
                        isMulti
                        placeholder="Select Spell"
                        options={sepllsOptions}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        styles={customStyles}
                      />
                    )}
                  />
                  {methods.formState.errors.no_spell && (
                    <LabelStyle style={{ fontSize: '12px', color: 'red', fontWeight: 300 }}>
                      {methods.formState.errors.no_spell.message}
                    </LabelStyle>
                  )}
                </Grid>
              </Box>
              <Grid item xs={12} md={12} sx={{ pt: 2 }}>
                <RHFTextField
                  value={numFields}
                  onChange={(e) => setNumFields(e.target.value)}
                  label="How many State formula do you want to add to this Card?"
                />
              </Grid>
              {Array.from({ length: numFields }).map((_, i) => (
                <Grid container spacing={1} sx={{ pt: 2 }}>
                  <Grid item xs={4} md={4} sx={{ ml: 0 }}>
                    <Stack spacing={2}>
                      <RHFTextField name={`stateFormula[${i}].level`} label="Level" />
                    </Stack>
                  </Grid>
                  <Grid item xs={4} md={4} sx={{ ml: 0 }}>
                    <Stack spacing={2}>
                      <RHFTextField name={`stateFormula[${i}].hp`} label="HP" />
                    </Stack>
                  </Grid>
                  <Grid item xs={4} md={4} sx={{ ml: 0 }}>
                    <Stack spacing={2}>
                      <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" />
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ py: 6, px: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    CG Thumbnail
                  </Typography>
                  <RHFUploadAvatar
                    name="cg_image"
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
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Groovy Thumbnail
                  </Typography>
                  <RHFUploadAvatar
                    name="groovy_image"
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
              </Card>

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                Create Card
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}
