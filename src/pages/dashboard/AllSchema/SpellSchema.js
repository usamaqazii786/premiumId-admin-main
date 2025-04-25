import * as Yup from 'yup';

export const newSpellSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    selectElement: Yup.string().required('Select an element'),
    levels: Yup.array().of(
      Yup.object().shape({
        level: Yup.string().required('Level range is required'),
        effect: Yup.array().min(1, 'Effect tag is required'),
         image:  Yup.mixed().required('Thumbnail is required'),
      })
    )
  });

export   const getDefaultValues = (numFields,currentspell) => ({
  name: currentspell?.name || '',
  selectElement: currentspell?.element?.id || '',
  levels: Array.from({ length: numFields }).map(() => ({
    level: '',
    effect: [],
    image: null
  })),
})
