import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  cards: [],
};


const slice = createSlice({
  name: 'card',
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

    // GET card
    getcardSuccess(state, action) {
      state.isLoading = false;
      state.cards = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getCards() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('card');
      console.log(response,'card--->>>>')
      dispatch(slice.actions.getcardSuccess(response?.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

