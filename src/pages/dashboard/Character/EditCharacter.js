/* eslint-disable react-hooks/exhaustive-deps */
// import * as Yup from 'yup';
// import { useSnackbar } from 'notistack';
// import {useState,useEffect,useCallback,useMemo } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { LoadingButton } from '@mui/lab';
// import { Box, Card, Grid, Stack, Switch, Typography,Container, FormControlLabel } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { getTags} from '../../../redux/slices/tag';
// import { getRaritys} from '../../../redux/slices/rarity';
// import { getSpells} from '../../../redux/slices/spell';
// import { getProducts} from '../../../redux/slices/product';
// import { getmagictypes} from '../../../redux/slices/magictype';
// import { useDispatch, useSelector } from '../../../redux/store';
// import { fData } from '../../../utils/formatNumber';
// import {newCardSchema,getDefaultValues} from '../AllSchema/NewCardSchema';
// import axios from '../../../utils/axios';
// import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// import { PATH_DASHBOARD } from '../../../routes/paths';
// import BaseUrl from '../../../BaseUrl/BaseUrl'
// // components
// import {
//   FormProvider,
//   RHFSwitch,
//   RHFTextField,
//   RHFUploadSingleFile,
//   RHFSelect,
//   RHFUploadAvatar
// } from '../../../components/hook-form';

// const LabelStyle = styled(Typography)(({ theme }) => ({
//   ...theme.typography.subtitle2,
//   color: theme.palette.text.error,
//   marginBottom: theme.spacing(0)
// }));


// export default function EditCharacter() {
//   const accessToken=localStorage.getItem('accessToken');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const animatedComponents = makeAnimated();
//   const { enqueueSnackbar } = useSnackbar();

//   const { id } = useParams();

//   const [numFields, setNumFields] = useState();

//   const customStyles = {
//     control: (provided,state) => ({
//       ...provided,
//       paddingBottom:'2px',
//       paddingTop:'2px',
//       backgroundColor: '#212B36', // Change the background color
//       borderColor: state.isFocused ? '#00AB55' : 'grey',    // Change the border color
//       color:'white'
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isFocused ? '#161C24' : '#212B36', // Change option background color when focused
//       color: 'white',
//     }),
//   };

//   const { product:{products},magictype:{magictypes},rarity:{raritys},tag:{tags},spell:{spells},character:{characters} } = useSelector((state) => state);

//   const currentCharacter = characters?.find((character) =>character?.id === +(id))
//   console.log(currentCharacter)
//   const options = tags?.map(e => ({value: e?.id,label: e?.name}));
//   const sepllsOptions = spells?.map(e => ({value: e?.id,label: e?.name}));

  
//   const methods = useForm({
//     resolver: yupResolver(newCardSchema),
//     defaultValues: {
//     name: currentCharacter?.name || '',
//     hpFormula: currentCharacter?.hp_formula  || '',
//     atkFormula:currentCharacter?.atk_formula || '',
//     hpModifier:currentCharacter?.g_hp_modifier || '',
//     atkModifier:currentCharacter?.g_atk_modifier || '',
//     dorm:  currentCharacter?.dorm?.id || '',
//     magictype: currentCharacter?.magic_type?.id || '',
//     cg_image: null,
//     groovy_image: null,
//     rarity: currentCharacter?.rarity?.id || '',
//     no_spell: [{label:currentCharacter?.spell_one?.name,value:currentCharacter?.spell_one?.id},
//       {label:currentCharacter?.spell_two?.name,value:currentCharacter?.spell_two?.id}
//     ] || [],
//     no_tag: currentCharacter?.character_tag?.map(e=>({label:e?.tag?.name,value:e?.tag?.id}))  || [],
//     stateFormula: Array.from({ length: numFields }).fill({
//       level: '',
//       hp: '',
//       atk: ''
//     }),}
//   });


//   const {
//     reset,
//     getValues,
//     setValue,
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const OnSubmit = async () => {
//     const formValues = getValues();
//     try {
//       const character=new FormData();
//       character.append('name',formValues?.name)
//       character.append('dorm_id',formValues?.dorm)
//       character.append('rarity_id',formValues?.rarity)
//       character.append('magic_type_id',formValues?.magictype)
//       character.append('hp_formula',formValues?.hpFormula)
//       character.append('atk_formula',formValues?.atkFormula)
//       character.append('g_atk_modifier',formValues?.atkModifier)
//       character.append('g_hp_modifier',formValues?.hpModifier)
//       character.append('cg_thumbnail',formValues?.cg_image)
//       character.append('groovy_cg_thumbnail',formValues?.groovy_image)
//       formValues?.no_spell?.map((e, i) => {
//         character.append(`spell_id_${i+1}`, e?.value);
//         return null;
//       });
//       formValues?.no_tag?.map((e, i) => {
//         character.append(`tag[${i}][tag_id]`, e?.value);
//         return null;
//       });
//       formValues?.stateFormula?.map((e, i) => {
//         character.append(`stat_formula[${i}][level]`, e?.level);
//         character.append(`stat_formula[${i}][hp_g]`, e?.hp);
//         character.append(`stat_formula[${i}][atk_g]`, e?.atk);  
//         return null;
//       });
//       const requestHeaders = {
//         Accept: 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//         'X-Http-Method-Override': 'PUT'
//       };
//       const config = {
//         method: 'post',
//         url: `${BaseUrl.BaseUrl}character/${id}`,
//         data: character,
//         headers: requestHeaders
//       };

//       await axios(config)

//       .then((response)=>{ 
//         if(response?.data?.status === true){
//         enqueueSnackbar(response?.data?.message);
//         reset();
//       navigate(PATH_DASHBOARD.character.character)
//       }})
//       } catch (error) {
//       enqueueSnackbar(error?.message,{ 
//         variant: 'error'
//       });
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     dispatch(getSpells());
//     dispatch(getRaritys());
//     dispatch(getTags());
//     dispatch(getProducts());
//     dispatch(getmagictypes());
//     setNumFields(currentCharacter?.stat_formula?.length);
//   }, []);

//   useEffect(() => {
//     const defaultStateFormula = Array.from({ length: numFields })?.map((_, i) => ({
//       level: currentCharacter?.stat_formula[i]?.level || '',
//       hp: currentCharacter?.stat_formula[i]?.hp_g || '',
//       atk: currentCharacter?.stat_formula[i]?.atk_g || '',
//     }));
  
//     if (defaultStateFormula.length !== 0) {
//       defaultStateFormula?.forEach((e, i) => {
//         methods.setValue(`stateFormula[${i}].level`, e.level);
//         methods.setValue(`stateFormula[${i}].hp`, e.hp);
//         methods.setValue(`stateFormula[${i}].atk`, e.atk);
//       });
//     } else {
//       console.log(1);
//     }
//   }, [numFields, methods, currentCharacter]);


//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       if (file) {
//         setValue(
//           'groovy_image',
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         );
//       }
//     },
//     [setValue]
//   );
//   const handleDrop1 = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       if (file) {
//         setValue(
//           'cg_image',
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         );
//       }
//     },
//     [setValue]
//   );

//   return (
//     // <Container maxWidth='md'>

//     // <HeaderBreadcrumbs
//     //   heading="Edit Character"
//     //   links={[
//     //     { name: '', href: '' },]}/>

//     // <Card>
//     // <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
//     //   <Grid container spacing={1}>
//     //     <Grid item xs={12} md={12}>
//     //       <Card sx={{ p: 3 }}>
//     //         <Stack spacing={3}>
//     //         <RHFTextField name="name" label="Name" focused/>
//     //         <RHFSelect name="dorm" label="Select " focused>
//     //         <option value='Select dorm'>Select Dormitory</option>
//     //           {products?.map((e) =>
//     //           <option key={e?.id} value={e?.id}>
//     //             {e?.name}
//     //           </option>
//     //         )}
//     //         </RHFSelect>            
//     //         <RHFSelect name="rarity" label="Select Rarity" focused>
//     //         <option>Select Rarity</option>
//     //           {raritys?.map((e) =>
//     //           <option key={e?.id} value={e?.id}>
//     //             {e?.name}
//     //           </option>
//     //         )}
//     //         </RHFSelect>            
//     //         <RHFSelect name="magictype" label="Select Dormitory" focused>
//     //         <option >Select Magic Type</option>
//     //           {magictypes?.map((e) =>
//     //           <option key={e?.id} value={e?.id}>
//     //             {e?.name}
//     //           </option>
//     //         )}
//     //         </RHFSelect> 

//     //       <Grid container spacing={1}>
//     //         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <RHFTextField name="hpFormula" label="HP Formula" focused />
//     //           <RHFTextField name="hpModifier" label="HP Modifier" focused/>
//     //           </Stack>
//     //         </Grid>
//     //         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <RHFTextField name="atkFormula" label="Attack Formula" focused/>
//     //           <RHFTextField name="atkModifier" label="Attack Modifier" focused/>
//     //           </Stack>
//     //         </Grid>
//     //       </Grid>

         
//     //       <LabelStyle>Select Spell</LabelStyle>
//     //       <Controller
//     //       name='no_spell'
//     //                       control={control}
//     //                       render={({ field }) => (
//     //                         <Select
//     //                         {...field}
//     //                         components={animatedComponents}
//     //                         isMulti
//     //                         options={sepllsOptions}
//     //                         onChange={(e)=>{
//     //                           field.onChange(e)
//     //                         }}
//     //                         styles={customStyles}
//     //                       />
//     //       )}
//     //       />

//     //      {methods.formState.errors.no_spell && (
//     //      <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_spell.message}</LabelStyle>
//     //      )}
//     //       <LabelStyle>Select Tag</LabelStyle>
//     //       <Controller
//     //       name='no_tag'
//     //                       control={control}
//     //                       render={({ field }) => (
//     //                         <Select
//     //                         {...field}
//     //                         components={animatedComponents}
//     //                         isMulti
//     //                         // value={totalSpell}
//     //                         options={options}
//     //                         // {...register('no_spell', { validate: value => value.length <= 3 })}
//     //                         onChange={(e)=>{
//     //                           field.onChange(e)
//     //                         }}
//     //                         styles={customStyles}
//     //                       />
//     //       )}
//     //       />

//     //       {methods.formState.errors.no_tag && (
//     //       <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_tag.message}</LabelStyle>
//     //       )}

//     //       <RHFTextField focused value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many State formula do you want to add to this Character?" />
           
//     //       {Array.from({ length: numFields }).map((_, i) => (
                  
//     //       <Grid container spacing={1}>
//     //         <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <RHFTextField name={`stateFormula[${i}].level`} label="Level"  focused/>
//     //           </Stack>
//     //         </Grid>
//     //         <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <RHFTextField name={`stateFormula[${i}].hp`} label="HP"  focused/>
//     //           </Stack>
//     //         </Grid>
//     //         <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" focused/>
//     //           </Stack>
//     //         </Grid>

//     //       </Grid>
//     //       ))}


//     //       <Grid container spacing={1}>
//     //         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <div>
//     //       <LabelStyle>CG Thumbnail</LabelStyle>
//     //       <RHFUploadSingleFile name='cg_image' accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop1(acceptedFiles)}/>
//     //       </div>
//     //           </Stack>
//     //         </Grid>
//     //         <Grid item xs={6} md={6} sx={{ ml: 0 }}>
//     //           <Stack spacing={2}>
//     //           <div>
//     //           <LabelStyle>GROOVY Thumbnail</LabelStyle>
//     //           <RHFUploadSingleFile name='groovy_image' accept="image/*" maxSize={3145728} onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}/>
//     //           </div>
//     //           </Stack>
//     //         </Grid>
//     //       </Grid>

//     //       <Grid item xs={4} md={4}>
//     //           <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//     //           Update Character
//     //         </LoadingButton>
//     //       </Grid>

//     //         </Stack>
//     //       </Card>
//     //     </Grid>

//     //   </Grid>
//     // </FormProvider>
//     // </Card>
//     // </Container>
//     <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
//     <Container maxWidth='lg'>
//     <HeaderBreadcrumbs
//       heading="Edit Character"
//       links={[
//         { name: '', href: '' },]}/>
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={8}>
//         <Card sx={{ p: 3 }}>
//           <Box
//             sx={{
//               display: 'grid',
//               columnGap: 2,
//               rowGap: 3,
//               gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
//             }}
//           >
//             <RHFTextField name="name" label="Full Name" />
//             <RHFSelect name="dorm" label="Select Dorm" placeholder="Dorm">
//             <option value="" />
//             {products.map((option) => (
//               <option key={option?.id} value={option?.id}>
//                 {option?.name}
//               </option>
//             ))}
//             </RHFSelect>
//             <RHFSelect name="rarity" label="Select Rarity" placeholder="Rarity">
//           <option value="" />
//           {raritys.map((option) => (
//             <option key={option?.id} value={option?.id}>
//               {option?.name}
//             </option>
//           ))}
//             </RHFSelect>
//             <RHFSelect name="magictype" label="Select Magictype" placeholder="Magictype">
//           <option value="" />
//           {magictypes.map((option) => (
//             <option key={option?.id} value={option?.id}>
//               {option?.name}
//             </option>
//           ))}
//             </RHFSelect>

//             <RHFTextField name="hpFormula" label="HP Formula" />
//             <RHFTextField name="atkFormula" label="Attack Formula" />
//             <RHFTextField name="hpModifier" label="HP Modifier" />
//             <RHFTextField name="atkModifier" label="Attack Modifier" />
//             <Grid item xs={12} md={12}>
//             <Controller
//             name='no_tag'
//                           control={control}
//                           render={({ field }) => (
//                             <Select
//                             {...field}
//                             components={animatedComponents}
//                             isMulti
//                             placeholder= 'Select Tag'
//                             options={options}
//                             onChange={(e)=>{
//                               field.onChange(e)
//                             }}
//                             styles={customStyles}/>
//              )}/>
//             {methods.formState.errors.no_tag && (
//             <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_tag.message}</LabelStyle>
//             )}
//             </Grid>
//             <Grid item xs={12} md={12}>
//             <Controller
//             name='no_spell'
//                                   control={control}
//                                   render={({ field }) => (
//                                     <Select
//                                     {...field}
//                                     components={animatedComponents}
//                                     isMulti
//                                     placeholder= 'Select Spell'
//                                     options={sepllsOptions}
//                                     onChange={(e)=>{
//                                       field.onChange(e)
//                                     }}
//             styles={customStyles}/>)}/>
//             {methods.formState.errors.no_spell && (
//             <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_spell.message}</LabelStyle>
//              )}
//              </Grid>
//              </Box>
//              <Grid item xs={12} md={12} sx={{ pt: 2 }}>
//              <RHFTextField value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many State formula do you want to add to this Character?" />
//            </Grid>
//            {Array.from({ length: numFields }).map((_, i) => (
                  
//                   <Grid container spacing={1} sx={{ pt: 2 }}>
//                     <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//                       <Stack spacing={2}>
//                       <RHFTextField name={`stateFormula[${i}].level`} label="Level" />
//                       </Stack>
//                     </Grid>
//                     <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//                       <Stack spacing={2}>
//                       <RHFTextField name={`stateFormula[${i}].hp`} label="HP" />
//                       </Stack>
//                     </Grid>
//                     <Grid item xs={4} md={4} sx={{ ml: 0 }}>
//                       <Stack spacing={2}>
//                       <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" />
//                       </Stack>
//                     </Grid>
        
//                   </Grid>
//             ))}
        

//           <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//             <LoadingButton type="submit" variant="contained" size='large' loading={isSubmitting}>
//               Update Character
//             </LoadingButton>
//           </Stack>
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={4}>
//       <Stack spacing={3}>
//       <Card sx={{ py: 6, px: 2 }}>
//           <Box sx={{ mb: 2 }}>
//           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
//           CG Thumbnail
//         </Typography>
//             <RHFUploadAvatar
//               name="cg_image"
//               accept="image/*"
//               maxSize={3145728}
//               onDrop={handleDrop1}
//               helperText={
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     mt: 2,
//                     mx: 'auto',
//                     display: 'block',
//                     textAlign: 'center',
//                     color: 'text.secondary',
//                   }}
//                 >
//                   Allowed *.jpeg, *.jpg, *.png, *.gif
//                   <br /> max size of {fData(3145728)}
//                 </Typography>
//               }
//             />
//           </Box>              
//           <Box sx={{ mb: 2 }}>
//           <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
//           Groovy Thumbnail
//         </Typography>
//             <RHFUploadAvatar
//               name="groovy_image"
//               accept="image/*"
//               maxSize={3145728}
//               onDrop={handleDrop}
//               helperText={
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     mt: 2,
//                     mx: 'auto',
//                     display: 'block',
//                     textAlign: 'center',
//                     color: 'text.secondary',
//                   }}
//                 >
//                   Allowed *.jpeg, *.jpg, *.png, *.gif
//                   <br /> max size of {fData(3145728)}
//                 </Typography>
//               }
//             />
//           </Box>              
//       </Card>
  
//         <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//           Create Product
//         </LoadingButton>
//       </Stack>
//        </Grid>
//     </Grid>
//     </Container>
//   </FormProvider>
//   );
// }


import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo,useCallback } from 'react';
import { useForm ,Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card,Grid,Chip, Stack, TextField,Box, Typography, Autocomplete, Container } from '@mui/material';
import {newCardSchema,getDefaultValues} from '../AllSchema/NewCardSchema';
import { useSelector} from '../../../redux/store';
import { fData } from '../../../utils/formatNumber';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import BaseUrl from '../../../BaseUrl/BaseUrl'
import {
  FormProvider,
  RHFUploadAvatar,
  RHFTextField,
  RHFSelect,
} from '../../../components/hook-form';

const TAGS_OPTION = []; 

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function EditCard() {

  const accessToken=localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { character:{characters},product:{products},card:{cards} } = useSelector((state) => state);

  const currentcharacter = characters.find((character) =>character.id === +(id))
  const defaultValues = useMemo(() => getDefaultValues(currentcharacter));

  const methods = useForm({
    resolver: yupResolver(newCardSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting,errors },
  } = methods;

console.log(errors)

  const OnSubmit = async (data) => {
    try {
      const character=new FormData();
      character?.append('name',data?.name)
      character?.append('card_id',data?.card_id)
      character?.append('dorm_id',data?.dorm_id)
      character?.append('image',data?.image)
      data?.obtained?.map((e,i)=>character.append(`obtain[${i}]`,e))
      const requestHeaders = {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'X-Http-Method-Override': 'PUT'
      };
      const config = {
                method: 'post',
                url: `${BaseUrl.BaseUrl}character/${id}`,
                data: character,
                headers: requestHeaders
      };
   
      await axios(config)
      
      .then((response)=>{ 
        if(response?.data?.status === true){
        reset();
        enqueueSnackbar(response?.data?.message);
        // navigate('/dashboard/dorm');
         navigate(PATH_DASHBOARD.character.character);
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
      heading="Edit Character"
      links={[
        { name: '', href: '' },]}/>

    <Card>
    <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label=" Name" focused/>
              <RHFSelect name="card_id" label="Select Card" focused>
                    <option value='Select Card'>Select Card</option>
                      {cards?.map((e) =>
                      <option key={e?.id} value={e?.id}>
                        {e?.name}
                      </option>
                    )}
              </RHFSelect>
              <RHFSelect name="dorm_id" label="Select Dorm" focused>
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
                 renderInput={(params) => <TextField label="Enter Obtained Tag" {...params} focused />}
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
              
            Update Card
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

