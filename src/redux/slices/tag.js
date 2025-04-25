import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  tags: [],
};


const slice = createSlice({
  name: 'tag',
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

    // GET tag
    gettagSuccess(state, action) {
      state.isLoading = false;
      state.tags = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getTags() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(response,'tag--->>>>')
      const response = await axios.get('/api/clinic/appointments');
      dispatch(slice.actions.gettagSuccess(response?.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

