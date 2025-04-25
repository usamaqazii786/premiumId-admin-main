import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  magictypes: [],
};


const slice = createSlice({
  name: 'magictype',
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
    getmagictypeSuccess(state, action) {
      state.isLoading = false;
      state.magictypes = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getmagictypes() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/join-email');
      console.log(response,'magictype--->>>>')
      dispatch(slice.actions.getmagictypeSuccess(response?.data?.joinEmail));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------

