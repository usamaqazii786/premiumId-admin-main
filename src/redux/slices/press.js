/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  presss: [],
};


const slice = createSlice({
  name: 'press',
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
    getpresssuccess(state, action) {
      state.isLoading = false;
      state.presss = action.payload;
    },
   

  },
});

// Reducer
export default slice.reducer;


export function getpresss() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/dynamic-page');
      // const response1 = await axios.get('/api/specialities');
      console.log(response?.data,'presss-->>>>')
      dispatch(slice.actions.getpresssuccess(response?.data?.pages));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


