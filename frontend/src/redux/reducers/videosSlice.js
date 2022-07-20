import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  videos: [],
  error: false,
  errorMessage: '',
  currentVideo: {}
}

export const videoSlice = createSlice({
  name: 'video',
  initialState: INITIAL_STATE,
  reducers: {
    loadingStart(state) {
      state.loading = true;
    },
    loadingSuccess(state, action) {
      state.loading = false;
      state.videos = action.payload
    },
    loadingFailure(state, action) {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    loadingSingleVideoSuccess(state, action) {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    like(state, action) {
      if (!state.currentVideo?.likes.includes(action.payload)) {
        console.log('i am inside');
        state.currentVideo?.likes.push(action.payload);
        state.currentVideo?.dislikes.splice(state.currentVideo?.dislikes.findIndex(userId => userId === action.payload), 1)
      }
    },
    dislike(state, action) {
      if (!state.currentVideo?.dislikes.includes(action.payload)) {
        state.currentVideo?.dislikes.push(action.payload);
        state.currentVideo?.likes.splice(state.currentVideo?.likes.findIndex(userId => userId === action.payload), 1)
      }
    },
  },
})

export const { loadingStart, loadingSuccess, loadingFailure, loadingSingleVideoSuccess, like, dislike } = videoSlice.actions

export default videoSlice.reducer