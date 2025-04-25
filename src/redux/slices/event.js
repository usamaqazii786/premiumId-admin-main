/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  events: [],
};


const slice = createSlice({
  name: 'event',
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
    getEventsuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },
   

  },
});

// Reducer
export default slice.reducer;


export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/event');
      // const response1 = await axios.get('/api/specialities');
      console.log(response?.data,'event--->>>>')
      dispatch(slice.actions.getEventsuccess(response?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


