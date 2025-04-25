import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  elements: [],
};


const slice = createSlice({
  name: 'element',
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
      state.elements = action.payload;
    },

  },
});
export default slice.reducer;


export function getelements() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/admins');
      console.log(response.data,'company')
      dispatch(slice.actions.getelementsSuccess(response?.data?.admins));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

