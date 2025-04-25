import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  mainhomes: [],
};


const slice = createSlice({
  name: 'mainhome',
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
      state.mainhomes = action.payload;
    },

  },
});
export default slice.reducer;


export function getmainhomes() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/home');
      dispatch(slice.actions.getelementsSuccess(response?.data?.data));
      console.log(response?.data?.data,'response--->');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


