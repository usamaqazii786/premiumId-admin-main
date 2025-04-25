import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  characters: [],
};


const slice = createSlice({
  name: 'character',
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
    getcharacteruccess(state, action) {
      state.isLoading = false;
      state.characters = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getCharacter() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('character');
      console.log(response,'character--->>>>')
      dispatch(slice.actions.getcharacteruccess(response?.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

