import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  whatwedos: { left: [], right: [] },
};

const slice = createSlice({
  name: 'whatwedo',
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
      state.whatwedos.banner = action.payload.banner_video;
      state.whatwedos.leftVideo = action.payload.left_video;
      state.whatwedos.rightVideo = action.payload.right_video;

      // Combine left_images and right_images into a single array with type
      // eslint-disable-next-line no-unused-vars
      const leftImages =
        action.payload.left_images &&
        action.payload.left_images.map((image) => ({
          id: image.id,
          image: image.left_image,
          type: 'left',
        }));

      // eslint-disable-next-line no-unused-vars
      const rightImages =
        action.payload.right_images &&
        action.payload.right_images?.map((image) => ({
          id: image.id,
          image: image.right_image,
          type: 'right',
        }));

      // Merge the arrays
      state.whatwedos.images =
        action.payload.left_images || action.payload.right_images
          ? [
              ...(action.payload.left_images
                ? action.payload.left_images.map((image) => ({
                    id: image.id,
                    image: image.left_image,
                    type: 'left',
                  }))
                : []),
              ...(action.payload.right_images
                ? action.payload.right_images.map((image) => ({
                    id: image.id,
                    image: image.right_image,
                    type: 'right',
                  }))
                : []),
            ]
          : [];
    },

    deleteElementSuccess(state, action) {
      const { id, type } = action.payload;
      state.whatwedos.images = state.whatwedos.images.filter((image) => image.id !== id || image.type !== type);
    },
  },
});

export default slice.reducer;

// Export actions
export const { deleteElementSuccess } = slice.actions;

// Thunk for getting data
export function getwhatwedos() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/what-we-do');
      dispatch(slice.actions.getelementsSuccess(response?.data?.data));
      console.log(response?.data?.data, 'response--->');
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
