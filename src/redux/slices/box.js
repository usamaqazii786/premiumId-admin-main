import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  boxs: [],
};


const slice = createSlice({
  name: 'box',
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
      state.boxs = action.payload;
    },

  },
});
export default slice.reducer;


export function getboxs() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/dynamic-box-page');
      dispatch(slice.actions.getelementsSuccess(response?.data?.aboutUs));
      console.log(response,'data--->');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


