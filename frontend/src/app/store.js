import { configureStore } from '@reduxjs/toolkit';
import vocabReducer from  './features/vocab/vocabslice';

export const store = configureStore({
  reducer: {
    vocab: vocabReducer,
  },
})
