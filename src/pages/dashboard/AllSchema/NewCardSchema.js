import * as Yup from 'yup';

export const newCardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    obtained: Yup.array().min(1,('Minimum 1 Obtained is required')),
    card_id: Yup.string().required('Select an Character'),
    dorm_id: Yup.string().required('Select an Character'),
  });

  export   const getDefaultValues = (currentCharacter) => ({
      name: currentCharacter?.name || '',
      obtained: currentCharacter?.obtain || [],
      card_id:currentCharacter?.card?.id || '',
      dorm_id:currentCharacter?.dorm?.id || '',
      image: '',
    })
