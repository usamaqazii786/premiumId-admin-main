import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  cProviders: [],
};


const slice = createSlice({
  name: 'cProvider',
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
      state.cProviders = action.payload;
    },

  },
});
export default slice.reducer;


export function getClinicProvider(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/company/clinics/${id}`);
      dispatch(slice.actions.getelementsSuccess(response?.data?.data?.providers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

