/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  homeourmissions: [],
};


const slice = createSlice({
  name: 'homeourmission',
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
    gethomeourmissionsuccess(state, action) {
      state.isLoading = false;
      state.homeourmissions = action.payload;
    },
   

  },
});

// Reducer
export default slice.reducer;


export function gethomeourmissions() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/home-our-mission');
      // const response1 = await axios.get('/api/specialities');
      console.log(response?.data,'homeourmissions-->>>>')
      dispatch(slice.actions.gethomeourmissionsuccess(response?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


