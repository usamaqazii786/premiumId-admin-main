/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSnackbar } from 'notistack';
import {useState,useEffect,useCallback} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack,  Typography,Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getTags} from '../../../redux/slices/tag';
import { getRaritys} from '../../../redux/slices/rarity';
import { getSpells} from '../../../redux/slices/spell';
import { getProducts} from '../../../redux/slices/product';
import { getmagictypes} from '../../../redux/slices/magictype';
import { useDispatch, useSelector } from '../../../redux/store';
import { fData } from '../../../utils/formatNumber';
import {CardSchema} from '../AllSchema/CardSchema';
import axios from '../../../utils/axios';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import BaseUrl from '../../../BaseUrl/BaseUrl'
// components
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.error,
  marginBottom: theme.spacing(0)
}));


export default function EditCharacter() {
  const accessToken=localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const [numFields, setNumFields] = useState();

  const customStyles = {
    control: (provided,state) => ({
      ...provided,
      paddingBottom:'2px',
      paddingTop:'2px',
      backgroundColor: '#212B36', // Change the background color
      borderColor: state.isFocused ? '#00AB55' : 'grey',    // Change the border color
      color:'white'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#161C24' : '#212B36', // Change option background color when focused
      color: 'white',
    }),
  };

  const {magictype:{magictypes},rarity:{raritys},tag:{tags},character:{characters},spell:{spells}, card:{cards} } = useSelector((state) => state);
  const options = tags?.map(e => ({value: e?.id,label: e?.name}));
  const sepllsOptions = spells?.map(e => ({value: e?.id,label: e?.name}));
  const buddysOptions = characters?.map(e => ({value: e?.id,label: e?.name}));

  const currentCard = cards?.find((card) =>card?.id === +(id))
  console.log(currentCard)

  const methods = useForm({
    resolver: yupResolver(CardSchema),
    defaultValues: {
    name: currentCard?.name || '',
    hpFormula: currentCard?.hp_formula ? parseFloat(currentCard.hp_formula) : null || '',
    atkFormula:currentCard?.atk_formula ? parseFloat(currentCard.atk_formula) : null|| '',
    hpModifier:currentCard?.g_hp_modifier ? parseFloat(currentCard.g_hp_modifier) : null|| '',
    atkModifier:currentCard?.g_atk_modifier ? parseFloat(currentCard.g_atk_modifier) : null || '',
    // dorm:  currentCard?.dorm?.id || '',
    magictype: currentCard?.magic_type?.id || '',
    cg_image: null,
    groovy_image: null,
    rarity: currentCard?.rarity?.id || '',
    no_spell: [ {label:currentCard?.spell_one?.name,value:currentCard?.spell_one?.id},
        {label:currentCard?.spell_two?.name,value:currentCard?.spell_two?.id},
       {label:currentCard?.spell_three?.name,value:currentCard?.spell_three?.id}
    ] || [],
    no_buddy: [ currentCard?.buddy_one && {label:currentCard?.buddy_one?.name,value:currentCard?.buddy_one?.id},
      currentCard?.buddy_two && {label:currentCard?.buddy_two?.name,value:currentCard?.buddy_two?.id},
      currentCard?.buddy_three && {label:currentCard?.buddy_three?.name,value:currentCard?.buddy_three?.id}
        ] || [],
    no_tag: currentCard?.card_tag?.map(e=>({label:e?.tag?.name,value:e?.tag?.id}))  || [],
    
    stateFormula: Array.from({ length: numFields }).fill({
      level: '',
      hp: '',
      atk: ''
    }),}
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting ,errors},
  } = methods;
console.log(errors)
  const OnSubmit = async (data) => {
    console.log(data)
    try {
      const card=new FormData();
      card.append('name',data?.name)
      card.append('dorm_id',data?.dorm)
      card.append('rarity_id',data?.rarity)
      card.append('magic_type_id',data?.magictype)
      card.append('hp_formula',data?.hpFormula)
      card.append('atk_formula',data?.atkFormula)
      card.append('g_atk_modifier',data?.atkModifier)
      card.append('g_hp_modifier',data?.hpModifier)
      card.append('cg_thumbnail',data?.cg_image)
      card.append('groovy_cg_thumbnail',data?.groovy_image)
      data?.no_spell?.map((e, i) => {
        card.append(`spell_id_${i+1}`, e?.value);
        return null;
      });
      data?.no_tag?.map((e, i) => {
        card.append(`tag[${i}][tag_id]`, e?.value);
        return null;
      });
      data?.no_buddy?.map((e, i) => {
        card.append(`buddy_id_${i+1}`, e?.value);
        return null;
      });
      data?.stateFormula?.map((e, i) => {
        card.append(`stat_formula[${i}][level]`, e?.level);
        card.append(`stat_formula[${i}][hp_g]`, e?.hp);
        card.append(`stat_formula[${i}][atk_g]`, e?.atk);  
        return null;
      });
      const requestHeaders = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Http-Method-Override': 'PUT'
      };
      const config = {
        method: 'post',
        url: `${BaseUrl.BaseUrl}card/${id}`,
        data: card,
        headers: requestHeaders
      };

      await axios(config)

      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        reset();
      navigate(PATH_DASHBOARD.card.card)
      }})
      } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getSpells());
    dispatch(getRaritys());
    dispatch(getTags());
    dispatch(getProducts());
    dispatch(getmagictypes());
    setNumFields(currentCard?.stat_formula?.length);
  }, []);

  useEffect(() => {
    const defaultStateFormula = Array.from({ length: numFields })?.map((_, i) => ({
      level: currentCard?.stat_formula[i]?.level || '',
      hp: currentCard?.stat_formula[i]?.hp_g || '',
      atk: currentCard?.stat_formula[i]?.atk_g || '',
    }));
  
    if (defaultStateFormula.length !== 0) {
      defaultStateFormula?.forEach((e, i) => {
        methods.setValue(`stateFormula[${i}].level`, e.level);
        methods.setValue(`stateFormula[${i}].hp`, e.hp);
        methods.setValue(`stateFormula[${i}].atk`, e.atk);
      });
    } else {
      console.log(1);
    }
  }, [numFields, methods, currentCard]);

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
    <Container maxWidth='lg'>
    <HeaderBreadcrumbs
      heading="Edit Card"
      links={[
        { name: '', href: '' },]}/>
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
            <RHFTextField name="name" label="Full Name" focused/>
            <Grid item xs={12} md={12}>
            <Controller
            name='no_buddy'
                          control={control}
                          render={({ field }) => (
                            <Select
                            {...field}
                            components={animatedComponents}
                            isMulti
                            placeholder= 'Select Buddy'
                            options={buddysOptions}
                            onChange={(e)=>{
                              field.onChange(e)
                            }}
                            styles={customStyles}/>
             )}/>
            {methods.formState.errors.no_buddy && (
            <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_buddy.message}</LabelStyle>
            )}
            </Grid>
            <RHFSelect name="rarity" label="Select Rarity" placeholder="Rarity" focused>
          <option value="" />
          {raritys.map((option) => (
            <option key={option?.id} value={option?.id}>
              {option?.name}
            </option>
          ))}
            </RHFSelect>
            <RHFSelect name="magictype" label="Select Magictype" placeholder="Magictype" focused>
          <option value="" />
          {magictypes.map((option) => (
            <option key={option?.id} value={option?.id}>
              {option?.name}
            </option>
          ))}
            </RHFSelect>

            <RHFTextField name="hpFormula" label="HP Formula" focused />
            <RHFTextField name="atkFormula" label="Attack Formula" focused/>
            <RHFTextField name="hpModifier" label="HP Modifier" focused/>
            <RHFTextField name="atkModifier" label="Attack Modifier" focused/>
            <Grid item xs={12} md={12}>
            <Controller
            name='no_tag'
                          control={control}
                          render={({ field }) => (
                            <Select
                            {...field}
                            components={animatedComponents}
                            isMulti
                            placeholder= 'Select Tag'
                            options={options}
                            onChange={(e)=>{
                              field.onChange(e)
                            }}
                            styles={customStyles}/>
             )}/>
            {methods.formState.errors.no_tag && (
            <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_tag.message}</LabelStyle>
            )}
            </Grid>
            <Grid item xs={12} md={12}>
            <Controller
            name='no_spell'
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                    {...field}
                                    components={animatedComponents}
                                    isMulti
                                    placeholder= 'Select Spell'
                                    options={sepllsOptions}
                                    onChange={(e)=>{
                                      field.onChange(e)
                                    }}
            styles={customStyles}/>)}/>
            {methods.formState.errors.no_spell && (
            <LabelStyle  style={{ fontSize: '12px', color: 'red',fontWeight:300 }}>{methods.formState.errors.no_spell.message}</LabelStyle>
             )}
             </Grid>
             </Box>
             <Grid item xs={12} md={12} sx={{ pt: 2 }}>
             <RHFTextField value={numFields} onChange={(e) => setNumFields(e.target.value)} label="How many State formula do you want to add to this Character?" focused/>
           </Grid>
           {Array.from({ length: numFields }).map((_, i) => (
                  
                  <Grid container spacing={1} sx={{ pt: 2 }}>
                    <Grid item xs={4} md={4} sx={{ ml: 0 }}>
                      <Stack spacing={2}>
                      <RHFTextField name={`stateFormula[${i}].level`} label="Level" focused/>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} md={4} sx={{ ml: 0 }}>
                      <Stack spacing={2}>
                      <RHFTextField name={`stateFormula[${i}].hp`} label="HP" focused />
                      </Stack>
                    </Grid>
                    <Grid item xs={4} md={4} sx={{ ml: 0 }}>
                      <Stack spacing={2}>
                      <RHFTextField name={`stateFormula[${i}].atk`} label="Attack" focused/>
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
          update Product
        </LoadingButton>
      </Stack>
       </Grid>
    </Grid>
    </Container>
  </FormProvider>
  );
}
