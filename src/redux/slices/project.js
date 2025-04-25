import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  projects: [],
};

const slice = createSlice({
  name: 'project',
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
      state.projects = action.payload;
    },
  },
});
export default slice.reducer;

export function getprojects() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/project');
      dispatch(slice.actions.getelementsSuccess(response?.data?.data));
      console.log(response?.data?.data, 'response--->');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
