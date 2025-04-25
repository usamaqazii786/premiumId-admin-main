import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  dresscode: [],
};


const slice = createSlice({
  name: 'dresscode',
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
    getDressCodeSuccess(state, action) {
      state.isLoading = false;
      state.dresscode = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getDressCode() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/clinic/dress_code');
      console.log(response,'magictype--->>>>')
      dispatch(slice.actions.getDressCodeSuccess(response?.data?.data));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------

