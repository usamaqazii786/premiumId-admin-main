/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  dynamicSectionPages: [],
};


const slice = createSlice({
  name: 'dynamicSectionPage',
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

    // GET spell
    getdynamicSectionPagesuccess(state, action) {
      state.isLoading = false;
      state.dynamicSectionPages = action.payload;
    },
   

  },
});

// Reducer
export default slice.reducer;


export function getdynamicSectionPages() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/dynamic-section-page');
      // const response1 = await axios.get('/api/specialities');
      console.log(response?.data,'dynamicSectionPages-->>>>')
      dispatch(slice.actions.getdynamicSectionPagesuccess(response?.data?.homeDynamic));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


