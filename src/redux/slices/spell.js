/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  spells: [],
};


const slice = createSlice({
  name: 'spell',
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
    getspellSuccess(state, action) {
      state.isLoading = false;
      state.spells = action.payload;
    },
   

  },
});

// Reducer
export default slice.reducer;


export function getSpells() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/memberships');
      // const response1 = await axios.get('/api/specialities');
      console.log(response?.data,'spell--->>>>')
      dispatch(slice.actions.getspellSuccess(response?.data?.memberships));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


