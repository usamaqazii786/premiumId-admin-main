import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  brandsections: [],
};


const slice = createSlice({
  name: 'brandsection',
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
      state.brandsections = action.payload;
    },

  },
});
export default slice.reducer;


export function getbrandsections() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/brand-section');
      dispatch(slice.actions.getelementsSuccess(response?.data?.data));
      console.log(response?.data,'data--->');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


