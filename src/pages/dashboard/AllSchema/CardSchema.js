import * as Yup from 'yup';

export  const CardSchema = Yup.object().shape({
    name: Yup.string().required('HP Formula is required'),
    hpFormula: Yup.number().nullable().required('HP Formula is required').typeError('Enter HP Formula in numbers'),
    atkFormula: Yup.number().nullable().required('Attack Formula is required').typeError('Enter Attack Formula in numbers'),
    hpModifier: Yup.number().nullable().typeError('Enter HP Modifier in numbers').required('HP Modifier is required'),
    atkModifier: Yup.number().nullable().typeError('Enter Attack Modifier in numbers').required('Attack Modifier is required'),
    // dorm: Yup.string().required('Select an dorm'),
    magictype: Yup.string().required('Select an dorm'),
    rarity: Yup.string().required('Select an Rarity'),
    cg_image: Yup.mixed().test('CG Thumbnail is required', (value) => value !== ''),
    groovy_image: Yup.mixed().test('Groovy Thumbnail is required', (value) => value !== '') ,
    no_tag: Yup.array()
    .min(1, 'At least one tag is required')
    .required('Select at least one tag'),
    // no_buddy: Yup.array()
    // .min(1, 'At least one Buddy is required')
    // .required('Select at least one Buddy'),
    no_spell: Yup.array().min(1)
    .test({message:'Cannot select more than 3 spells',test: (value) => (value?.length  > 0 && value?.length <= 3)})
    .required('At least one spell is required'),
    stateFormula: Yup.array().of(
      Yup.object().shape({
        level: Yup.string().required('Level  is required'),
        hp: Yup.string().required('HP is required'),
        atk: Yup.string().required('Attack is required'),
      })
    )
  });

  export   const getDefaultValues = (numFields,currentCard) => ({
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    name:currentCard?.name || '',
    hpFormula:currentCard?.hp_formula ? parseFloat(currentCard.hp_formula) : null || '',
    atkFormula:currentCard?.atk_formula ? parseFloat(currentCard.atk_formula) : null || '',
    hpModifier: currentCard?.g_hp_modifier ? parseFloat(currentCard.g_hp_modifier) : null || '',
    atkModifier: currentCard?.g_atk_modifier ? parseFloat(currentCard.g_atk_modifier) : null || '',
    // dorm: currentCard?.dorm?.id || '',
    magictype:currentCard?.magictype?.id || '',
    cg_image: '',
    groovy_image: '',
    rarity:currentCard?.rarity?.id || '',
    no_spell: [{label:currentCard?.spell_one?.name,value:currentCard?.spell_one?.id},
      {label:currentCard?.spell_two?.name,value:currentCard?.spell_two?.id},
      {label:currentCard?.spell_three?.name,value:currentCard?.spell_three?.id}
        ] || [],
    no_buddy: [{label:currentCard?.buddy_one?.name,value:currentCard?.buddy_one?.id},
      {label:currentCard?.buddy_two?.name,value:currentCard?.buddy_two?.id},
      {label:currentCard?.buddy_three?.name,value:currentCard?.buddy_three?.id}
        ] || [],
    no_tag: currentCard?.character_tag?.map(e=>({    label:e?.tag?.name,     value:e?.tag?.id    }))  || [],
    stateFormula: Array.from({ length: numFields }).fill({

      level: '',
      hp: '',
      atk: ''
    })
  })