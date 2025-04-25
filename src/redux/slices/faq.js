import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  faqs: [],
};


const slice = createSlice({
  name: 'faq',
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

    // GET elementS
    getelementsSuccess(state, action) {
      state.isLoading = false;
      state.faqs = action.payload;
    },

  },
});
export default slice.reducer;


export function getfaqs() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/faq');
      dispatch(slice.actions.getelementsSuccess(response?.data));
      console.log(response,'response--->');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


