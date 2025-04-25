import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  registrationForm: [],
};


const slice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET magictype
    getRegistrationFormSucces(state, action) {
      state.isLoading = false;
      state.registrationForm = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getRegistrationForm() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/clinic/forms');
      console.log(response,'magictype--->>>>')
      dispatch(slice.actions.getRegistrationFormSucces(response?.data?.data));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------

