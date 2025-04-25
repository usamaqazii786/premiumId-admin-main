import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  creviews: [],
};


const slice = createSlice({
  name: 'creview',
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
      state.creviews = action.payload;
    },

  },
});
export default slice.reducer;


export function getCreview(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/company/review_requests/${id}`);
      console.log(response.data?.data,'creview')
      dispatch(slice.actions.getelementsSuccess(response?.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

