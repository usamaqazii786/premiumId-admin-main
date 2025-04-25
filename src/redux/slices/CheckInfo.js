import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  checkInfo: [],
};


const slice = createSlice({
  name: 'checkInfo',
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
    getCheckInfoSuccess(state, action) {
      state.isLoading = false;
      state.checkInfo = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getCheckInfo() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/clinic/checkin_info');
      console.log(response,'magictype--->>>>')
      dispatch(slice.actions.getCheckInfoSuccess(response?.data?.data));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------

